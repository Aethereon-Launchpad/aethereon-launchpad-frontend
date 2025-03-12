import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { usePresale } from '../../hooks/web3/usePresale';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { differenceInDays, differenceInMinutes, differenceInHours, isBefore, isAfter } from 'date-fns';
import { FaTwitter, FaTelegramPlane, FaDiscord, FaCopy } from "react-icons/fa";
import { PresaleCountdownTimer } from '../Countdown';
import { toast } from 'react-hot-toast';
import TxReceipt from '../Modal/TxReceipt';
import PresaleABI from "../../abis/Presale.json";
import { sonicTestnet } from "../../config/chain";
import { publicClient } from "../../config";
import { createWalletClient, custom } from "viem";
import ConfirmPurchase from '../Modal/ConfirmPurchase';
import { ethers } from 'ethers';
import { usePrivy } from '@privy-io/react-auth';
import { getTokenAllowance } from '../../utils/web3/actions';
import { getClaimableTokensAmount, paymentMade } from '../../utils/web3/presale';
import erc20Abi from "../../abis/ERC20.json";
import { IoWalletSharp } from "react-icons/io5";
import PresaleDescription from '../../components/IDO/IDOInfo/Description/index';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';


const createViemWalletClient = () => {
    return createWalletClient({
        chain: sonicTestnet,
        transport: custom(window.ethereum)
    });
};


