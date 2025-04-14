import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import Layout from '../../../layout/Admin';
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
import { usePageTitle } from '../../../hooks/utils/index.tsx';

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
    const [allowance, setAllowance] = useState<bigint>(BigInt(0));
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Successfully Funded Bond");
    const [txHash, setTxHash] = useState<string>("");
    const [tokenBalance, setTokenBalance] = useState<number>(0);

    usePageTitle('Fund Bond');

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

    // Fetch token balance and allowance when component mounts or wallet/bond changes
    useEffect(() => {
        if (bond?.saleToken?.id && wallet?.address) {
            const fetchBalanceAndAllowance = async () => {
                try {
                    // Fetch token balance
                    const balance = await getTokenBalance(
                        bond.saleToken.id,
                        wallet.address as `0x${string}`
                    );
                    setTokenBalance(Number(balance));

                    // Fetch token allowance
                    const tokenAllowance = await client.readContract({
                        address: bond.saleToken.id as `0x${string}`,
                        abi: ERC20ABI,
                        functionName: 'allowance',
                        args: [wallet.address, bond.id]
                    });

                    setAllowance(tokenAllowance as bigint);
                } catch (error) {
                    console.error('Error fetching token data:', error);
                    setTokenBalance(0);
                }
            };
            fetchBalanceAndAllowance();
        }
    }, [bond, wallet]);

    // Update allowance when amount changes
    useEffect(() => {
        if (amount && bond?.saleToken?.id && wallet?.address) {
            const checkAllowance = async () => {
                try {
                    const tokenAllowance = await client.readContract({
                        address: bond.saleToken.id as `0x${string}`,
                        abi: ERC20ABI,
                        functionName: 'allowance',
                        args: [wallet.address, bond.id]
                    });

                    setAllowance(tokenAllowance as bigint);
                } catch (error) {
                    console.error('Error checking allowance:', error);
                }
            };
            checkAllowance();
        }
    }, [amount, bond?.saleToken?.id, wallet?.address]);

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

            // Fetch the new allowance after approval
            const newAllowance = await client.readContract({
                address: bond.saleToken.id as `0x${string}`,
                abi: ERC20ABI,
                functionName: 'allowance',
                args: [account, bond.id]
            });

            setAllowance(newAllowance as bigint);
            setSuccess('Token approval successful! You can now fund the bond.');
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

            // Format the amount correctly for the fundBond function
            const amountToSend = ethers.parseUnits(amount.toString(), bond.saleToken.decimals);

            const { request } = await client.simulateContract({
                address: bond.id as `0x${string}`,
                abi: BondABI,
                functionName: 'fundBond',
                args: [amountToSend],
                account
            });

            const hash = await walletClient.writeContract(request);
            await client.waitForTransactionReceipt({ hash });

            // Refresh bond data and reset states
            await fetchBondData();

            // Update the success message with the proper token symbol
            const displayAmount = amount.toString();
            const tokenSymbol = bond.saleToken?.symbol || 'tokens';
            setSuccess(`Successfully funded bond with ${displayAmount} ${tokenSymbol}!`);

            // Reset amount input
            setAmount(0);

            // Show success toast and transaction modal
            toast.success('Funding successful');
            setTxHash(hash);
            setShowTxModal(true);

            // Refetch allowance after funding
            if (bond.saleToken?.id && wallet?.address) {
                const newAllowance = await client.readContract({
                    address: bond.saleToken.id as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: 'allowance',
                    args: [account, bond.id]
                });
                setAllowance(newAllowance as bigint);
            }
        } catch (err: any) {
            console.error('Error funding bond:', err);
            toast.error(err.message || 'Funding failed');
        } finally {
            setIsFunding(false);
        }
    };

    const handleMaxAmount = () => {
        if (!bond?.bondSize || !bond?.saleToken?.decimals) return;

        try {
            // Convert bondSize to a displayable number format
            // const maxAmount = Number(ethers.formatUnits(bond.bondSize, bond.saleToken.decimals));
            setAmount(Number(bond.bondSize));
        } catch (error) {
            console.error('Error setting max amount:', error);
        }
    };

    // Get bond name with fallbacks
    const bondName = bond?.bondInfo?.projectName || bond?.metadataURI || 'Bond';

    // Calculate amount in wei safely
    const amountInWei = useMemo(() => {
        try {
            return amount && bond?.saleToken?.decimals
                ? ethers.parseUnits(amount.toString(), bond.saleToken.decimals)
                : BigInt(0);
        } catch (error) {
            console.error('Error parsing amount:', error);
            return BigInt(0);
        }
    }, [amount, bond?.saleToken?.decimals]);

    // Check if approval is needed by comparing BigInt values directly
    const needsApproval = useMemo(() => {
        return amount > 0 && amountInWei > allowance;
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
                            <p className="font-medium text-gray-900 dark:text-white">{bond.saleToken?.symbol || 'Token'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Bond Size</p>
                            <p className="font-medium text-gray-900 dark:text-white">{Number(bond.bondSize)} {bond.saleToken?.symbol || 'tokens'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Current Total Raised</p>
                            <p className="font-medium text-gray-900 dark:text-white">{Number(bond.totalSold).toFixed(0)} tokens</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Fund Bond</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-300">Amount to Fund</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Balance: {Number(tokenBalance).toLocaleString()} {bond.saleToken?.symbol || 'tokens'}</p>
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

                            {amount && !hasEnoughBalance ? (
                                <p className="text-red-600 dark:text-red-400 text-sm mt-2">Insufficient balance</p>
                            ) : ""}
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
                                    `Approve ${bond.saleToken?.symbol || 'Token'}`
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