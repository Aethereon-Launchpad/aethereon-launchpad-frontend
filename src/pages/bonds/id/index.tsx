import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { useBond, useBondUser, useBondStakingTiers } from '../../../hooks/web3';
import { isAfter, isBefore, format, differenceInDays } from 'date-fns';
import Layout from '../../../layout';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { FaDiscord, FaGlobe, FaTelegram, FaTwitter } from 'react-icons/fa6';
import CurrentChain from '../../../components/Presale/CurrentChain';

function CountdownTimer({
    whitelistStartTime,
    saleStartTime,
    saleEndTime,
    withdrawTime
}: {
    whitelistStartTime: number;
    saleStartTime: number;
    saleEndTime: number;
    withdrawTime: number;
}) {
    const now = new Date();
    let targetTime: Date | null = null;
    let label = '';

    // Set the appropriate target time based on the current stage
    if (isBefore(now, new Date(whitelistStartTime * 1000))) {
        targetTime = new Date(whitelistStartTime * 1000);
        label = 'Whitelist starts in';
    } else if (isBefore(now, new Date(saleStartTime * 1000))) {
        targetTime = new Date(saleStartTime * 1000);
        label = 'Sale starts in';
    } else if (isBefore(now, new Date(saleEndTime * 1000))) {
        targetTime = new Date(saleEndTime * 1000);
        label = 'Sale ends in';
    } else if (isBefore(now, new Date(withdrawTime * 1000))) {
        targetTime = new Date(withdrawTime * 1000);
        label = 'Claiming starts in';
    } else {
        // All periods have passed
        return <div className="text-white text-center">Claim period active</div>;
    }

    const calculateTimeLeft = () => {
        if (!targetTime) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const difference = targetTime.getTime() - new Date().getTime();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            // If countdown is complete, refresh the page to update the stage
            if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                window.location.reload();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime]);

    return (
        <div className="text-center">
            <p className="text-lg text-gray-400 mb-2">{label}</p>
            <div className="flex justify-center space-x-4">
                <div className="text-center">
                    <div className="text-3xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm text-gray-400">Days</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm text-gray-400">Hours</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm text-gray-400">Seconds</div>
                </div>
            </div>
        </div>
    );
}

function ProgressBar({ totalSold, bondSize }: { totalSold: number; bondSize: number }) {
    const progress = (totalSold / bondSize) * 100;

    return (
        <div className="w-full bg-gray-800  h-4 overflow-hidden">
            <div
                className="bg-primary h-full "
                style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
        </div>
    );
}