function IdoComponent() {
    const { id } = useParams<{ id: `0x${string}` }>();
    const { data, error, loading, refetch } = usePresale(id)
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState<boolean>(false);
    const [purchasing, setPurchasing] = useState<boolean>(false)
    const [txHash, setTxHash] = useState<`0x${string}`>("0x")
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Purchase Successful");
    const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
    const { user, login, authenticated } = usePrivy();
    const [refunding, setRefunding] = useState<boolean>(false);
    const [isSaleOver, setIsSaleOver] = useState<boolean>(false);
    const [isRefundPeriod, setIsRefundPeriod] = useState<boolean>(false);
    const [pastRefundPeriod, setPastRefundPeriod] = useState<boolean>(false);
    const [paymentMadeAmount, setPaymentMadeAmount] = useState<number>(0);
    const [claimableAmount, setClaimableAmount] = useState<number>(0);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true)
    const [markdownContent, setMarkdownContent] = useState(``);

    async function getPaymentMade() {
        setLoadingInfo(true)
        if (!user?.wallet?.address) {
            toast("Connect Wallet")
            login();
            return;
        }
        try {
            const amount = await paymentMade(id as `0x${string}`, user?.wallet?.address as `0x${string}`)
            const claimAmount = await getClaimableTokensAmount(id as `0x${string}`, user.wallet.address as `0x${string}`)

            setPaymentMadeAmount(amount)
            setClaimableAmount(claimAmount)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingInfo(false);
        }
    }

    useEffect(() => {
        const startTimeUnix = data.startTime * 1000 || 0;
        const endTimeUnix = data.endTime * 1000 || 0;

        // Checks if Sale is Over
        if (isAfter(new Date(), new Date(endTimeUnix))) {
            setIsSaleOver(true)
        }

        const delayPeriod = (data.endTime + (Number(data?.withdrawDelay) || 0)) * 1000;

        // Past Refund Period is when current time is after endTime + withdrawDelay
        // Using isBefore to check if delayPeriod is in the past
        if (isBefore(new Date(delayPeriod), new Date())) {
            setPastRefundPeriod(true)
        }

        // Refund Period is when current time is after endTime but before endTime + withdrawDelay
        if (isAfter(new Date(), new Date(endTimeUnix)) && isBefore(new Date(), new Date(delayPeriod))) {
            setIsRefundPeriod(true);
        }

        getPaymentMade();

    }, [authenticated, data])

    useEffect(() => {
        if (data?.presaleInfo?.description_md) {
            const fetchMarkdown = async () => {
                try {
                    const response = await axios.get(data.presaleInfo.description_md);
                    setMarkdownContent(response.data);
                } catch (error) {
                    console.error('Error fetching markdown:', error);
                }
            };
            fetchMarkdown();
        }
    }, [data?.presaleInfo?.description_md]);

    function PresaleStatus({ startTime, endTime }: { startTime: number, endTime: number }) {
        const startTimeUnix = startTime * 1000
        const endTimeUnix = endTime * 1000

        if (isAfter(new Date(), new Date(endTimeUnix))) {
            return (
                <div className="bg-red-700/80 p-[3px_8px] w-fit text-[12px] rounded-[5px]">
                    <p className='text-red-300'>Sale is Over</p>
                </div>)
        }

        if (isAfter(new Date(), new Date(startTimeUnix)) && isBefore(new Date(), new Date(endTimeUnix))) {
            return (
                <div className="bg-green-700/80 p-[3px_8px] w-fit text-[12px] rounded-[5px]">
                    <p className='text-green-300'>Sale in Progress</p>
                </div>)
        }

        if (isBefore(new Date(), new Date(startTimeUnix))) {
            return (
                <div className="bg-blue-700/80 p-[3px_8px] w-fit text-[12px] rounded-[5px]">
                    <p className='text-blue-300'>Upcoming Sale</p>
                </div>)
        }

        return null
    }

    function PresaleProgress({ totalPaymentReceived, softCap, hardCap }: { totalPaymentReceived: number, softCap: number, hardCap: number }) {
        const [progress, setProgress] = useState<number>(0);
        const [target, setTarget] = useState<"Soft Cap" | "Hard Cap">("Soft Cap")

        useEffect(() => {
            if (Number(totalPaymentReceived) < Number(softCap)) {
                setTarget("Soft Cap");
                const percentage = (Number(totalPaymentReceived) / Number(softCap)) * 100;
                setProgress(percentage);
            } else {
                setTarget("Hard Cap");
                const percentage = (Number(totalPaymentReceived) / Number(hardCap)) * 100;
                setProgress(percentage);
            }
        }, [data])

        return (
            <div className="mt-[15px] flex flex-col items-start space-y-[3px] w-[80%]">
                <p>Progress ({progress}%) {"--------->"} {target} </p>
                <div className="h-[10px] w-full rounded-full bg-white">
                    <div style={{ width: `${progress}%` }} className="h-full bg-primary rounded-full"></div>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-primary text-[12px] font-semibold'>{Number(softCap).toFixed(0)} {data.paymentToken.symbol} </p>
                    <p className='text-primary text-[12px] font-semibold'>{Number(hardCap).toFixed(0)} {data.paymentToken.symbol} </p>
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

    async function handlePayment() {
        setPurchasing(true)
        try {
            if (purchaseAmount < data.minTotalPayment) {
                toast(`Can't purchase less than minimum amount ${data.minTotalPayment}`)
                setPurchasing(false)
                return;
            }

            if (purchaseAmount > data.maxTotalPayment) {
                toast(`Can't purchase more than maximum amount ${data.maxTotalPayment}`)
                setPurchasing(false)
                return;
            }

            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();
            if (purchaseAmount === 0 && Number(data.salePrice) !== 0) {
                toast.error("Purchase Amount can't be zero")
                return;
            }

            const purchaseAmountArg = ethers.parseUnits(purchaseAmount.toString(), 18);

            // Approve Token Spending
            async function approveTokenSpending() {
                if (user?.wallet?.address) {
                    let allowance = await getTokenAllowance(
                        data.paymentToken.id,
                        data.id,
                        user.wallet.address as `0x${string}`
                    )

                    // Check if allowance is less than stake amount
                    if (Number(allowance) < purchaseAmount) {
                        // Allow Contract to Spend
                        const { request } = await publicClient.simulateContract({
                            address: data.paymentToken.id,
                            account,
                            abi: erc20Abi,
                            functionName: "approve",
                            args: [data.id, purchaseAmountArg]  // Changed to approve staking pool contract
                        })

                        // Run Approval
                        const txHash = await walletClient.writeContract(request);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        const receipt = await publicClient.getTransactionReceipt({
                            hash: txHash
                        })
                        return receipt
                    }

                    return {
                        status: "success"
                    }
                }
            }

            const receipt = await approveTokenSpending();
            if (receipt && receipt.status === "success") {
                try {
                    // Purchase Transaction
                    const { request } = await publicClient.simulateContract({
                        address: data.id,
                        abi: PresaleABI,
                        account,
                        functionName: "purchase",
                        args: [
                            purchaseAmountArg
                        ]
                    })

                    const hash = await walletClient.writeContract(request)
                    toast("Successful Purchase");
                    setShowPaymentConfirmModal(false);

                    setTxHash(hash)
                    setTimeout(() => {
                        setShowTxModal(true)
                    }, 2000)

                    setTimeout(async () => {
                        await refetch();
                    }, 5000)
                } catch (error: any) {
                    console.error(error)
                    if (error.message.includes("User rejected the request")) {
                        toast("User Rejected the Request!")
                        return;
                    }
                    if (error.message.includes("sale over")) {
                        toast("Sale is Over!")
                        return
                    }
                    if (error.message.includes("sale has not begun")) {
                        toast('Sale has not started yet')
                        return
                    }

                    toast.error("Purchase Failure, Please Try Again later")
                    setPurchasing(false)
                } finally {
                    setPurchasing(false)
                }

            }
        } catch (error) {
            toast.error("Purchase Failed! Please Try Again Later")
        } finally {
            setPurchasing(false)
        }
    }

    async function requestRefund() {
        setRefunding(true)
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();
            const refundDeadline = data.endTime * 1000;

            if (isBefore(new Date(refundDeadline), new Date())) {
                toast("You have missed the refund period")
                console.log("you have missed the refund period")
                setRefunding(false)
                return
            }

            const { request } = await publicClient.simulateContract({
                address: data.id,
                abi: PresaleABI,
                account,
                functionName: "emergencyWithdraw"
            })

            const hash = await walletClient.writeContract(request)
            toast("Successful Refund");
            setShowPaymentConfirmModal(false);
            setTxReceiptTitle("Refund Successful")

            setTxHash(hash)
            setTimeout(() => {
                setShowTxModal(true)
            }, 2000)

            setTimeout(async () => {
                await refetch();
            }, 5000)
        } catch (error: any) {
            console.log(error.message)
            if (error.message.includes("you did not contribute to this sale")) {
                toast("You did not contribute to this sale")
                return;
            }
            if (error.message.includes("sale has been cashed already")) {
                toast("Sale has been cashed already")
                return;
            }
            if (error.message.includes("cannot use emergency withdrawal after regular withdrawal")) {
                toast("cannot use emergency withdrawal after regular withdrawal")
                return;
            }
            toast.error("Purchase Failed! Please Try Again Later")
        } finally {
            setRefunding(false)
        }
    }

    async function handleClaim() {
        setRefunding(true)
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            if (!pastRefundPeriod) {
                toast("It is not yet claim period")
                setRefunding(false)
                return;
            }

            const { request } = await publicClient.simulateContract({
                address: data.id,
                abi: PresaleABI,
                account,
                functionName: "withdraw"
            })

            const hash = await walletClient.writeContract(request)
            toast("Successful Withdrawal");
            setShowPaymentConfirmModal(false);

            setTxHash(hash)
            setTxReceiptTitle("Successful Withdrawal")
            setTimeout(() => {
                setShowTxModal(true)
            }, 2000)

            setTimeout(async () => {
                await refetch();
            }, 5000)

        } catch (error: any) {
            console.log(error.message)
            if (error.message.includes("cannot withdraw yet")) {
                toast("Cannot withdraw yet")
                return;
            }
            if (error.message.includes("Already Cashed")) {
                toast("Already Cashed")
                return;
            }
            if (error.message.includes("can't withdraw before claim is started")) {
                toast("Can't withdraw before claim is started")
                return;
            }
            toast('Withdrawal Failed, please try again later')
        } finally {
            setRefunding(false)
        }
    }

    console.log(data.withdrawDelay)

    return (
        <div className='p-[40px_20px] flex flex-col-reverse gap-[40px] lg:flex-row items-start lg:p-[40px] font-grotesk text-white space-y-5'>
            {
                showPaymentConfirmModal && (
                    <ConfirmPurchase
                        id={data.id}
                        purchaseAmount={purchaseAmount}
                        minAmount={Number(data.minTotalPayment)}
                        maxAmount={Number(data.maxTotalPayment)}
                        tokenSymbol={data.paymentToken.symbol}
                        onConfirm={handlePayment}
                        onClose={() => setShowPaymentConfirmModal(false)}
                        loading={purchasing}
                        setPurchaseAmount={setPurchaseAmount}
                        requestRefund={requestRefund}
                        refunding={refunding}
                        isCashed={data.hasCashed}
                        isSaleOver={isSaleOver}
                        isRefundPeriod={isRefundPeriod}
                        isPastRefundPeriod={pastRefundPeriod}
                        handleClaim={handleClaim}
                        claimableAmount={claimableAmount}
                    />
                )
            }
            <TxReceipt
                onClose={() => setShowTxModal(false)}
                title={txReceiptTitle}
                txHash={txHash}
                visible={showTxModal}
            />
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
                            <li><span className='font-semibold'>Refund Period</span> : {Number(data.withdrawDelay) / 86400} {Number(data.withdrawDelay) / 86400 === 1 ? "Day" : "Days"}</li>
                            <li><span className='font-semibold'>Mainnet Contract</span> : <span className="underline flex gap-x-3 items-center hover:cursor-pointer hover:text-primary" onClick={() => copyAddress(data.saleToken.id)}> {data.saleToken.id} <FaCopy size={15} /></span> </li>
                        </ul>
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='text-primary text-[18px] uppercase font-normal tracking-[3px]'>About {data?.presaleInfo?.projectName}</p>

                    <div className='text-[15px] lg:text-[18px] mt-[20px]'>
                        <p>{data?.presaleInfo?.description}</p>
                        {data?.presaleInfo?.description_md && markdownContent && (
                            <div className="markdown-content">
                                <ReactMarkdown>{markdownContent}</ReactMarkdown>
                            </div>
                        )}
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
                    <PresaleStatus startTime={data.startTime} endTime={data.endTime} />
                </div>

                <div className='flex justify-between items-center'>
                    <div className="mt-[10px] items-start flex flex-col space-x-[5px]">
                        {isBefore(new Date(), new Date(data.startTime * 1000)) ? (
                            <>
                                <p className='text-primary text-[12px]'>Sale starts in</p>
                                <PresaleCountdownTimer time={data.startTime} />
                            </>
                        ) : (
                            <>
                                <p className='text-primary text-[12px]'>Sale ends in</p>
                                <PresaleCountdownTimer time={data.endTime} />
                            </>
                        )}
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
                <>
                    {authenticated ? (
                        <>
                            {
                                pastRefundPeriod ? (
                                    <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] w-full justify-center font-[500] mt-10 transition-all duration-700 hover:scale-105 disabled:bg-primary/20 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        onClick={handleClaim}
                                        disabled={claimableAmount === 0 ? true : false}
                                    >
                                        {claimableAmount === 0 ? "You have no tokens to claim" : "Claim Tokens"}
                                    </button>
                                ) : (
                                    <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] w-full justify-center font-[500] mt-10 transition-all duration-700 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100" onClick={() => {
                                        if (isBefore(new Date(), new Date(data.startTime * 1000))) {
                                            toast("Sale hasn't started yet");
                                            setPurchasing(false);
                                            return;
                                        }

                                        setShowPaymentConfirmModal(true)
                                        setPurchaseAmount(data.minTotalPayment)
                                    }}>
                                        Buy Tokens
                                    </button>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] w-full justify-center font-[500] mt-10 transition-all duration-700 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100" onClick={() => {
                                setShowPaymentConfirmModal(true)
                                setPurchaseAmount(data.minTotalPayment)
                            }}>
                                <IoWalletSharp className="w-5 h-5" />
                                <span>Connect Wallet</span>
                            </button>
                        </>
                    )}
                </>

            </div>
        </div>
    );
}

export default IdoComponent
