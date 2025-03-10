import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { usePresale } from '../../hooks/web3/usePresale';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { differenceInDays, differenceInMinutes, differenceInHours, isBefore } from 'date-fns';
import { FaTwitter, FaTelegramPlane, FaDiscord, FaCopy } from "react-icons/fa";
import { PresaleCountdownTimer } from '../Countdown';
import { toast } from 'react-hot-toast';

function IdoComponent() {
    const { id } = useParams<{ id: `0x${string}` }>();
    const { data, error, loading, refetch } = usePresale(id)
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState<boolean>(true);

    function PresaleStatus({ startTime, endTime }: { startTime: number, endTime: number }) {
        const startTimeUnix = startTime * 1000
        const endTimeUnix = endTime * 1000

        const calculateTimeLeft = () => {
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
            const days = differenceInDays(startTimeUnix, now);
            const hours = differenceInHours(startTimeUnix, now) % 24;
            const minutes = differenceInMinutes(startTimeUnix, now) % 60;

            return { days, hours, minutes };
        };


        if (isBefore(new Date(startTimeUnix), new Date()) && isBefore(new Date(endTimeUnix), new Date())) {
            return (
                <div className="bg-red-700/80 p-[3px_8px] w-fit text-[12px] rounded-[5px]">
                    <p className='text-red-300'>Sale is Over</p>
                </div>)
        }

        const { days, hours, minutes } = calculateTimeLeft();

        // Check if voting is in progress
        if (days === 0 && hours === 0 && minutes === 0) {
            return (
                <div className="bg-green-700/80 p-[3px_8px] w-fit text-[12px] rounded-[5px]">
                    <p className='text-green-300'>Sale in Progress</p>
                </div>);
        }
    }

    function PresaleProgress({ totalPaymentReceived, softCap, hardCap }: { totalPaymentReceived: number, softCap: number, hardCap: number }) {
        const [progress, setProgress] = useState<number>(0);
        const [target, setTarget] = useState<"Soft Cap" | "Hard Cap">("Soft Cap")

        useEffect(() => {
            if (Number(totalPaymentReceived) < Number(softCap)) {
                setTarget("Soft Cap");
                const percentage = ((Number(totalPaymentReceived) - Number(totalPaymentReceived)) / Number(softCap)) * 100
                setProgress(percentage)
            } else {
                setTarget("Hard Cap");
                const percentage = ((Number(totalPaymentReceived) - Number(totalPaymentReceived)) / Number(hardCap)) * 100
                setProgress(percentage)
            }

        }, [])

        return (
            <div className="mt-[15px] flex flex-col items-start space-y-[3px] w-[80%]">
                <p>Progress ({progress}%) {"---->"} {target} </p>
                <div className="h-[10px] w-full rounded-full bg-white">
                    <div style={{ width: `${progress}%` }} className="h-full bg-primary rounded-full"></div>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-primary text-[12px] font-semibold'>{Number(softCap).toFixed(0)} {data.saleToken.symbol} </p>
                    <p className='text-primary text-[12px] font-semibold'>{Number(hardCap).toFixed(0)} {data.saleToken.symbol} </p>
                </div>
            </div>
        )
    }

    if (loading) {
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

    if (error.message) {
        return (
            <div className="flex items-center justify-center">
                <h3 className="text-red-600 text-xl">{error.message}</h3>
            </div>
        )
    }

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

    return (
        <div className='p-[40px_20px] flex flex-col-reverse gap-[40px] lg:flex-row items-start lg:p-[40px] font-grotesk text-white space-y-5'>
            <div className='w-full lg:w-[60%] p-[10px]'>
                <div className=''>
                    <p className='text-[50px] uppercase font-semibold tracking-wider'>{data?.presaleInfo?.projectName}</p>
                    <p className='text-primary text-[18px] uppercase font-normal tracking-[3px]'>Participate!</p>

                    <div>
                        <ul>
                            <li><span className="font-semibold">IDO Type</span> : Refundable during sale</li>
                            <li><span className="font-semibold">Sale Period</span> : {differenceInDays(new Date(data.endTime * 1000), new Date(data.startTime * 1000))} {differenceInDays(new Date(data.endTime * 1000), new Date(data.startTime * 1000)) === 1 ? "day" : "days"}</li>
                            <li><span className="font-semibold">Ticker</span> : {data.saleToken.symbol}</li>
                            <li><span className="font-semibold" title='Using CORAL for test purposes'>Token Price</span> : ${data.salePrice} {data.paymentToken.symbol}</li>
                            <li><span className="font-semibold">Soft Cap</span> : {Number(data.softCap).toFixed(0)} {data.saleToken.symbol}</li>
                            <li><span className="font-semibold">Hard Cap</span> : {Number(data.hardCap).toFixed(0)} {data.saleToken.symbol}</li>
                            <li><span className='font-semibold'>Min Payment</span> : {Number(data.minTotalPayment).toFixed(0)}</li>
                            <li><span className='font-semibold'>Max Payment</span> : {Number(data.maxTotalPayment).toFixed(0)}</li>
                            <li><span className='font-semibold'>Mainnet Contract</span> : <span className="underline flex gap-x-3 items-center hover:cursor-pointer hover:text-primary" onClick={() => copyAddress(data.saleToken.id)}> {data.saleToken.id} <FaCopy size={15} /></span> </li>
                        </ul>
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='text-primary text-[18px] uppercase font-normal tracking-[3px]'>About {data?.presaleInfo?.projectName}</p>

                    <div className='text-[15px] lg:text-[18px] mt-[20px]'>
                        <p>{data?.presaleInfo?.description}</p>
                        <ul className='list-disc px-[20px] mt-[10px]'>
                            <li>⚡  Grant received from Aethir ($3B FDV) for computing power to support our AI infrastructure and ecosystem.</li>
                            <li> ⚡️ Available on the Google Play Store with a 5.0 rating from over 5,000 reviews. The Apple Store and Chrome extensions are under review and are expected to go live this week. The app has been trending for over 2 weeks now in most European countries in the Finance category.</li>
                            <li>⚡️ Revenue Model: Derhex receives payments from clients in USDT, ensuring a deflationary model. Revenue distribution: 33% is allocated to users, 33% goes to the foundation, 33% is used to buy back and burn $Derhex tokens, creating a deflationary effect.</li>
                        </ul>



                        <p className='mt-[20px]'> Product</p>
                        <p> Derhex Ecosystem</p>
                        <p>Modular Data Network</p>
                        <p> A revolutionary network transforming billions of devices into a decentralized powerhouse for AI. It empowers data providers to own, control, and monetize their data, delivering quadrillions of reliable and sourced data points to fuel AI advancements.</p>
                        <ul className='list-disc px-[20px]'>
                            <li>Intensive and Versatile Data</li>
                            <li> Advanced Data Aggregation Algorithms</li>
                            <li>  Data Provenance and Transparency</li>
                            <li> Non-custodial and Portable Data</li>
                        </ul>



                        <p className='mt-[10px]'> Nodes Data Market</p>
                        <p>A scalable ecosystem of nodes allowing individual users to contribute to the evolution of AI. Offers bespoke solutions for enhanced safety and privacy, redefining the web browsing experience with unmatched anonymity and protection.</p>
                        <ul className='list-disc px-[20px]'>
                            <li> Unsurpassed Privacy & Anonymity</li>
                        </ul>
                    </div>

                    <div className='grid grid-cols-3 gap-x-5 my-10'>
                        <div>
                            <h3>Website</h3>
                            <a className='text-primary' href={data?.presaleInfo?.website}>{data?.presaleInfo?.website}</a>
                        </div>
                        <div>
                            <h3>Documents</h3>
                            <a href={data?.presaleInfo?.website} className='text-primary'>Whitepaper</a>
                        </div>
                        <div>
                            <img
                                src={data?.presaleInfo?.images?.logo}
                                className="h-[40px] w-full object-contain"
                                alt=""
                            />
                        </div>
                    </div>

                    <div >
                        <h3>Social Media</h3>
                        <div className="flex space-x-4 mt-6">
                            {data?.presaleInfo?.socials?.twitter && (
                                <a href={data.presaleInfo.socials.twitter} target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className='hover:text-primary' size={20} />
                                </a>
                            )}
                            {data?.presaleInfo?.socials?.telegram && (
                                <a href={data.presaleInfo.socials.telegram} target="_blank" rel="noopener noreferrer">
                                    <FaTelegramPlane className='hover:text-primary' size={20} />
                                </a>
                            )}
                            {data?.presaleInfo?.socials?.discord && (
                                <a href={data.presaleInfo.socials.discord} target="_blank" rel="noopener noreferrer">
                                    <FaDiscord className='hover:text-primary' size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

            </div>


            <div className="p-[30px_20px] bg-[#000027] rounded-[10px] col-span-1 relative min-w-fit md:min-w-[450px] space-y-3">

                <div className="flex items-center justify-between">
                    {/* <img src={item.image} className='
        h-[60px] w-[60px] border rounded-full border-white' alt="" /> */}
                    <PresaleStatus startTime={data.startTime} endTime={data.endTime} />
                </div>

                <div className='flex justify-between items-center'>
                    <div className="mt-[10px] items-start flex flex-col space-x-[5px]">
                        <p className='text-primary text-[12px]'>Sale ends in</p>
                        <PresaleCountdownTimer time={data.endTime} />
                    </div>

                    <div>
                        <img
                            src={data?.presaleInfo?.images?.logo}
                            className="h-[40px] w-full object-contain"
                            alt=""
                        />
                    </div>
                </div>

                <PresaleProgress totalPaymentReceived={data.totalPaymentReceived} hardCap={data.hardCap} softCap={data.softCap} />


                <div className='w-full'>
                    <div className='flex items-center justify-between gap-x-3 w-full text-[14px]'>
                        <p>Participants Count</p>
                        <div className="bg-primary w-[20%] h-[2px]" />
                        <span>{data.purchaserCount ? data.purchaserCount : 0} Investors Participated.</span>
                    </div>
                    <div className='flex items-center justify-between gap-x-3 w-full text-[14px]'>
                        <p>Total Raised</p>
                        <div className="bg-primary w-[20%] h-[2px]" />
                        <span>{data.totalPaymentReceived ? data.totalPaymentReceived : 0} {data.paymentToken.symbol} Raised</span>
                    </div>
                </div>

                <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] w-full justify-center font-[500] mt-10 transition-all duration-700 hover:scale-105">Buy Tokens Now</button>
            </div>
        </div>
    );
}

export default IdoComponent
