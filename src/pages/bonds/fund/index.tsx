import React, { useState, useEffect, useMemo } from 'react';
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
import { useBond } from '../../../hooks/web3/useBond';
import { toast } from 'react-hot-toast';
import { Oval } from 'react-preloader-icon';
import TxReceipt from "../../../components/Modal/TxReceipt";
import { IoWalletSharp } from "react-icons/io5";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from 'viem/chains';
import { getTokenBalance, getTokenDecimals } from '../../../utils/web3/actions';

interface Bond {
    id: string;
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
    bondSize: string;
    totalSold: string;
    whitelistStartTime: number;
    saleStartTime: number;
    saleEndTime: number;
    withdrawDelay: number;
    bondInfo?: {
        projectName: string;
        description: string;
        images?: {
            logo?: string;
            bg?: string;
        };
    };
}


const createViemWalletClient = () => {
    return createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum as any)
    });
};


function FundBond() {
    const { id } = useParams<{ id: `0x${string}` }>();
    const navigate = useNavigate();
    const { authenticated, login } = usePrivy();
    const { wallets } = useWallets();
    const [wallet, setWallet] = useState<any>(null);
    const [amount, setAmount] = useState<number>(0);
    const [isApproving, setIsApproving] = useState(false);
    const [isFunding, setIsFunding] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [allowance, setAllowance] = useState<number>(0);
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Successfully Funded Bond");
    const [txHash, setTxHash] = useState<string>("");
    const [tokenBalance, setTokenBalance] = useState<number>(0);

    const {
        data: bond,
        loading,
        error: bondError,
        refetch: fetchBondData
    } = useBond(null, { polling: false }, id as `0x${string}`);

    useEffect(() => {
        if (authenticated && wallets.length > 0) {
            const activeWallet = wallets[0];
            setWallet(activeWallet);
        }
    }, [authenticated, wallets]);

    useEffect(() => {
        if (bond?.saleToken?.id && wallet?.address) {
            const fetchBalance = async () => {
                try {
                    const balance = await getTokenBalance(
                        bond.saleToken.id,
                        wallet.address as `0x${string}`
                    );
                    setTokenBalance(Number(balance));
                } catch (error) {
                    console.error('Error fetching token balance:', error);
                    setTokenBalance(0);
                }
            };
            fetchBalance();
        }
    }, [bond, wallet]);

    const handleApprove = async () => {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        if (!bond || !amount) return;

        try {
            setIsApproving(true);
            setSuccess(null);

            const amountToApprove = ethers.parseUnits(amount.toString(), bond.saleToken.decimals);

            const { request } = await client.simulateContract({
                address: bond.saleToken.id as `0x${string}`,
                abi: ERC20ABI,
                functionName: 'approve',
                args: [bond.id, amountToApprove],
                account
            });

            const hash = await walletClient.writeContract(request);
            await client.waitForTransactionReceipt({ hash });

            const newAllowance = await client.readContract({
                address: bond.saleToken.id as `0x${string}`,
                abi: ERC20ABI,
                functionName: 'allowance',
                args: [account, bond.id]
            });

            setAllowance(Number(newAllowance));
            setSuccess('Token approval successful!');
            toast.success('Token approval successful!');
        } catch (err: any) {
            console.error('Error approving tokens:', err);
            toast.error('Approval failed');
        } finally {
            setIsApproving(false);
        }
    };

    const handleFund = async () => {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        if (!bond || !amount) return;

        try {
            setIsFunding(true);
            setSuccess(null);

            const amountToFund = ethers.parseUnits(amount.toString(), bond.saleToken.decimals);

            const { request } = await client.simulateContract({
                address: bond.id as `0x${string}`,
                abi: BondABI,
                functionName: 'fund',
                args: [amountToFund],
                account
            });

            const hash = await walletClient.writeContract(request);
            await client.waitForTransactionReceipt({ hash });

            await fetchBondData();
            setAmount(0);
            setSuccess(`Successfully funded bond with ${amount} ${bond.saleToken.symbol}!`);
            toast.success('Funding successful');
            setTxHash(hash);
            setShowTxModal(true);
        } catch (err: any) {
            console.error('Error funding bond:', err);
            toast.error('Funding failed');
        } finally {
            setIsFunding(false);
        }
    };

    const handleMaxAmount = () => {
        if (tokenBalance > 0) {
            setAmount(tokenBalance);
        }
    };

    const formatAmount = (amount: bigint, decimals: number = 18) => {
        return ethers.formatUnits(amount, decimals);
    };

    // Get token info with fallbacks
    const tokenSymbol = bond?.saleToken?.symbol || '';
    const tokenDecimals = bond?.saleToken?.decimals || 18;

    // Get bond name with fallbacks
    const bondName = bond?.bondInfo?.projectName || bond?.metadataURI || 'Bond';

    // Calculate amount in wei safely
    const amountInWei = useMemo(() => {
        try {
            return amount ? ethers.parseUnits(amount.toString(), tokenDecimals) : BigInt(0);
        } catch (error) {
            console.error('Error parsing amount:', error);
            return BigInt(0);
        }
    }, [amount, tokenDecimals]);

    // Check if approval is needed
    const needsApproval = useMemo(() => {
        return amount && amountInWei > allowance;
    }, [amount, amountInWei, allowance]);

    // Check if user has enough balance
    const hasEnoughBalance = useMemo(() => {
        try {
            return tokenBalance >= Number(amount);
        } catch (error) {
            console.error('Error checking balance:', error);
            return false;
        }
    }, [tokenBalance, amount]);

    if (!authenticated) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Connect Wallet to Fund Bond</h2>
                    <button
                        onClick={login}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors"
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

    // Update bond size and total raised display
    const bondSize = bond ? ethers.parseUnits(bond.bondSize, tokenDecimals) : BigInt(0);
    const totalRaised = bond ? ethers.parseUnits(bond.totalSold, tokenDecimals) : BigInt(0);

    return (
        <Layout>
            <TxReceipt
                onClose={() => setShowTxModal(false)}
                title={txReceiptTitle}
                txHash={txHash}
                visible={showTxModal}
            />
            <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate(`/deals/bonds/${id}`)}
                        className="mr-4 text-gray-400 hover:text-white"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold">Fund Bond: {bondName}</h1>
                </div>

                {bondError && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
                        {bondError.message}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-lg mb-6">
                        {success}
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Bond Information</h2>
                    <div className="space-y-4">
                        {bond.bondInfo?.images?.logo && (
                            <div className="flex items-center mb-4">
                                <img
                                    src={bond.bondInfo.images.logo}
                                    alt={bondName}
                                    className="w-16 h-16 rounded-lg mr-4 object-contain bg-gray-100 dark:bg-gray-700 p-1"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{bondName}</h3>
                                    {bond.bondInfo.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{bond.bondInfo.description.substring(0, 100)}...</p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Bond Address</p>
                            <p className="font-medium text-sm truncate text-gray-900 dark:text-white">{bond.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Token to Fund</p>
                            <p className="font-medium text-gray-900 dark:text-white">{tokenSymbol}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Bond Size</p>
                            <p className="font-medium text-gray-900 dark:text-white">{Number(bondSize)} {tokenSymbol}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Current Total Raised</p>
                            <p className="font-medium text-gray-900 dark:text-white">{Number(totalRaised)} tokens</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Fund Bond</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-300">Amount to Fund</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Balance: {tokenBalance} {tokenSymbol}</p>
                            </div>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    step={0.01}
                                    min={0}
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={handleMaxAmount}
                                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    MAX
                                </button>
                            </div>

                            {amount && !hasEnoughBalance && (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-2">Insufficient balance</p>
                            )}
                        </div>

                        {needsApproval ? (
                            <button
                                onClick={handleApprove}
                                disabled={isApproving || !amount || !hasEnoughBalance}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                            >
                                {isApproving ? (
                                    <div className="flex items-center justify-center">
                                        <Preloader
                                            use={ThreeDots}
                                            size={20}
                                            strokeWidth={6}
                                            strokeColor="#FFFFFF"
                                            duration={2000}
                                        />
                                        <span className="ml-2">Approving...</span>
                                    </div>
                                ) : (
                                    `Approve ${tokenSymbol}`
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleFund}
                                disabled={isFunding || !amount || !hasEnoughBalance}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                            >
                                {isFunding ? (
                                    <div className="flex items-center justify-center">
                                        <Preloader
                                            use={ThreeDots}
                                            size={20}
                                            strokeWidth={6}
                                            strokeColor="#FFFFFF"
                                            duration={2000}
                                        />
                                        <span className="ml-2">Funding...</span>
                                    </div>
                                ) : (
                                    'Fund Bond'
                                )}
                            </button>
                        )}

                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                            <p className="font-medium text-gray-900 dark:text-white mb-1">Note:</p>
                            <p>Funding a bond increases the amount of tokens available for sale. Only deposit tokens that you want to make available for users to purchase during the bond sale.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default FundBond;