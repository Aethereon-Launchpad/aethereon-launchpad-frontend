import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import Layout from '../../../layout';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { getBondDataByAddress } from '../../../utils/web3/bond';
import { getContractAddress } from '../../../utils/source';
import BondABI from '../../../abis/Bond.json';
import ERC20ABI from '../../../abis/ERC20.json';
import { publicClient as client } from '../../../config';

interface Bond {
    address: string;
    metadataURI: string;
    paymentToken: string;
    saleToken: string;
    whitelistStartTime: number;
    saleStartTime: number;
    saleEndTime: number;
    withdrawDelay: number;
    owner: string;
    bondSize: bigint;
    bondType: number;
    fixedDiscount: number;
    totalRaised: bigint;
    totalTokensSold: bigint;
    isActive: boolean;
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
            setBond(bondData);

            // Fetch token details
            const paymentTokenContract = {
                address: bondData.paymentToken as `0x${string}`,
                abi: ERC20ABI
            };

            const saleTokenContract = {
                address: bondData.saleToken as `0x${string}`,
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
                    args: [bondData.address]
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
                    args: [bondData.address]
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
            const isOwner = bondData.owner.toLowerCase() === wallet.address.toLowerCase();

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
                address: bond.address as `0x${string}`,
                abi: BondABI,
                functionName: 'withdrawPaymentTokens',
                account: wallet.address as `0x${string}`
            });

            const hash = await wallet.sendTransaction(request);
            await client.waitForTransactionReceipt({ hash });

            // Refresh data
            await fetchBondData();
        } catch (err: any) {
            console.error('Error withdrawing payment tokens:', err);
            setError(err.message || 'Failed to withdraw payment tokens');
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
                address: bond.address as `0x${string}`,
                abi: BondABI,
                functionName: 'withdrawSaleTokens',
                account: wallet.address as `0x${string}`
            });

            const hash = await wallet.sendTransaction(request);
            await client.waitForTransactionReceipt({ hash });

            // Refresh data
            await fetchBondData();
        } catch (err: any) {
            console.error('Error withdrawing sale tokens:', err);
            setError(err.message || 'Failed to withdraw sale tokens');
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
                        className="mr-4 text-gray-400 hover:text-white"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold">Cash Bond</h1>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Bond Information</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-400">Bond ID</p>
                            <p className="font-medium">{bond.address}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Status</p>
                            <p className="font-medium">
                                <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-500">
                                    Ended
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Raised</p>
                            <p className="font-medium">
                                {paymentToken ? formatAmount(bond.totalRaised, paymentToken.decimals) : '0'} {paymentToken?.symbol || ''}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="bg-[#1A1A1A] rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Payment Tokens</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-400">Token</p>
                                <p className="font-medium">{paymentToken?.symbol || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Available to Withdraw</p>
                                <p className="font-medium">
                                    {paymentToken ? formatAmount(withdrawablePaymentTokens, paymentToken.decimals) : '0'} {paymentToken?.symbol || ''}
                                </p>
                            </div>
                            <button
                                onClick={handleCashPaymentTokens}
                                disabled={isCashing || withdrawablePaymentTokens <= 0}
                                className="w-full bg-primary hover:bg-primary/80 disabled:bg-gray-700 text-white py-2 px-6 rounded-lg"
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

                    <div className="bg-[#1A1A1A] rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Sale Tokens</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-400">Token</p>
                                <p className="font-medium">{saleToken?.symbol || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Available to Withdraw</p>
                                <p className="font-medium">
                                    {saleToken ? formatAmount(withdrawableSaleTokens, saleToken.decimals) : '0'} {saleToken?.symbol || ''}
                                </p>
                            </div>
                            <button
                                onClick={handleCashSaleTokens}
                                disabled={isCashing || withdrawableSaleTokens <= 0}
                                className="w-full bg-primary hover:bg-primary/80 disabled:bg-gray-700 text-white py-2 px-6 rounded-lg"
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