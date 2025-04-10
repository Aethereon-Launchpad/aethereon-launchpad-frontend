import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import Layout from '../../../layout';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useBond, useBondUser, useBondStakingTiers } from '../../../hooks/web3';
import BondABI from '../../../abis/Bond.json';
import ERC20ABI from '../../../abis/ERC20.json';
import { publicClient as client } from '../../../config';

function BondDetails() {
    const { address } = useParams<{ address: string }>();
    const navigate = useNavigate();
    const { authenticated, login } = usePrivy();
    const { wallets } = useWallets();
    const [wallet, setWallet] = useState<any>(null);
    const [buyAmount, setBuyAmount] = useState<string>('');
    const [isBuying, setIsBuying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use custom hooks for fetching data
    const { data: bond, loading: bondLoading, error: bondError, refetch: refetchBond } =
        useBond(null, { polling: true }, address as `0x${string}` | null);

    const { data: userData, loading: userDataLoading, error: userDataError, refetch: refetchUserData } =
        useBondUser(
            address as `0x${string}`,
            wallet?.address as `0x${string}`,
            { polling: true }
        );

    const { data: stakingTiers, loading: tiersLoading } =
        useBondStakingTiers(address as `0x${string}`, { polling: true });

    useEffect(() => {
        if (authenticated && wallets.length > 0) {
            const activeWallet = wallets[0];
            setWallet(activeWallet);
        }
    }, [authenticated, wallets]);

    const handleBuy = async () => {
        if (!bond || !wallet || !buyAmount) return;

        try {
            setIsBuying(true);
            setError(null);

            // Get token decimals for proper amount conversion
            const paymentTokenDecimals = await client.readContract({
                address: bond.paymentToken as `0x${string}`,
                abi: ERC20ABI,
                functionName: 'decimals'
            });

            // Convert amount to token units
            const amountToBuy = ethers.parseUnits(buyAmount, Number(paymentTokenDecimals));

            // Check if we need to approve tokens first
            const allowance = await client.readContract({
                address: bond.paymentToken as `0x${string}`,
                abi: ERC20ABI,
                functionName: 'allowance',
                args: [wallet.address, bond.address]
            });

            // If allowance is less than amount, approve first
            if ((allowance as bigint) < amountToBuy) {
                const { request: approveRequest } = await client.simulateContract({
                    address: bond.paymentToken as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: 'approve',
                    args: [bond.address, amountToBuy],
                    account: wallet.address as `0x${string}`
                });

                const approveHash = await wallet.sendTransaction(approveRequest);
                await client.waitForTransactionReceipt({ hash: approveHash });
            }

            // Now buy tokens
            const { request } = await client.simulateContract({
                address: bond.address as `0x${string}`,
                abi: BondABI,
                functionName: 'buy',
                args: [amountToBuy],
                account: wallet.address as `0x${string}`
            });

            const hash = await wallet.sendTransaction(request);
            await client.waitForTransactionReceipt({ hash });

            // Refresh data
            refetchBond();
            refetchUserData();
            setBuyAmount('');
        } catch (err: any) {
            console.error('Error buying bond:', err);
            setError(err.message || 'Failed to buy bond');
        } finally {
            setIsBuying(false);
        }
    };

    const handleClaim = async () => {
        if (!bond || !wallet) return;

        try {
            setIsBuying(true);
            setError(null);

            const { request } = await client.simulateContract({
                address: bond.address as `0x${string}`,
                abi: BondABI,
                functionName: 'claim',
                account: wallet.address as `0x${string}`
            });

            const hash = await wallet.sendTransaction(request);
            await client.waitForTransactionReceipt({ hash });

            // Refresh data
            refetchUserData();
        } catch (err: any) {
            console.error('Error claiming tokens:', err);
            setError(err.message || 'Failed to claim tokens');
        } finally {
            setIsBuying(false);
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    const formatAmount = (amount: bigint | number, decimals: number = 18) => {
        if (typeof amount === 'number') {
            return amount.toString();
        }
        return ethers.formatUnits(amount, decimals);
    };

    if (!authenticated) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Connect Wallet to View Bond</h2>
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

    const isLoading = bondLoading || userDataLoading;

    if (isLoading) {
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

    const displayError = error || bondError?.message || userDataError?.message;

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

    const now = Math.floor(Date.now() / 1000);
    const isSaleActive = bond.isActive && bond.saleStartTime <= now && bond.saleEndTime > now;
    const isInWhitelistPeriod = bond.whitelistStartTime <= now && bond.saleStartTime > now;
    const canClaim = bond.saleEndTime + bond.withdrawDelay <= now;

    // Extract bond info from metadata if available
    const bondInfo = bond.bondInfo || {};
    const bondName = bondInfo.projectName || bond.metadataURI;
    const isOwner = bond.owner.toLowerCase() === wallet?.address.toLowerCase();

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate('/deals/bonds')}
                        className="mr-4 text-gray-400 hover:text-white"
                    >
                        ← Back
                    </button>
                    <h1 className="text-3xl font-bold">{bondName}</h1>

                    {isOwner && (
                        <div className="ml-auto space-x-4">
                            <button
                                onClick={() => navigate(`/deals/bonds/fund/${address}`)}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                            >
                                Fund Bond
                            </button>
                            <button
                                onClick={() => navigate(`/deals/bonds/cash/${address}`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Cash Bond
                            </button>
                        </div>
                    )}
                </div>

                {displayError && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
                        {displayError}
                    </div>
                )}

                {/* Bond header with image if available */}
                {bondInfo.images?.bg && (
                    <div className="w-full h-[200px] bg-[#0D0D0D] rounded-lg overflow-hidden mb-6 relative">
                        <img
                            src={bondInfo.images.bg}
                            alt={bondName}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center p-6">
                            {bondInfo.images?.logo && (
                                <div className="w-24 h-24 bg-black p-2 rounded-lg mr-4 shadow-lg">
                                    <img
                                        src={bondInfo.images.logo}
                                        alt={bondName}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                            <div>
                                <h2 className="text-2xl font-bold">{bondName}</h2>
                                {bondInfo.description && (
                                    <p className="text-gray-300 mt-2 max-w-3xl">{bondInfo.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">Bond Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Status</p>
                                    <p className="font-medium">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${isSaleActive
                                                    ? 'bg-green-500/20 text-green-500'
                                                    : isInWhitelistPeriod
                                                        ? 'bg-blue-500/20 text-blue-500'
                                                        : bond.saleEndTime > now
                                                            ? 'bg-yellow-500/20 text-yellow-500'
                                                            : 'bg-red-500/20 text-red-500'
                                                }`}
                                        >
                                            {isSaleActive
                                                ? 'Sale Active'
                                                : isInWhitelistPeriod
                                                    ? 'Whitelist Period'
                                                    : bond.saleEndTime > now
                                                        ? 'Upcoming'
                                                        : 'Ended'}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Bond Type</p>
                                    <p className="font-medium">{bond.bondType === 0 ? 'Dynamic' : 'Fixed'}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Bond Size</p>
                                    <p className="font-medium">{formatAmount(bond.bondSize)} tokens</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Total Raised</p>
                                    <p className="font-medium">{formatAmount(bond.totalRaised)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Whitelist Start</p>
                                    <p className="font-medium">{formatDate(bond.whitelistStartTime)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Sale Period</p>
                                    <p className="font-medium">
                                        {formatDate(bond.saleStartTime)} - {formatDate(bond.saleEndTime)}
                                    </p>
                                </div>

                                {bond.bondType === 1 && (
                                    <div>
                                        <p className="text-sm text-gray-400">Fixed Discount</p>
                                        <p className="font-medium">{bond.fixedDiscount / 100}%</p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-gray-400">Withdraw Available</p>
                                    <p className="font-medium">{formatDate(bond.saleEndTime + bond.withdrawDelay)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Staking tiers section if available */}
                        {stakingTiers && stakingTiers.length > 0 && (
                            <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
                                <h2 className="text-xl font-bold mb-4">Staking Tiers</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left border-b border-gray-800">
                                                <th className="p-2 text-gray-400 font-normal">Tier</th>
                                                <th className="p-2 text-gray-400 font-normal">Minimum Staked</th>
                                                <th className="p-2 text-gray-400 font-normal">Multiplier</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stakingTiers.map((tier, index) => (
                                                <tr key={index} className="border-b border-gray-800">
                                                    <td className="p-2">Tier {index + 1}</td>
                                                    <td className="p-2">{tier.threshold}</td>
                                                    <td className="p-2">{tier.multiplier}x</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Project details section if available */}
                        {bondInfo.description && (
                            <div className="bg-[#1A1A1A] rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Project Details</h2>
                                <p className="text-gray-300">{bondInfo.description}</p>

                                {/* Social links */}
                                {bondInfo.socials && Object.keys(bondInfo.socials).length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-medium mb-2">Links</h3>
                                        <div className="flex space-x-4">
                                            {bondInfo.website && (
                                                <a href={bondInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                                                    Website
                                                </a>
                                            )}
                                            {bondInfo.socials.twitter && (
                                                <a href={bondInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                                                    Twitter
                                                </a>
                                            )}
                                            {bondInfo.socials.telegram && (
                                                <a href={bondInfo.socials.telegram} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                                                    Telegram
                                                </a>
                                            )}
                                            {bondInfo.socials.discord && (
                                                <a href={bondInfo.socials.discord} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                                                    Discord
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#1A1A1A] rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Your Participation</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400">Amount Paid</p>
                                    <p className="font-medium">{formatAmount(userData.amountPaid)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Claimable Tokens</p>
                                    <p className="font-medium">{formatAmount(userData.claimableTokens)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Whitelist Status</p>
                                    <p className="font-medium">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${userData.isWhitelisted ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                                }`}
                                        >
                                            {userData.isWhitelisted ? 'Whitelisted' : 'Not Whitelisted'}
                                        </span>
                                    </p>
                                </div>

                                {isSaleActive && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">Buy Tokens</p>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={buyAmount}
                                                onChange={(e) => setBuyAmount(e.target.value)}
                                                placeholder="Amount"
                                                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg"
                                            />
                                            <button
                                                onClick={handleBuy}
                                                disabled={isBuying || !buyAmount}
                                                className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-lg disabled:opacity-50"
                                            >
                                                {isBuying ? 'Buying...' : 'Buy'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {canClaim && userData.claimableTokens > 0 && (
                                    <button
                                        onClick={handleClaim}
                                        disabled={isBuying}
                                        className="w-full bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-lg disabled:opacity-50"
                                    >
                                        {isBuying ? 'Claiming...' : 'Claim Tokens'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BondDetails; 