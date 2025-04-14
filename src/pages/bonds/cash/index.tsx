import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import Layout from '../../../layout';
import { Preloader, ThreeDots, Oval } from 'react-preloader-icon';
import { getBondDataByAddress } from '../../../utils/web3/bond';
import { getContractAddress } from '../../../utils/source';
import BondABI from '../../../abis/Bond.json';
import ERC20ABI from '../../../abis/ERC20.json';
import { publicClient as client } from '../../../config';
import { toast } from 'react-hot-toast';

interface Bond {
    id: string;
    address: string;
    metadataURI: string;
    paymentToken: {
        id: string;
        symbol: string;
        decimals: number;
    };
    saleToken: {
        id: string;
        symbol: string;
        decimals: number;
    };
    whitelistStartTime: number;
    saleStartTime: number;
    saleEndTime: number;
    withdrawDelay: number;
    owner: string;
    bondSize: string;
    bondType: number;
    fixedDiscount: number;
    totalRaised: string;
    totalSold: string;
    isActive: boolean;
    bondInfo?: {
        projectName: string;
        description: string;
        images?: {
            logo?: string;
            bg?: string;
        };
    };
}

interface TokenInfo {
    symbol: string;
    decimals: number;
    balance: bigint;
}

function CashBond() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { authenticated, login } = usePrivy();
    const { wallets } = useWallets();
    const [wallet, setWallet] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bond, setBond] = useState<Bond | null>(null);
    const [paymentToken, setPaymentToken] = useState<TokenInfo | null>(null);
    const [saleToken, setSaleToken] = useState<TokenInfo | null>(null);
    const [withdrawablePaymentTokens, setWithdrawablePaymentTokens] = useState<bigint>(BigInt(0));
    const [withdrawableSaleTokens, setWithdrawableSaleTokens] = useState<bigint>(BigInt(0));
    const [isCashing, setIsCashing] = useState(false);
    const [txHash, setTxHash] = useState<string>("");

    useEffect(() => {
        if (authenticated && wallets.length > 0) {
            const activeWallet = wallets[0];
            setWallet(activeWallet);
        }
    }, [authenticated, wallets]);

    const fetchBondData = async () => {
        if (!id || !wallet) return;

        try {
            setLoading(true);
            setError(null);

            const bondData = await getBondDataByAddress(id as `0x${string}`);

            // Ensure bondData has the correct structure
            if (!bondData || !bondData.paymentToken || !bondData.saleToken) {
                setError('Invalid bond data structure');
                setLoading(false);
                return;
            }

            // Create a properly structured Bond object
            const formattedBond: Bond = {
                id: bondData.id,
                address: bondData.id, // Use id as address
                metadataURI: bondData.metadataURI as string,
                paymentToken: {
                    id: bondData.paymentToken.id as string,
                    symbol: bondData.paymentToken.symbol as string,
                    decimals: Number(bondData.paymentToken.decimals)
                },
                saleToken: {
                    id: bondData.saleToken.id as string,
                    symbol: bondData.saleToken.symbol as string,
                    decimals: Number(bondData.saleToken.decimals)
                },
                whitelistStartTime: Number(bondData.whitelistStartTime),
                saleStartTime: Number(bondData.saleStartTime),
                saleEndTime: Number(bondData.saleEndTime),
                withdrawDelay: Number(bondData.withdrawDelay),
                owner: wallet.address, // Assuming the current wallet is the owner
                bondSize: bondData.bondSize as string,
                bondType: Number(bondData.bondType),
                fixedDiscount: 0, // Default value
                totalRaised: '0', // Default value
                totalSold: bondData.totalSold as string || '0',
                isActive: true,
                bondInfo: undefined // We'll fetch this separately if needed
            };

            setBond(formattedBond);

            // Fetch token details
            const paymentTokenContract = {
                address: formattedBond.paymentToken.id as `0x${string}`,
                abi: ERC20ABI
            };

            const saleTokenContract = {
                address: formattedBond.saleToken.id as `0x${string}`,
                abi: ERC20ABI
            };

            // Fetch payment token details
            const [paymentSymbol, paymentDecimals, paymentBalance] = await Promise.all([
                client.readContract({
                    ...paymentTokenContract,
                    functionName: 'symbol'
                }),
                client.readContract({
                    ...paymentTokenContract,
                    functionName: 'decimals'
                }),
                client.readContract({
                    ...paymentTokenContract,
                    functionName: 'balanceOf',
                    args: [formattedBond.id as `0x${string}`]
                })
            ]);

            // Fetch sale token details
            const [saleSymbol, saleDecimals, saleBalance] = await Promise.all([
                client.readContract({
                    ...saleTokenContract,
                    functionName: 'symbol'
                }),
                client.readContract({
                    ...saleTokenContract,
                    functionName: 'decimals'
                }),
                client.readContract({
                    ...saleTokenContract,
                    functionName: 'balanceOf',
                    args: [formattedBond.id as `0x${string}`]
                })
            ]);

            setPaymentToken({
                symbol: paymentSymbol as string,
                decimals: Number(paymentDecimals),
                balance: paymentBalance as bigint
            });

            setSaleToken({
                symbol: saleSymbol as string,
                decimals: Number(saleDecimals),
                balance: saleBalance as bigint
            });

            // Check if the user is the owner and can withdraw tokens
            const isOwner = formattedBond.owner.toLowerCase() === wallet.address.toLowerCase();

            if (isOwner) {
                // For owner, set withdrawable amounts to contract balances
                setWithdrawablePaymentTokens(paymentBalance as bigint);
                setWithdrawableSaleTokens(saleBalance as bigint);
            } else {
                // Non-owners can't withdraw anything
                setWithdrawablePaymentTokens(BigInt(0));
                setWithdrawableSaleTokens(BigInt(0));
            }
        } catch (err) {
            console.error('Error fetching bond data:', err);
            setError('Failed to fetch bond data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBondData();
    }, [id, wallet]);

    const handleCashPaymentTokens = async () => {
        if (!bond || !wallet || !paymentToken) return;

        try {
            setIsCashing(true);
            setError(null);

            const { request } = await client.simulateContract({
                address: bond.id as `0x${string}`,
                abi: BondABI,
                functionName: 'withdrawPaymentTokens',
                account: wallet.address as `0x${string}`
            });

            const hash = await wallet.sendTransaction(request);
            setTxHash(hash);
            await client.waitForTransactionReceipt({ hash });
            toast.success("Successfully withdrew payment tokens");

            // Refresh data
            await fetchBondData();
        } catch (err: any) {
            console.error('Error withdrawing payment tokens:', err);
            setError(err.message || 'Failed to withdraw payment tokens');
            toast.error("Failed to withdraw payment tokens");
        } finally {
            setIsCashing(false);
        }
    };

    const handleCashSaleTokens = async () => {
        if (!bond || !wallet || !saleToken) return;

        try {
            setIsCashing(true);
            setError(null);

            const { request } = await client.simulateContract({
                address: bond.id as `0x${string}`,
                abi: BondABI,
                functionName: 'withdrawSaleTokens',
                account: wallet.address as `0x${string}`
            });

            const hash = await wallet.sendTransaction(request);
            setTxHash(hash);
            await client.waitForTransactionReceipt({ hash });
            toast.success("Successfully withdrew sale tokens");

            // Refresh data
            await fetchBondData();
        } catch (err: any) {
            console.error('Error withdrawing sale tokens:', err);
            setError(err.message || 'Failed to withdraw sale tokens');
            toast.error("Failed to withdraw sale tokens");
        } finally {
            setIsCashing(false);
        }
    };

    const formatAmount = (amount: bigint, decimals: number = 18) => {
        return ethers.formatUnits(amount, decimals);
    };

    if (!authenticated) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Connect Wallet to Cash Bond</h2>
                    <button
                        onClick={login}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-full"
                    >
                        Connect Wallet
                    </button>
                </div>
            </Layout>
        );
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[500px]">
                    <Preloader
                        use={ThreeDots}
                        size={40}
                        strokeWidth={6}
                        strokeColor="#FFFFFF"
                        duration={2000}
                    />
                </div>
            </Layout>
        );
    }

    if (!bond) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Bond not found</h2>
                    <button
                        onClick={() => navigate('/deals/bonds')}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-full"
                    >
                        Back to Bonds
                    </button>
                </div>
            </Layout>
        );
    }

    const isOwner = bond.owner.toLowerCase() === wallet?.address.toLowerCase();
    const now = Math.floor(Date.now() / 1000);
    const isBondEnded = bond.saleEndTime <= now;

    if (!isOwner) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p className="text-gray-400 mb-6">Only the bond owner can cash out tokens.</p>
                    <button
                        onClick={() => navigate(`/deals/bonds/${id}`)}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-full"
                    >
                        Back to Bond
                    </button>
                </div>
            </Layout>
        );
    }

    if (!isBondEnded) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Bond is Still Active</h2>
                    <p className="text-gray-400 mb-6">You can only cash out tokens after the bond sale has ended.</p>
                    <button
                        onClick={() => navigate(`/deals/bonds/${id}`)}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-full"
                    >
                        Back to Bond
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate(`/deals/bonds/${id}`)}
                        className="mr-4 text-gray-300 hover:text-white transition-colors"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold text-white">Cash Bond</h1>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 border border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-white">Bond Information</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-300">Bond ID</p>
                            <p className="font-medium text-gray-100">{bond.address}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Status</p>
                            <p className="font-medium">
                                <span className="px-3 py-1 rounded-full text-sm bg-red-500/30 text-red-200">
                                    Ended
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Total Raised</p>
                            <p className="font-medium text-gray-100">
                                {paymentToken ? formatAmount(BigInt(bond.totalRaised || '0'), paymentToken.decimals) : '0'} {paymentToken?.symbol || ''}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-white">Payment Tokens</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-300">Token</p>
                                <p className="font-medium text-gray-100">{paymentToken?.symbol || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">Available to Withdraw</p>
                                <p className="font-medium text-gray-100">
                                    {paymentToken ? formatAmount(withdrawablePaymentTokens, paymentToken.decimals) : '0'} {paymentToken?.symbol || ''}
                                </p>
                            </div>
                            <button
                                onClick={handleCashPaymentTokens}
                                disabled={isCashing || withdrawablePaymentTokens <= 0}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors"
                            >
                                {isCashing ? (
                                    <div className="flex items-center justify-center">
                                        <Preloader
                                            use={ThreeDots}
                                            size={20}
                                            strokeWidth={6}
                                            strokeColor="#FFFFFF"
                                            duration={2000}
                                        />
                                        <span className="ml-2">Withdrawing...</span>
                                    </div>
                                ) : (
                                    `Withdraw ${paymentToken?.symbol || 'Payment'} Tokens`
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-white">Sale Tokens</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-300">Token</p>
                                <p className="font-medium text-gray-100">{saleToken?.symbol || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">Available to Withdraw</p>
                                <p className="font-medium text-gray-100">
                                    {saleToken ? formatAmount(withdrawableSaleTokens, saleToken.decimals) : '0'} {saleToken?.symbol || ''}
                                </p>
                            </div>
                            <button
                                onClick={handleCashSaleTokens}
                                disabled={isCashing || withdrawableSaleTokens <= 0}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors"
                            >
                                {isCashing ? (
                                    <div className="flex items-center justify-center">
                                        <Preloader
                                            use={ThreeDots}
                                            size={20}
                                            strokeWidth={6}
                                            strokeColor="#FFFFFF"
                                            duration={2000}
                                        />
                                        <span className="ml-2">Withdrawing...</span>
                                    </div>
                                ) : (
                                    `Withdraw ${saleToken?.symbol || 'Sale'} Tokens`
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CashBond;