function StakingTiersList({ tiers }: { tiers: any[] }) {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Staking Tiers</h3>
            <div className="bg-[#111115]  p-4">
                <div className="grid grid-cols-2 gap-4">
                    {tiers.map((tier, index) => (
                        <div key={index} className="text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Tier {index + 1}:</span>
                                <span>{tier.threshold} FINC</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Multiplier:</span>
                                <span>{tier.multiplier}x</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function BondStage({
    bond,
    userData,
    onWhitelist,
    onPurchase,
    onClaim,
    isConnected,
    onConnect
}: {
    bond: any;
    userData: any;
    onWhitelist: () => void;
    onPurchase: (amount: string) => void;
    onClaim: () => void;
    isConnected: boolean;
    onConnect: () => void;
}) {
    const now = new Date();
    const [purchaseAmount, setPurchaseAmount] = useState('');

    const whitelistStartDate = new Date(bond.whitelistStartTime * 1000);
    const saleStartDate = new Date(bond.saleStartTime * 1000);
    const saleEndDate = new Date(bond.saleEndTime * 1000);
    const withdrawDate = new Date(bond.withdrawTime * 1000);

    // Before whitelist
    if (isBefore(now, whitelistStartDate)) {
        return (
            <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Bond not started yet</h3>
                <p className="text-gray-400">The whitelist period will start on {format(whitelistStartDate, "PPP 'at' p")}</p>
            </div>
        );
    }

    // Whitelist period
    if (isBefore(now, saleStartDate)) {
        return (
            <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Whitelist Period</h3>
                {!isConnected ? (
                    <button
                        onClick={onConnect}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 "
                    >
                        Connect Wallet to Join Whitelist
                    </button>
                ) : userData?.isWhitelisted ? (
                    <p className="text-green-500">✓ You are whitelisted for this bond</p>
                ) : (
                    <button
                        onClick={onWhitelist}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 "
                    >
                        Join Whitelist
                    </button>
                )}
            </div>
        );
    }

    // Sale period
    if (isBefore(now, saleEndDate)) {
        return (
            <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Bond Purchase</h3>
                {!isConnected ? (
                    <button
                        onClick={onConnect}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 "
                    >
                        Connect Wallet to Purchase
                    </button>
                ) : !userData?.isWhitelisted ? (
                    <p className="text-red-500">You are not whitelisted for this bond</p>
                ) : (
                    <div className="max-w-sm mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2">Purchase Amount ({bond.paymentToken.symbol})</label>
                            <input
                                type="text"
                                value={purchaseAmount}
                                onChange={(e) => setPurchaseAmount(e.target.value)}
                                className="w-full p-2 bg-[#1A1A1A] border border-gray-700 rounded text-white"
                                placeholder="Enter amount to purchase"
                            />
                        </div>
                        <div className="mb-4 text-sm text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Current Discount:</span>
                                <span>{(bond.currentDiscount * 100).toFixed(2)}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">You've Paid:</span>
                                <span>{userData?.amountPaid || 0} {bond.paymentToken.symbol}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => onPurchase(purchaseAmount)}
                            disabled={!purchaseAmount || parseFloat(purchaseAmount) <= 0}
                            className="bg-primary hover:bg-primary/80 disabled:bg-gray-700 text-white py-2 px-6  w-full"
                        >
                            Purchase Bond
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Waiting for claim period
    if (isBefore(now, withdrawDate)) {
        return (
            <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Bond Sale Ended</h3>
                <p className="text-gray-400">
                    Claiming period will start on {format(withdrawDate, "PPP 'at' p")}
                </p>
                {userData?.amountPaid > 0 && (
                    <div className="mt-4 p-4 bg-[#1A1A1A] ">
                        <p className="text-gray-300">Your Participation</p>
                        <p className="text-xl">{userData.amountPaid} {bond.paymentToken.symbol}</p>
                    </div>
                )}
            </div>
        );
    }

    // Claim period
    return (
        <div className="text-center p-6">
            <h3 className="text-xl font-bold mb-4">Claim Period</h3>
            {!isConnected ? (
                <button
                    onClick={onConnect}
                    className="bg-primary hover:bg-primary/80 text-white py-2 px-6 "
                >
                    Connect Wallet to Claim
                </button>
            ) : userData?.claimableTokens > 0 ? (
                <div>
                    <div className="mb-4 p-4 bg-[#1A1A1A] ">
                        <p className="text-gray-300">Claimable Tokens</p>
                        <p className="text-xl">{userData.claimableTokens} {bond.saleToken.symbol}</p>
                    </div>
                    <button
                        onClick={onClaim}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 "
                    >
                        Claim Tokens
                    </button>
                </div>
            ) : userData?.amountPaid > 0 ? (
                <p className="text-yellow-500">You don't have any tokens to claim right now</p>
            ) : (
                <p className="text-gray-400">You didn't participate in this bond</p>
            )}
        </div>
    );
}

function BondDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authenticated, login } = usePrivy();
    const { wallets } = useWallets();
    const [wallet, setWallet] = useState<any>(null);
    const [currentChain, setCurrentChain] = useState('56');

    // First, fetch the bond data using the project name from URL parameter
    const { data: bondData, loading: bondLoading, error: bondError } = useBond(id || null);

    // Always initialize these hooks with fallback values when bondData is undefined
    // This ensures hooks are always called in the same order
    const bondId = bondData?.id as `0x${string}` || '0x0000000000000000000000000000000000000000';
    const walletAddress = wallet?.address as `0x${string}` || '0x0000000000000000000000000000000000000000';

    // Now call the other hooks with default values to ensure they're always called
    const { data: stakingTiers, loading: tiersLoading } = useBondStakingTiers(bondId);
    const { data: userData, loading: userDataLoading } = useBondUser(bondId, walletAddress, { polling: true });

    // Set wallet and chain
    useEffect(() => {
        if (authenticated && wallets.length > 0) {
            const activeWallet = wallets[0];
            setWallet(activeWallet);

            const chainInfo = activeWallet.chainId;
            const chainId = chainInfo.split(':')[1];
            setCurrentChain(chainId);
        }
    }, [authenticated, wallets]);

    // Mock functions for bond actions - these would be replaced with actual contract interactions
    const handleWhitelist = () => {
        alert('Whitelist function would be called here');
    };

    const handlePurchase = (amount: string) => {
        if (!amount) return;
        alert(`Purchase function would be called with amount: ${amount}`);
    };

    const handleClaim = () => {
        alert('Claim function would be called here');
    };

    if (bondLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[500px]">
                    <Preloader
                        use={ThreeDots}
                        size={60}
                        strokeWidth={6}
                        strokeColor="#5325A9"
                        duration={2000}
                    />
                </div>
            </Layout>
        );
    }

    if (bondError.message || !bondData) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-red-500 text-xl font-medium mt-4">Bond Not Found</h3>
                    <p className="text-gray-400 max-w-md mt-2">
                        We couldn't find the bond you're looking for. It may have been removed or you might have followed an invalid link.
                    </p>
                    <button
                        onClick={() => navigate('/deals/bonds')}
                        className="mt-6 px-6 py-2  bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                    >
                        Back to Bonds
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="font-space text-white">
                {/* Hero section with background */}
                <div className="relative h-[300px]">
                    <img
                        src={bondData.bondInfo?.images?.bg}
                        alt={bondData.bondInfo?.projectName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>

                    {/* Project logo and name */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex items-center">
                        <div className="h-20 w-20  overflow-hidden bg-black mr-4 border-4 border-primary">
                            <img
                                src={bondData.bondInfo?.images?.logo}
                                alt={bondData.bondInfo?.projectName}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{bondData.bondInfo?.projectName}</h1>
                            <div className="flex items-center mt-2 space-x-4">
                                {bondData.bondInfo?.website && (
                                    <a href={bondData.bondInfo.website} target="_blank" rel="noopener noreferrer">
                                        <FaGlobe size={20} />
                                    </a>
                                )}
                                {bondData.bondInfo?.socials?.twitter && (
                                    <a href={bondData.bondInfo.socials.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter size={20} />
                                    </a>
                                )}
                                {bondData.bondInfo?.socials?.telegram && (
                                    <a href={bondData.bondInfo.socials.telegram} target="_blank" rel="noopener noreferrer">
                                        <FaTelegram size={20} />
                                    </a>
                                )}
                                {bondData.bondInfo?.socials?.discord && (
                                    <a href={bondData.bondInfo.socials.discord} target="_blank" rel="noopener noreferrer">
                                        <FaDiscord size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="ml-auto">
                            <div className="bg-[#291254] uppercase p-2">
                                <CurrentChain chainId={currentChain} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column */}
                        <div className="lg:w-2/3">
                            {/* Project description */}
                            <div className="bg-[#111115]  p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4">About {bondData.bondInfo?.projectName}</h2>
                                <p className="text-gray-300">{bondData.bondInfo?.description}</p>
                            </div>

                            {/* Bond stats */}
                            <div className="bg-[#111115]  p-6">
                                <h2 className="text-xl font-semibold mb-4">Bond Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Bond Type</p>
                                            <p className="text-lg">{bondData.bondType === 0 ? 'Dynamic' : 'Fixed'} Bond</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Bond Size</p>
                                            <p className="text-lg">{parseFloat(bondData.bondSize).toLocaleString()} {bondData.saleToken.symbol}</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Discount Range</p>
                                            <p className="text-lg">{(bondData.initialDiscountPercentage).toFixed()}% to {(bondData.finalDiscountPercentage).toFixed()}%</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Current Discount</p>
                                            <p className="text-lg">{(bondData.currentDiscount).toFixed(2)}%</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Sales Progress</p>
                                            <ProgressBar
                                                totalSold={parseFloat(bondData.totalSold)}
                                                bondSize={parseFloat(bondData.bondSize)}
                                            />
                                            <div className="flex justify-between mt-2 text-sm">
                                                <span>{parseFloat(bondData.totalSold).toLocaleString()} {bondData.saleToken.symbol}</span>
                                                <span>{parseFloat(bondData.bondSize).toLocaleString()} {bondData.saleToken.symbol}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Access Type</p>
                                            <p className="text-lg">{bondData.isPrivateBond ? 'Private Bond' : 'Public Bond'}</p>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-400 mb-1">Vesting Period</p>
                                            <p className="text-lg">
                                                {bondData.linearVestingEndTime && bondData.linearVestingEndTime > 0 ? (
                                                    `${differenceInDays(new Date(bondData.linearVestingEndTime * 1000), new Date(bondData.withdrawTime * 1000))} days linear vesting`
                                                ) : bondData.cliffPeriod && bondData.cliffPeriod.length > 0 ? (
                                                    'Cliff vesting'
                                                ) : (
                                                    'No vesting'
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* {stakingTiers && stakingTiers.length > 0 && (
                                    <StakingTiersList tiers={stakingTiers} />
                                )} */}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="lg:w-1/3">
                            {/* Countdown timer */}
                            <div className="bg-[#111115]  p-6 mb-6">
                                <CountdownTimer
                                    whitelistStartTime={bondData.whitelistStartTime}
                                    saleStartTime={bondData.saleStartTime}
                                    saleEndTime={bondData.saleEndTime}
                                    withdrawTime={bondData.withdrawTime}
                                />
                            </div>

                            {/* Bond action card */}
                            <div className="bg-[#111115]  overflow-hidden">
                                <div className="p-4 bg-[#171717]">
                                    <h3 className="text-xl font-semibold">Participate in Bond</h3>
                                </div>
                                <BondStage
                                    bond={bondData}
                                    userData={userData}
                                    onWhitelist={handleWhitelist}
                                    onPurchase={handlePurchase}
                                    onClaim={handleClaim}
                                    isConnected={authenticated}
                                    onConnect={login}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BondDetail; 