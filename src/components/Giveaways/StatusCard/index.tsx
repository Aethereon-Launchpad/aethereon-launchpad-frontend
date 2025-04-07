import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { FaDiscord, FaGlobe, FaTelegram, FaTwitter } from "react-icons/fa6";
import { differenceInDays, differenceInHours, differenceInMinutes, isBefore } from 'date-fns';
import CurrentChain from "../../Presale/CurrentChain";


function CountdownTimer({ time, endTime, delayTime }: { time: string, endTime: string, delayTime: number }) {
    const calculateTimeLeft = () => {
        // Convert time to milliseconds (assuming it's in seconds)
        const startTime = parseInt(time) * 1000;
        const now = Date.now();

        // Ensure startTime is in the future
        if (startTime <= now) {
            // console.error('End time is in the past:', {
            //   startTime: new Date(startTime).toISOString(),
            //   now: new Date(now).toISOString()
            // });
            // console.error('End time is in the past:', {
            //   startTime: new Date(startTime).toISOString(),
            //   now: new Date(now).toISOString()
            // });
            return { days: 0, hours: 0, minutes: 0 };
        }

        // Calculate differences using date-fns
        const days = differenceInDays(startTime, now);
        const hours = differenceInHours(startTime, now) % 24;
        const minutes = differenceInMinutes(startTime, now) % 60;

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
    const delayTimeUnix = delayTime * 1000;
    const now = Date.now();

    if (isBefore(new Date(startTimeUnix), new Date()) && isBefore(new Date(endTimeUnix), new Date())) {
        return <p className='text-white'>Giveaway is Over</p>
    }

    // Check if voting is in progress
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
        return <p className='text-white'>Giveaway in Progress</p>;
    }

    return (
        <p className='text-white'>
            {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
        </p>
    );
}


function GiveawayCardCompleted({ giveaway }: any) {
    const navigate = useNavigate();
    const [currentChain, setCurrentChain] = useState<string>("57054")
    const { wallets } = useWallets();
    const { authenticated } = usePrivy();

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
            <div className="flex justify-center items-center h-[giveaway200px]">
                <Preloader
                    use={ThreeDots}
                    size={60}
                    strokeWidth={6}
                    strokeColor="#5325A9"
                    duration={2000}
                />
            </div>
        );
    }

    const totalRaised = parseFloat(giveaway.totalPaymentReceived || "0");
    const hardCap = parseFloat(giveaway.hardCap || "0");
    const progress = (totalRaised / hardCap) * 100;

    return (
        <div className="overflow-hidden relative bg-[#111115] border border-primary/20 transition-all hover:scale-[1.01] duration-300 hover:cursor-pointer shadow-[0_0_15px_2px_rgba(83,37,169,0.3)] hover:shadow-[0_0_25px_5px_rgba(83,37,169,0.5)]"
            onClick={() => navigate(`/giveaways/${giveaway?.giveawayInfo?.projectName.toLowerCase()}`)}
        >
            <div className="h-[150px] w-full border-b relative">
                <img
                    src={giveaway?.giveawayInfo?.images?.bg}
                    className="h-full w-full object-cover"
                    alt={giveaway?.giveawayInfo?.projectName}
                />
                <div className="absolute top-0 right-0 bg-[#291254] px-4 py-1 text-white">
                    {giveaway.isPrivateAirdrop ? "Private Airdrop" : "Public Airdrop"}
                </div>
            </div>

            {/* <div className="absolute top-[8.8rem] w-[80px] left-0 h-[25px] bg-[#291254] z-0" /> */}
            <div className="h-[80px] w-[80px] absolute top-[110px] left-[20px] z-20 border-[#291254] border-[7px] bg-black p-3">
                <img src={giveaway?.giveawayInfo?.images?.logo} className="h-full w-full object-contain" alt="" />
            </div>

            <div className="w-full">
                <div className="text-white w-full items-center flex justify-end">
                    <div className="bg-[#291254] uppercase p-2">
                        <CurrentChain chainId={currentChain} />
                    </div>
                </div>

                <div className="p-[20px] mt-[10px] text-[#FAFAFA]">
                    <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-[28px] font-[500]">
                            {giveaway?.giveawayInfo?.projectName || "Unknown Project"}
                        </p>
                        <p>
                            {giveaway?.giveawayInfo.description || "Unknown Project"}
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        {/* Sale Details */}
                        <div className="grid gap-y-1.5 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#ACBBCC]">Total Reward</span>
                                <span className="text-white">
                                    {giveaway?.giveawayInfo?.totalReward.toLocaleString()} {giveaway.saleToken?.symbol}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#ACBBCC]">Vesting Duration</span>
                                <span className="text-white">
                                    {giveaway.linearVestingEndTime && giveaway.linearVestingEndTime > 0 ? (
                                        differenceInDays(new Date(giveaway.linearVestingEndTime * 1000), new Date(giveaway.startTime * 1000))
                                    ) : (
                                        0
                                    )} days
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#ACBBCC]">Status</span>
                                <CountdownTimer
                                    time={giveaway.whitelistStartTime}
                                    endTime={giveaway.whitelistEndTime}
                                    delayTime={Number(giveaway.whitelistStartTime) + Number(giveaway.withdrawDelay)}
                                />
                            </div>

                            <div className="flex justify-center gap-x-3">
                                <Link to={giveaway?.giveawayInfo.website}>
                                    <FaGlobe size={20} />
                                </Link>
                                <Link to={giveaway?.giveawayInfo.socials.twitter}>
                                    <FaTwitter size={20} />
                                </Link>
                                <Link to={giveaway?.giveawayInfo.socials.telegram}>
                                    <FaTelegram size={20} />
                                </Link>
                                <Link to={giveaway?.giveawayInfo.socials.discord}>
                                    <FaDiscord size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GiveawayCardCompleted;
