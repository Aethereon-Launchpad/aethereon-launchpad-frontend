import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { FaDiscord, FaGlobe, FaTelegram, FaTwitter } from "react-icons/fa6";
import { differenceInDays, differenceInHours, differenceInMinutes, isBefore } from 'date-fns';

function CurrentChain({ chainId }: { chainId: string }) {
    switch (chainId) {
        case "57054":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    {/* Icon from Web3 Icons by 0xa3k5 - https://github.com/0xa3k5/web3icons/blob/main/LICENCE */}
                    <path fill="#FFFFFF" d="m13.836 14.183l.002-.002l-.004.003zm-.002.001c-3.4 1.02-6.213 2.509-7.975 4.252l-.078.078c.469.443.982.84 1.538 1.176l.119-.146a22.5 22.5 0 0 1 6.396-5.36m.393-1.513H3a8.93 8.93 0 0 0 1.874 4.846l.048-.049c1.091-1.075 2.51-2.052 4.223-2.903c1.501-.747 3.224-1.388 5.082-1.894M9.923 5.192A20.9 20.9 0 0 0 21 10.985C20.492 6.493 16.666 3 12.016 3a9.1 9.1 0 0 0-3.467.686c.433.522.897 1.03 1.374 1.507zm-4.064.371c1.762 1.746 4.576 3.233 7.977 4.256A22.7 22.7 0 0 1 8.97 6.144c-.535-.532-1.05-1.1-1.534-1.688l-.119-.146a9 9 0 0 0-1.535 1.175zm4.064 13.244c-.48.477-.942.985-1.374 1.507a9.1 9.1 0 0 0 3.467.686c4.65 0 8.476-3.494 8.984-7.987a20.9 20.9 0 0 0-11.075 5.793zm-.78-9.375v.002c-1.711-.852-3.13-1.83-4.22-2.903l-.05-.048A8.93 8.93 0 0 0 3 11.328h11.225c-1.857-.506-3.579-1.147-5.082-1.896" />
                </svg>
            )
    }
}

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


function GiveawayCardCompleted({ presale }: any) {
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


    if (!presale) {
        return (
            <div className="flex justify-center items-center h-[200px]">
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

    const totalRaised = parseFloat(presale.totalPaymentReceived || "0");
    const hardCap = parseFloat(presale.hardCap || "0");
    const progress = (totalRaised / hardCap) * 100;

    return (
        <div className="overflow-hidden relative bg-[#111115] border border-primary/20 transition-all hover:scale-[1.01] duration-300 hover:cursor-pointer shadow-[0_0_15px_2px_rgba(83,37,169,0.3)] hover:shadow-[0_0_25px_5px_rgba(83,37,169,0.5)]"
            onClick={() => navigate(`/giveaways/${presale.id}`)}
        >
            <div className="h-[150px] w-full border-b relative">
                <img
                    src={presale?.presaleInfo?.images?.bg}
                    className="h-full w-full object-cover"
                    alt={presale?.presaleInfo?.projectName}
                />
                <div className="absolute top-0 right-0 bg-[#291254] px-4 py-1 text-white">
                    {presale.isPrivateSale ? "Standard IDO" : "Giveaway"}
                </div>
            </div>

            {/* <div className="absolute top-[8.8rem] w-[80px] left-0 h-[25px] bg-[#291254] z-0" /> */}
            <div className="h-[80px] w-[80px] absolute top-[110px] left-[20px] z-20 border-[#291254] border-[7px] bg-black p-3">
                <img src={presale?.presaleInfo?.images?.logo} className="h-full w-full object-contain" alt="" />
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
                            {presale?.presaleInfo?.projectName || "Unknown Project"}
                        </p>
                        <p>
                            {presale?.presaleInfo.description || "Unknown Project"}
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        {/* Sale Details */}
                        <div className="grid gap-y-1.5 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#ACBBCC]">Total Reward</span>
                                <span className="text-white">
                                    {presale?.presaleInfo?.totalReward.toLocaleString()} {presale.saleToken?.symbol}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#ACBBCC]">Vesting Duration</span>
                                <span className="text-white">
                                    {presale.linearVestingEndTime && presale.linearVestingEndTime > 0 ? (
                                        differenceInDays(new Date(presale.linearVestingEndTime * 1000), new Date(presale.startTime * 1000))
                                    ) : (
                                        0
                                    )} days
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#ACBBCC]">Status</span>
                                <CountdownTimer
                                    time={presale.startTime}
                                    endTime={presale.endTime}
                                    delayTime={Number(presale.endTime) + Number(presale.withdrawDelay)}
                                />
                            </div>

                            <div className="flex justify-center gap-x-3">
                                <Link to={presale?.presaleInfo.website}>
                                    <FaGlobe size={20} />
                                </Link>
                                <Link to={presale?.presaleInfo.socials.twitter}>
                                    <FaTwitter size={20} />
                                </Link>
                                <Link to={presale?.presaleInfo.socials.telegram}>
                                    <FaTelegram size={20} />
                                </Link>
                                <Link to={presale?.presaleInfo.socials.discord}>
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
