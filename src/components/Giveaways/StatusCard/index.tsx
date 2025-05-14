import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { FaDiscord, FaGlobe, FaTelegram, FaTwitter, FaGift, FaRocket, FaExternalLinkAlt } from "react-icons/fa";
import { differenceInDays, differenceInHours, differenceInMinutes, isBefore } from 'date-fns';
import CurrentChain from "../../Presale/CurrentChain";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { SiSolana } from "react-icons/si";
import { GiStarFormation } from "react-icons/gi";


function CountdownTimer({ time, endTime, delayTime }: { time: string, endTime: string, delayTime: number }) {
    const calculateTimeLeft = () => {
        // Convert time to milliseconds (assuming it's in seconds)
        const startTime = parseInt(time) * 1000;
        const currentTime = Date.now();

        // Ensure startTime is in the future
        if (startTime <= currentTime) {
            return { days: 0, hours: 0, minutes: 0 };
        }

        // Calculate differences using date-fns
        const days = differenceInDays(startTime, currentTime);
        const hours = differenceInHours(startTime, currentTime) % 24;
        const minutes = differenceInMinutes(startTime, currentTime) % 60;

        return { days, hours, minutes };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    const startTimeUnix = parseInt(time) * 1000;
    const endTimeUnix = parseInt(endTime) * 1000;
    const currentTime = Date.now();

    if (isBefore(new Date(startTimeUnix), new Date()) && isBefore(new Date(endTimeUnix), new Date())) {
        return (
            <motion.div
                className="flex items-center gap-2 text-white font-orbitron"
                animate={{ color: ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.7)'] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <FaGift className="text-cosmic" />
                <span>Giveaway Completed</span>
            </motion.div>
        );
    }

    // Check if giveaway is in progress
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
        return (
            <motion.div
                className="flex items-center gap-2 text-white font-orbitron"
                animate={{ color: ['rgba(108, 92, 231, 0.7)', 'rgba(108, 92, 231, 1)', 'rgba(108, 92, 231, 0.7)'] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <FaRocket className="text-cosmic" />
                <span>Giveaway in Progress</span>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="flex items-center gap-2 text-white font-orbitron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <SiSolana className="text-cosmic animate-pulse" />
            <div className="flex gap-1">
                <motion.span
                    className="bg-deepspace/50 px-2 py-1 rounded-md border border-cosmic/20"
                    whileHover={{ scale: 1.05 }}
                >
                    {timeLeft.days}D
                </motion.span>
                <motion.span
                    className="bg-deepspace/50 px-2 py-1 rounded-md border border-cosmic/20"
                    whileHover={{ scale: 1.05 }}
                >
                    {timeLeft.hours}H
                </motion.span>
                <motion.span
                    className="bg-deepspace/50 px-2 py-1 rounded-md border border-cosmic/20"
                    whileHover={{ scale: 1.05 }}
                >
                    {timeLeft.minutes}M
                </motion.span>
            </div>
        </motion.div>
    );
}


function GiveawayCardCompleted({ giveaway }: any) {
    const navigate = useNavigate();
    const [currentChain, setCurrentChain] = useState<string>("57054")
    const { wallets } = useWallets();
    const { authenticated } = usePrivy();
    const location = useLocation();

    useEffect(() => {
        if (authenticated) {
            if (wallets.length !== 0) {
                const wallet = wallets[0];
                const info = wallet.chainId;
                const id = info.split(":")[1];
                setCurrentChain(id);
            }
        }
    }, [authenticated, wallets]);


    if (!giveaway) {
        return (
            <motion.div
                className="overflow-hidden relative bg-deepspace/30 border border-cosmic/20 h-[400px] flex items-center justify-center"
                animate={{
                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
                    borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="relative"
                >
                    <FaGift className="text-4xl text-cosmic" />
                    <motion.div
                        className="absolute -top-1 -right-1 text-xs text-skyblue"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <GiStarFormation />
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="overflow-hidden relative bg-deepspace/30 border-t border-l border-r border-cosmic/20"
            whileHover={{
                scale: 1.02,
                boxShadow: "0 0 25px rgba(108, 92, 231, 0.4)",
                borderColor: "rgba(108, 92, 231, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => navigate(location.pathname.includes("dashboard") ?
                `/admin/dashboard/giveaways/manage/${giveaway?.giveawayInfo?.projectName.toLowerCase()}` :
                `/deals/giveaways/${giveaway?.giveawayInfo?.projectName.toLowerCase()}`
            )}
        >
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

            {/* Background image with overlay */}
            <div className="h-[150px] w-full relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-cosmic/20 to-deepspace/80 z-10"
                    whileHover={{ opacity: 0.7 }}
                ></motion.div>

                <motion.img
                    src={giveaway?.giveawayInfo?.images?.bg}
                    className="h-full w-full object-cover"
                    alt={giveaway?.giveawayInfo?.projectName}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                />

                <motion.div
                    className="absolute top-0 right-0 bg-cosmic/80 px-4 py-1 text-white z-20 clip-path-polygon"
                    whileHover={{ backgroundColor: "rgba(108, 92, 231, 1)" }}
                >
                    <motion.span
                        animate={{ textShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.5)', '0 0 0px rgba(255, 255, 255, 0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="font-orbitron text-sm"
                    >
                        {giveaway.isPrivateAirdrop ? "Private Airdrop" : "Public Airdrop"}
                    </motion.span>
                </motion.div>
            </div>

            {/* Project logo with animation */}
            <div className="relative">
                <motion.div
                    className="h-[80px] w-[80px] absolute -top-10 left-4 z-20 border-cosmic border-[3px] bg-deepspace/90 p-2 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 1)" }}
                    animate={{
                        boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                    <img src={giveaway?.giveawayInfo?.images?.logo} className="h-full w-full object-contain" alt="" />

                    {/* Orbiting element */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "center center" }}
                    >
                        <motion.div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 bg-cosmic/10 p-1 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <SiSolana className="text-xs text-cosmic" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Chain indicator */}
                <div className="flex justify-end">
                    <motion.div
                        className="bg-cosmic/80 clip-path-polygon px-3 py-1"
                        whileHover={{ scale: 1.05 }}
                    >
                        <CurrentChain chainId={currentChain} />
                    </motion.div>
                </div>
            </div>

            <div className="p-5 mt-4">
                {/* Project name */}
                <motion.h3
                    className="text-2xl font-bold text-white font-orbitron mb-2 text-center"
                    whileHover={{ textShadow: "0 0 8px rgba(108, 92, 231, 0.8)" }}
                >
                    {giveaway?.giveawayInfo?.projectName || "Unknown Project"}
                </motion.h3>

                <motion.p
                    className="text-white/80 text-center font-space text-sm mb-4"
                    whileHover={{ opacity: 1 }}
                >
                    {giveaway?.giveawayInfo.description || "Unknown Project"}
                </motion.p>

                {/* Giveaway details */}
                <motion.div
                    className="bg-deepspace/50 p-4 rounded-lg border border-cosmic/20 space-y-3"
                    whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                >
                    <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-skyblue font-space">Total Reward</span>
                            <span className="text-white font-orbitron">
                                {giveaway?.giveawayInfo?.totalReward.toLocaleString()} {giveaway.saleToken?.symbol}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-skyblue font-space">Vesting Duration</span>
                            <span className="text-white font-orbitron">
                                {giveaway.linearVestingEndTime && giveaway.linearVestingEndTime > 0 ? (
                                    differenceInDays(new Date(giveaway.linearVestingEndTime * 1000), new Date(giveaway.startTime * 1000))
                                ) : (
                                    0
                                )} days
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-skyblue font-space">Status</span>
                            <CountdownTimer
                                time={giveaway.whitelistStartTime}
                                endTime={giveaway.whitelistEndTime}
                                delayTime={Number(giveaway.whitelistStartTime) + Number(giveaway.withdrawDelay)}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Social links */}
                <div className="flex justify-center gap-4 mt-4">
                    {giveaway?.giveawayInfo.website && (
                        <motion.a
                            href={giveaway?.giveawayInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cosmic hover:text-cosmic/80 transition-all"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaGlobe className="w-5 h-5" />
                        </motion.a>
                    )}

                    {giveaway?.giveawayInfo.socials?.twitter && (
                        <motion.a
                            href={giveaway?.giveawayInfo.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cosmic hover:text-cosmic/80 transition-all"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTwitter className="w-5 h-5" />
                        </motion.a>
                    )}

                    {giveaway?.giveawayInfo.socials?.telegram && (
                        <motion.a
                            href={giveaway?.giveawayInfo.socials.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cosmic hover:text-cosmic/80 transition-all"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTelegram className="w-5 h-5" />
                        </motion.a>
                    )}

                    {giveaway?.giveawayInfo.socials?.discord && (
                        <motion.a
                            href={giveaway?.giveawayInfo.socials.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cosmic hover:text-cosmic/80 transition-all"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaDiscord className="w-5 h-5" />
                        </motion.a>
                    )}
                </div>
            </div>

            {/* View button */}
            <motion.button
                className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white border-t border-cosmic/30"
                whileHover={{
                    boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                    y: -1
                }}
                whileTap={{ y: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
                <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FaGift className="text-white" />
                </motion.div>
                <span>View Airdrop</span>
            </motion.button>
        </motion.div>
    );
}

export default GiveawayCardCompleted;
