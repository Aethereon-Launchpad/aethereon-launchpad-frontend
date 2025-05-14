import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGiveaway } from '../../../hooks/web3/useGiveaway';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore, isAfter, format } from 'date-fns';
import {
    FaTwitter,
    FaTelegramPlane,
    FaDiscord,
    FaCopy,
    FaRocket,
    FaGift,
    FaExternalLinkAlt,
    FaGlobe,
    FaShieldAlt,
    FaUndo,
    FaCoins
} from 'react-icons/fa';
import { PresaleCountdownTimer } from '../../Countdown';
import { toast } from 'react-hot-toast';
import TxReceipt from '../../Modal/TxReceipt';
import AirdropABI from "../../../abis/Airdrop.json";
import { publicClient } from "../../../config";
import { createWalletClient, custom } from "viem";
import { useChain } from "../../../context/ChainContext";
import { usePrivy } from '@privy-io/react-auth';
import { getClaimableTokens } from '../../../utils/web3/giveaway';
import { IoWalletSharp } from "react-icons/io5";
import { useLockStake } from '../../../hooks/web3/useLockStake';
import { usePageTitleGiveaway } from '../../../hooks/utils';
import { isWhitelisted } from '../../../utils/web3/giveaway';
import { useGiveawayPeriods } from '../../../hooks/web3/useGiveawayPeriods';
import { motion, AnimatePresence } from 'framer-motion';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation, GiMoonOrbit } from 'react-icons/gi';

// The createViemWalletClient function will be defined inside the component


export default function GiveawaySelected() {
    const { publicClient } = useChain();

    // Add this function to create wallet client
    const createViemWalletClient = () => {
        return createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum)
        });
    };

    const { id } = useParams<{ id: string }>();
    const { data, error, loading, refetch } = useGiveaway(id)
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState<boolean>(true);
    const [purchasing, setPurchasing] = useState<boolean>(false)
    const [txHash, setTxHash] = useState<`0x${string}`>("0x")
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Purchase Successful");
    const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
    const { user, login, authenticated } = usePrivy();
    const { data: lockStake, error: lockStakeError, loading: lockStakeLoading } = useLockStake({ polling: true, userAddress: user?.wallet?.address as `0x${string}` })

    const [refunding, setProcessing] = useState<boolean>(false)
    const {
        isBeforeWhitelist,
        isWhitelistPeriod,
        isWithdrawDelayPeriod,
        isClaimPeriod
    } = useGiveawayPeriods(data);

    const [isUserWhitelisted, setIsUserWhitelisted] = useState<boolean>(false);

    // const [paymentMadeAmount, setPaymentMadeAmount] = useState<number>(0);
    const [claimableAmount, setClaimableAmount] = useState<number>(0);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true)



    usePageTitleGiveaway(`${data?.giveawayInfo?.projectName} Airdrop` || "Airdrop")

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    async function getInitData() {
        setLoadingInfo(true)
        if (!user?.wallet?.address) {
            // toast("Connect Wallet")
            login();
            return;
        }
        try {
            console.debug(data.id, user.wallet.address)
            const claimAmount = await getClaimableTokens(data.id as `0x${string}`, user.wallet.address as `0x${string}`)
            const isWhitelistedAddress = await isWhitelisted(data.id as `0x${string}`, user?.wallet?.address as `0x${string}`)

            setIsUserWhitelisted(isWhitelistedAddress);
            setClaimableAmount(claimAmount)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingInfo(false);
        }
    }

    useEffect(() => {
        if (!data) {
            console.log("No Data")
            return
        };

        console.log(data)

        getInitData();

    }, [authenticated, data]);


    function GiveawayStatus({ whitelistStartTime, whitelistEndTime, delay }: { whitelistStartTime: number, whitelistEndTime: number, delay: number }) {
        const whitelistStartTimeUnix = whitelistStartTime * 1000
        const whitelistEndTimeUnix = whitelistEndTime * 1000
        const delayPeriod = (Number(whitelistEndTime) + Number(delay)) * 1000


        if (isAfter(new Date(), new Date(whitelistEndTimeUnix)) && isBefore(new Date(), new Date(delayPeriod))) {
            return (
                <motion.div
                    className="bg-gradient-to-r from-yellow-600/80 to-yellow-500 px-4 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                        boxShadow: ['0 0 0px rgba(234, 179, 8, 0.3)', '0 0 10px rgba(234, 179, 8, 0.5)', '0 0 0px rgba(234, 179, 8, 0.3)']
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                    <motion.div className="flex items-center gap-2">
                        <FaUndo className="text-white" />
                        <span className="font-orbitron text-white text-sm">Claim Period</span>
                    </motion.div>
                </motion.div>
            )
        }

        if (isAfter(new Date(), new Date(whitelistEndTimeUnix))) {
            return (
                <motion.div
                    className="bg-gradient-to-r from-green-600/80 to-green-500 px-4 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                        boxShadow: ['0 0 0px rgba(34, 197, 94, 0.3)', '0 0 10px rgba(34, 197, 94, 0.5)', '0 0 0px rgba(34, 197, 94, 0.3)']
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                    <motion.div className="flex items-center gap-2">
                        <FaShieldAlt className="text-white" />
                        <span className="font-orbitron text-white text-sm">Claim Period Started</span>
                    </motion.div>
                </motion.div>
            )
        }

        if (isAfter(new Date(), new Date(whitelistStartTimeUnix)) && isBefore(new Date(), new Date(whitelistEndTimeUnix))) {
            return (
                <motion.div
                    className="bg-gradient-to-r from-green-600/80 to-green-500 px-4 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                        boxShadow: ['0 0 0px rgba(34, 197, 94, 0.3)', '0 0 10px rgba(34, 197, 94, 0.5)', '0 0 0px rgba(34, 197, 94, 0.3)']
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                    <motion.div className="flex items-center gap-2">
                        <FaRocket className="text-white" />
                        <span className="font-orbitron text-white text-sm">Whitelist in Progress</span>
                    </motion.div>
                </motion.div>
            )
        }

        if (isBefore(new Date(), new Date(whitelistStartTimeUnix))) {
            return (
                <motion.div
                    className="bg-gradient-to-r from-cosmic/80 to-cosmic px-4 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                        boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                    <motion.div className="flex items-center gap-2">
                        <FaCoins className="text-white" />
                        <span className="font-orbitron text-white text-sm">Upcoming Giveaway</span>
                    </motion.div>
                </motion.div>
            )
        }

        return null
    }

    // function PresaleProgress({ totalPaymentReceived, softCap, hardCap }: { totalPaymentReceived: number, softCap: number, hardCap: number }) {
    //     const [progress, setProgress] = useState<number>(0);
    //     const [target, setTarget] = useState<"Soft Cap" | "Hard Cap">("Soft Cap")

    //     console.log(totalPaymentReceived)

    //     useEffect(() => {
    //         if (Number(totalPaymentReceived) < Number(softCap)) {
    //             setTarget("Soft Cap");
    //             const percentage = (Number(totalPaymentReceived) / Number(softCap)) * 100;
    //             setProgress(percentage);
    //         } else {
    //             setTarget("Hard Cap");
    //             const percentage = (Number(totalPaymentReceived) / Number(hardCap)) * 100;
    //             if (percentage > 100) {
    //                 setProgress(100)
    //                 return;
    //             }
    //             setProgress(percentage);
    //         }
    //     }, [data])

    //     return (
    //         <div className="mt-[15px] flex flex-col items-start space-y-3 w-full">
    //             <p className='w-full flex items-center justify-between'>Progress ({progress.toFixed(2)}%) <span>{"--------->"}</span> <span>{target}</span> </p>
    //             <div className="h-[10px] w-full bg-white border border-primary/20">
    //                 <div style={{ width: `${progress}%` }} className="h-full bg-primary"></div>
    //             </div>
    //             <div className='flex justify-between w-full'>
    //                 <p className='text-primary text-[12px] font-semibold'>{Number(softCap).toLocaleString()} {data.paymentToken.symbol} </p>
    //                 <p className='text-primary text-[12px] font-semibold'>{Number(hardCap).toLocaleString()} {data.paymentToken.symbol} </p>
    //             </div>
    //         </div>
    //     )
    // }

    if (loading || lockStakeLoading) {
        return (
            <motion.div
                className="flex flex-col justify-center items-center h-[400px] bg-deepspace/30 border border-cosmic/20 rounded-lg p-8 relative"
                animate={{
                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
                    borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mb-6"
                >
                    <SiSolana className="text-5xl text-cosmic" />
                </motion.div>

                <motion.h3
                    className="text-xl font-orbitron text-white mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Loading Airdrop Details
                </motion.h3>

                <motion.div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-cosmic"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>

                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-skyblue/30"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 10 + 5}px`
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        >
                            <GiStarFormation />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (error.message || lockStakeError.message) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center space-y-6 p-8 text-center bg-deepspace/30 border border-red-500/30 rounded-lg relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-red-500/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-red-500/50 rounded-bl-lg"></div>

                <motion.div
                    animate={{
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-red-500 text-5xl"
                >
                    <FaRocket />
                </motion.div>

                <div className="space-y-2">
                    <motion.h3
                        className="text-2xl font-orbitron text-white"
                        animate={{ textShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.5)', '0 0 0px rgba(255, 255, 255, 0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Houston, We Have a Problem
                    </motion.h3>

                    <p className="text-white/80 font-space">
                        {error.message || lockStakeError.message || "Failed to load airdrop details. Please try again later."}
                    </p>
                </div>

                <motion.button
                    className="bg-gradient-to-r from-cosmic/80 to-cosmic px-6 py-3 rounded-md text-white font-orbitron flex items-center gap-2"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                >
                    <FaRocket className="text-white" />
                    <span>Retry Launch</span>
                </motion.button>
            </motion.div>
        )
    }

    // console.log(data)

    function copyAddress(address: `0x${string}`) {
        navigator.clipboard.writeText(address)
            .then(() => {
                toast.success('Address copied to clipboard!');
            })
            .catch((err) => {
                toast.error('Failed to copy address');
                console.error('Failed to copy address:', err);
            });
    }

    async function handleWhitelist() {
        setProcessing(true)
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();
            const { request } = await publicClient.simulateContract({
                address: data.id,
                abi: AirdropABI,
                account,
                functionName: "whitelist"
            })

            if (!isWhitelistPeriod) {
                toast("It is not yet whitelist period")
                setProcessing(false)
                return;
            }

            const hash = await walletClient.writeContract(request)
            toast("Successful Whitelist");
            setShowPaymentConfirmModal(false);

            setTxHash(hash)
            setTxReceiptTitle("Successful Whitelist")
            setTimeout(() => {
                setShowTxModal(true)
            }, 2000)

            setTimeout(async () => {
                await refetch();
            }, 5000)

        } catch (error: any) {
            console.error(error);
            if (error.message.includes("whitelist has not begun")) {
                toast("Whitelist has not begun")
                return;
            }
            if (error.message.includes("not staked")) {
                toast("Must stake in Lock & Stake to Participate")
                return;
            }
            toast.error("Whitelist Failed! Please Try Again Later")
        } finally {
            setProcessing(false)
        }
    }


    async function handleClaim() {
        setProcessing(true)
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            if (!isClaimPeriod) {
                toast("It is not yet claim period")
                setProcessing(false)
                return;
            }

            const { request } = await publicClient.simulateContract({
                address: data.id,
                abi: AirdropABI,
                account,
                functionName: "claim"
            })

            const hash = await walletClient.writeContract(request)
            toast("Successful Claim");
            setShowPaymentConfirmModal(false);

            setTxHash(hash)
            setTxReceiptTitle("Successful Claim")
            setTimeout(() => {
                setShowTxModal(true)
            }, 2000)

            setTimeout(async () => {
                await refetch();
            }, 5000)

        } catch (error: any) {
            console.log(error.message)
            if (error.message.includes("no claimable tokens")) {
                toast("No Claimable Tokens")
                return;
            }
            if (error.message.includes("already withdrawn")) {
                toast("Already Withdrawn")
                return;
            }
            if (error.message.includes("not whitelisted")) {
                toast("Not Whitelisted")
                return;
            }
            if (error.message.includes("no tokens available to claim")) {
                toast("No Tokens Available to Claim")
                return;
            }
            toast('Claim Failed, please try again later')
        } finally {
            setProcessing(false)
        }
    }

    function returnMultiplier(amount: number) {
        let multiplier = "1x";

        if (amount >= 50000) {
            multiplier = "3.5x";
        } else if (amount >= 15000) {
            multiplier = "3x";
        } else if (amount >= 10000) {
            multiplier = "2.5x";
        } else if (amount >= 5000) {
            multiplier = "2x";
        } else if (amount >= 1000) {
            multiplier = "1.5x";
        }

        return multiplier;
    }

    function getBadgeInfo(amount: number) {
        if (amount >= 50000) {
            return { name: "Obsidian Vanguard", image: "./obs.svg" };
        } else if (amount >= 15000) {
            return { name: "Titanium Pioneer", image: "./titan.svg" };
        } else if (amount >= 10000) {
            return { name: "Steel Forgemaster", image: "./steel.svg" };
        } else if (amount >= 5000) {
            return { name: "Iron Miner", image: "./iron.svg" };
        } else if (amount >= 1000) {
            return { name: "Copper Miner", image: "./pickaxe.svg" };
        }
        return { name: "No Badge", image: "" };
    }

    const badgeInfo = getBadgeInfo(lockStake?.userData?.amountStaked || 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 p-[40px_20px] lg:p-[40px] text-white mobile-order">
            {/* Right Column - will appear first on mobile */}
            <motion.div
                className="relative p-8 overflow-hidden h-fit order-first lg:order-last bg-deepspace/30 border border-cosmic/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <div className="relative space-y-6">
                    {/* Presale Status */}
                    <div className="flex items-center justify-between">
                        <GiveawayStatus
                            whitelistStartTime={data.whitelistStartTime}
                            whitelistEndTime={data.whitelistEndTime}
                            delay={Number(data.withdrawDelay)}
                        />
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex justify-between items-center flex-wrap">
                        <div className="flex flex-col gap-1">
                            {isBeforeWhitelist ? (
                                <>
                                    <span className='text-skyblue font-space text-sm'>Whitelist starts in</span>
                                    <PresaleCountdownTimer time={data.whitelistStartTime} />
                                </>
                            ) : isClaimPeriod ? (
                                <>
                                    <span className='text-skyblue font-space text-sm'>Claim Period Starts</span>
                                    <PresaleCountdownTimer time={Number(data.whitelistEndTime) + Number(data.withdrawDelay)} />
                                </>
                            ) : (
                                <>
                                    <span className='text-skyblue font-space text-sm'>Whitelist ends in</span>
                                    <PresaleCountdownTimer time={data.whitelistEndTime} />
                                </>
                            )}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            <img
                                src={data?.giveawayInfo?.images?.logo}
                                className="h-[50px] w-full object-contain"
                                alt={data?.giveawayInfo?.projectName}
                            />
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        className="bg-deepspace/50 p-4 rounded-lg border border-cosmic/20 space-y-3"
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                    >
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-400 font-space">Badge</p>
                                <p className="text-white font-orbitron">{badgeInfo.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-400 font-space">Multiplier</p>
                                <p className="text-white font-orbitron">{returnMultiplier(lockStake?.userData?.amountStaked)}</p>
                            </div>
                            <div className="space-y-1 col-span-2">
                                <p className="text-gray-400 font-space">Claimable</p>
                                <p className="text-white font-orbitron">{claimableAmount} {data.airdropToken.symbol}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    {authenticated ? (
                        <>
                            {isClaimPeriod && (
                                <motion.button
                                    className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                    whileHover={{
                                        boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                                        y: -1
                                    }}
                                    whileTap={{ y: 1 }}
                                    onClick={handleClaim}
                                    disabled={claimableAmount === 0}
                                >
                                    {refunding ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <FaCoins className="text-white" />
                                        </motion.div>
                                    ) : (
                                        <FaCoins className="text-white" />
                                    )}
                                    <span>
                                        {claimableAmount === 0
                                            ? "You have no tokens to claim"
                                            : `Claim Tokens ${Number(claimableAmount).toLocaleString()} ${data.airdropToken.symbol}`
                                        }
                                    </span>
                                </motion.button>
                            )}

                            {
                                isWhitelistPeriod && !isUserWhitelisted && (
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                        whileHover={{
                                            boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                                            y: -1
                                        }}
                                        whileTap={{ y: 1 }}
                                        onClick={handleWhitelist}
                                        disabled={refunding}
                                    >
                                        {refunding ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <FaRocket className="text-white" />
                                            </motion.div>
                                        ) : (
                                            <FaRocket className="text-white" />
                                        )}
                                        <span>Whitelist</span>
                                    </motion.button>
                                ) ||
                                isWhitelistPeriod && isUserWhitelisted && (
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-green-600/80 to-green-500 h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                        whileHover={{
                                            boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
                                            y: -1
                                        }}
                                        disabled={true}
                                    >
                                        <FaShieldAlt className="text-white" />
                                        <span>Whitelisted</span>
                                    </motion.button>
                                )
                            }
                            {
                                isBeforeWhitelist && (
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                        whileHover={{
                                            boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                                            y: -1
                                        }}
                                        whileTap={{ y: 1 }}
                                        onClick={() => toast("Whitelist is upcoming")}
                                    >
                                        <FaCoins className="text-white" />
                                        <span>Whitelist Upcoming</span>
                                    </motion.button>
                                )
                            }
                        </>
                    ) : (
                        <motion.button
                            className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                            whileHover={{
                                boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                                y: -1
                            }}
                            whileTap={{ y: 1 }}
                            onClick={login}
                        >
                            <IoWalletSharp className="text-white" />
                            <span>Connect Wallet</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* Left Column - will appear second on mobile */}
            <motion.div
                className="space-y-8 order-last lg:order-first"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Project Details */}
                <motion.div
                    className="bg-deepspace/30 border border-cosmic/20 rounded-lg p-8 space-y-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                >
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                    <div className="relative space-y-6">
                        <div>
                            <motion.h1
                                className="text-4xl font-bold font-orbitron"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {data?.giveawayInfo?.projectName}
                            </motion.h1>
                            <motion.p
                                className="text-skyblue text-lg font-space mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                Participate in the Future
                            </motion.p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <motion.div
                                className='bg-deepspace/50 p-6 rounded-lg border border-cosmic/20'
                                whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FaGift className="text-cosmic" />
                                    <h3 className='text-xl font-semibold text-white font-orbitron'>Airdrop Details</h3>
                                </div>
                                <ul className='space-y-3'>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Whitelist Start Date</span>
                                        <span className='font-medium text-white font-orbitron'>{format(new Date(data.whitelistStartTime * 1000), 'dd MMM yyyy HH:mm')}</span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Whitelist End Date</span>
                                        <span className='font-medium text-white font-orbitron'>{format(new Date(data.whitelistEndTime * 1000), 'dd MMM yyyy HH:mm')}</span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Total Reward</span>
                                        <span className='font-medium text-white font-orbitron'>{data.giveawayInfo?.totalReward.toLocaleString()} {data.airdropToken.symbol}</span>
                                    </li>
                                    <li className='flex justify-between items-center'>
                                        <span className='text-skyblue font-space'>Giveaway Access</span>
                                        <span className='font-medium text-white font-orbitron'>
                                            {data.isPrivateAirdrop ? "Private" : "Public"}
                                        </span>
                                    </li>
                                    <li className='flex justify-between items-center'>
                                        <span className='text-skyblue font-space text-nowrap'>Mainnet Contract</span>
                                        <div className="flex items-center gap-2">
                                            <span className='font-medium text-white font-orbitron'>{`${data.airdropToken.id.slice(0, 5)}...${data.airdropToken.id.slice(-6)}`}</span>
                                            <motion.button
                                                onClick={() => copyAddress(data.airdropToken.id)}
                                                className="text-cosmic hover:text-cosmic/80 transition-all"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaCopy className="w-4 h-4" />
                                            </motion.button>
                                            <motion.a
                                                href={`https://solscan.io/token/${data.airdropToken.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cosmic hover:text-cosmic/80 transition-all"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaExternalLinkAlt className="w-4 h-4" />
                                            </motion.a>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* About Section */}
                <motion.div
                    className="bg-deepspace/30 border border-cosmic/20 rounded-lg p-8 space-y-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                >
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                    <div className="flex items-center gap-3 mb-4">
                        <FaRocket className="text-xl text-cosmic" />
                        <h2 className="text-2xl font-semibold font-orbitron text-white">About {data?.giveawayInfo?.projectName}</h2>
                    </div>

                    <div className="text-white/90 font-space">
                        <p className="mb-4">{data?.giveawayInfo?.description}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-cosmic/20">
                        <h3 className="text-skyblue font-orbitron mb-2">Terms & Conditions</h3>
                        <p className="text-white/90 font-space">Airdrop tokens are subject to project's determined allocation's vesting schedule also specified in the Airdrop page of the project.</p>

                        <p className="text-white/90 font-space mt-2">
                            {data.isPrivateAirdrop ?
                                "This is a private airdrop. Only whitelisted addresses can participate." :
                                "This is a public airdrop. All addresses can participate."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-cosmic/20">
                        <div className="space-y-2">
                            <h3 className="text-skyblue font-orbitron">Website</h3>
                            <motion.a
                                className="text-cosmic flex items-center gap-2"
                                href={data?.giveawayInfo?.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3 }}
                            >
                                <span>{data?.giveawayInfo?.website}</span>
                                <FaExternalLinkAlt className="text-xs" />
                            </motion.a>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-skyblue font-orbitron">Documents</h3>
                            <motion.a
                                className="text-cosmic flex items-center gap-2"
                                href={data?.giveawayInfo?.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3 }}
                            >
                                <span>Whitepaper</span>
                                <FaExternalLinkAlt className="text-xs" />
                            </motion.a>
                        </div>

                        <div className="flex justify-center items-center">
                            <motion.img
                                src={data?.giveawayInfo?.images?.logo}
                                className="h-[50px] object-contain"
                                alt={data?.giveawayInfo?.projectName}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-cosmic/20">
                        <h3 className="text-skyblue font-orbitron mb-4">Social Media</h3>
                        <div className="flex space-x-6">
                            {data?.giveawayInfo?.socials?.twitter && (
                                <motion.a
                                    href={data.giveawayInfo.socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cosmic hover:text-cosmic/80 transition-all"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTwitter className="w-6 h-6" />
                                </motion.a>
                            )}
                            {data?.giveawayInfo?.socials?.telegram && (
                                <motion.a
                                    href={data.giveawayInfo.socials.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cosmic hover:text-cosmic/80 transition-all"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTelegramPlane className="w-6 h-6" />
                                </motion.a>
                            )}
                            {data?.giveawayInfo?.socials?.discord && (
                                <motion.a
                                    href={data.giveawayInfo.socials.discord}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cosmic hover:text-cosmic/80 transition-all"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaDiscord className="w-6 h-6" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                <TxReceipt
                    visible={showTxModal}
                    onClose={() => setShowTxModal(false)}
                    title={txReceiptTitle}
                    txHash={txHash}
                />
            </AnimatePresence>
        </div>
    );
}
