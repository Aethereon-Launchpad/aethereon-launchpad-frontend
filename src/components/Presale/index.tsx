import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { usePresale } from '../../hooks/web3/usePresale';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { differenceInDays, differenceInMinutes, differenceInHours, isBefore, isAfter } from 'date-fns';
import { FaTwitter, FaTelegramPlane, FaDiscord, FaCopy, FaRocket, FaExternalLinkAlt, FaShieldAlt, FaCoins, FaUndo } from "react-icons/fa";
import { PresaleCountdownTimer } from '../Countdown';
import { toast } from 'react-hot-toast';
import TxReceipt from '../Modal/TxReceipt';
import PresaleABI from "../../abis/Presale.json";
import { createWalletClient, custom } from "viem";
import { useChain } from "../../context/ChainContext";
import ConfirmPurchase from '../Modal/ConfirmPurchase';
import { ethers } from 'ethers';
import { usePrivy } from '@privy-io/react-auth';
import { getTokenAllowance } from '../../utils/web3/actions';
import { getClaimableTokensAmount, paymentMade } from '../../utils/web3/presale';
import erc20Abi from "../../abis/ERC20.json";
import { IoWalletSharp } from "react-icons/io5";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useLockStake } from '../../hooks/web3/useLockStake';
import { getTokenBalance } from '../../utils/web3/actions';
import { usePageTitleIDO } from '../../hooks/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SiSolana } from "react-icons/si";
import { GiStarFormation, GiMoonOrbit } from "react-icons/gi";

// The createViemWalletClient function will be defined inside the component


export default function IDOComponent() {
    const { publicClient } = useChain();

    // Add this function to create wallet client
    const createViemWalletClient = () => {
        return createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum)
        });
    };
    const { id } = useParams<{ id: string }>();
    const { data, error, loading, refetch } = usePresale(id, { polling: false })
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState<boolean>(false);
    const [purchasing, setPurchasing] = useState<boolean>(false)
    const [txHash, setTxHash] = useState<`0x${string}`>("0x")
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Purchase Successful");
    const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
    const { user, login, authenticated } = usePrivy();
    const { data: lockStake, error: lockStakeError, loading: lockStakeLoading } = useLockStake({ polling: true, userAddress: user?.wallet?.address as `0x${string}` })
    const [refunding, setRefunding] = useState<boolean>(false);
    const [isSaleOver, setIsSaleOver] = useState<boolean>(false);
    const [isRefundPeriod, setIsRefundPeriod] = useState<boolean>(false);
    const [pastRefundPeriod, setPastRefundPeriod] = useState<boolean>(false);
    const [paymentMadeAmount, setPaymentMadeAmount] = useState<number>(0);
    const [claimableAmount, setClaimableAmount] = useState<number>(0);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true);
    const [markdownContent, setMarkdownContent] = useState(``);
    const [softCapReached, setSoftCapReached] = useState<boolean>(true);
    const [processingRefundSoftCap, setProcessingRefundSoftCap] = useState<boolean>(false);

    usePageTitleIDO(`Join ${data?.presaleInfo?.projectName} IDO` || "Presale")

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    async function getPaymentMade() {
        setLoadingInfo(true)
        if (!user?.wallet?.address) {
            // toast("Connect Wallet")
            // login();
            return;
        }
        try {
            const amount = await paymentMade(data.id as `0x${string}`, user?.wallet?.address as `0x${string}`)
            const claimAmount = await getClaimableTokensAmount(data.id as `0x${string}`, user.wallet.address as `0x${string}`)

            setPaymentMadeAmount(amount)
            setClaimableAmount(claimAmount)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingInfo(false);
        }
    }

    useEffect(() => {
        if (!data) return;

        const endTimeUnix = data.endTime * 1000 || 0;

        // Checks if Sale is Over
        if (isAfter(new Date(), new Date(endTimeUnix))) {
            setIsSaleOver(true);

            // Check if soft cap has been reached
            if (Number(data.totalPaymentReceived) < Number(data.softCap)) {
                setSoftCapReached(false);
            } else {
                setSoftCapReached(true);
            }
        }

        const delayPeriod = (data.endTime + (Number(data?.withdrawDelay) || 0)) * 1000;

        // Past Refund Period is when current time is after endTime + withdrawDelay
        if (isAfter(new Date(), new Date(delayPeriod))) {
            setPastRefundPeriod(true);
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

    function PresaleStatus({ startTime, endTime, delay }: { startTime: number, endTime: number, delay: number }) {
        const startTimeUnix = startTime * 1000
        const endTimeUnix = endTime * 1000
        const delayPeriod = (Number(endTime) + Number(delay)) * 1000

        if (isAfter(new Date(), new Date(endTimeUnix)) && isBefore(new Date(), new Date(delayPeriod))) {
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
                        <span className="font-orbitron text-white text-sm">Refund Period</span>
                    </motion.div>
                </motion.div>
            )
        }

        if (isAfter(new Date(), new Date(endTimeUnix))) {
            return (
                <motion.div
                    className="bg-gradient-to-r from-red-600/80 to-red-500 px-4 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                        boxShadow: ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.5)', '0 0 0px rgba(239, 68, 68, 0.3)']
                    }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                    <motion.div className="flex items-center gap-2">
                        <FaShieldAlt className="text-white" />
                        <span className="font-orbitron text-white text-sm">Sale Completed</span>
                    </motion.div>
                </motion.div>
            )
        }

        if (isAfter(new Date(), new Date(startTimeUnix)) && isBefore(new Date(), new Date(endTimeUnix))) {
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
                        <span className="font-orbitron text-white text-sm">Sale in Progress</span>
                    </motion.div>
                </motion.div>
            )
        }

        if (isBefore(new Date(), new Date(startTimeUnix))) {
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
                        <span className="font-orbitron text-white text-sm">Upcoming Sale</span>
                    </motion.div>
                </motion.div>
            )
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
                if (percentage > 100) {
                    setProgress(100)
                    return;
                }
                setProgress(percentage);
            }
        }, [data, totalPaymentReceived, softCap, hardCap])

        return (
            <div className="mt-6 flex flex-col items-start space-y-4 w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <span className="text-skyblue font-orbitron text-sm">Progress</span>
                        <motion.span
                            className="text-cosmic font-orbitron text-sm"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {progress.toFixed(2)}%
                        </motion.span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-space text-sm">Target:</span>
                        <motion.span
                            className="text-cosmic font-orbitron text-sm"
                            animate={{
                                textShadow: ['0 0 0px rgba(108, 92, 231, 0)', '0 0 5px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0)']
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {target}
                        </motion.span>
                    </div>
                </div>

                <div className="h-3 w-full bg-deepspace/50 rounded-full overflow-hidden border border-cosmic/20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cosmic/80 to-cosmic rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>

                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-gray-400 font-space text-xs">Soft Cap</span>
                        <span className="text-white font-orbitron text-sm">{Number(softCap).toLocaleString()} {data.paymentToken.symbol}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-gray-400 font-space text-xs">Hard Cap</span>
                        <span className="text-white font-orbitron text-sm">{Number(hardCap).toLocaleString()} {data.paymentToken.symbol}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (loading || lockStakeLoading) {
        return (
            <motion.div
                className="flex justify-center items-center h-[400px] bg-deepspace/30 border border-cosmic/20 rounded-lg"
                animate={{
                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
                    borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="relative"
                    >
                        <SiSolana className="text-5xl text-cosmic" />
                        <motion.div
                            className="absolute -top-1 -right-1 text-sm text-skyblue"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <GiStarFormation />
                        </motion.div>
                    </motion.div>
                    <motion.p
                        className="text-cosmic font-orbitron"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Loading IDO details...
                    </motion.p>
                </div>
            </motion.div>
        );
    }

    if (error.message || lockStakeError.message) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center h-[400px] bg-deepspace/30 border border-cosmic/20 rounded-lg p-8"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    boxShadow: ['0 0 0px rgba(255, 0, 0, 0.1)', '0 0 15px rgba(255, 0, 0, 0.3)', '0 0 0px rgba(255, 0, 0, 0.1)'],
                    borderColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.4)', 'rgba(255, 0, 0, 0.2)']
                }}
                transition={{
                    opacity: { duration: 0.5 },
                    boxShadow: { duration: 2, repeat: Infinity },
                    borderColor: { duration: 2, repeat: Infinity }
                }}
            >
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-red-500/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-red-500/50 rounded-bl-lg"></div>

                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-red-500 text-5xl mb-4"
                >
                    ⚠️
                </motion.div>

                <h3 className="text-red-400 text-xl font-orbitron text-center mb-2">Error Loading IDO</h3>
                <p className="text-white/80 text-center">{error.message || lockStakeError.message}</p>

                <motion.button
                    className="mt-6 bg-gradient-to-r from-red-500/80 to-red-600 px-6 py-2 rounded-md text-white font-orbitron"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                >
                    Retry
                </motion.button>
            </motion.div>
        )
    }

    console.log(data)

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
            // if (Number(data.hardCap) === data.totalPaymentReceived || data.totalPaymentReceived > data.hardCap) {
            //     toast("IDO has reached Hard Cap")
            //     setPurchasing(false)
            //     return;
            // }

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
            const tokenBalance = await getTokenBalance(data.paymentToken.id as `0x${string}`, user?.wallet?.address as `0x${string}`);

            if (Number(purchaseAmount) > Number(tokenBalance)) {
                toast(`You don't have enough ${data.paymentToken.symbol}`)
                setPurchasing(false)
                return;
            }

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
                            args: [data.id, purchaseAmountArg]  // Changed to approve presale contract
                        })

                        // Run Approval
                        const txHash = await walletClient.writeContract(request);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        const receipt = await publicClient.waitForTransactionReceipt({
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
                    if (error.message.includes("must stake to participate in private sale")) {
                        toast("Must stake in Lock & Stake to Participate")
                        return;
                    }

                    toast.error("Purchase Failure, Please Try Again later")
                    setPurchasing(false)
                } finally {
                    setPurchasing(false)
                }

            }
        } catch (error) {
            console.error(error);
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
            const refundDeadline = (Number(data.endTime) + Number(data.withdrawDelay)) * 1000;

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
            toast.error("Refund Failed! Please Try Again Later")
        } finally {
            setRefunding(false)
        }
    }

    // Function to handle refund if soft cap is not reached
    async function handleRefundIfSoftCapNotReached() {
        setProcessingRefundSoftCap(true)
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            // Check if soft cap is reached
            if (Number(data.totalPaymentReceived) >= Number(data.softCap)) {
                toast.error("Soft cap has been reached, refund not available");
                setProcessingRefundSoftCap(false);
                return;
            }

            // Check if refund period is over
            if (!pastRefundPeriod) {
                toast.error("Refund is only available after the refund period is over");
                setProcessingRefundSoftCap(false);
                return;
            }

            // Call the refundIfSoftCapNotReached function
            const { request } = await publicClient.simulateContract({
                address: data.id,
                abi: PresaleABI,
                account,
                functionName: "refundIfSoftCapNotReached"
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Refund successful! Soft cap was not reached");
            setTxReceiptTitle("Soft Cap Refund Successful");

            setTxHash(hash);
            setTimeout(() => {
                setShowTxModal(true);
            }, 2000);

            setTimeout(async () => {
                await refetch();
            }, 5000);
        } catch (error: any) {
            console.error(error);
            if (error.message.includes("soft cap reached")) {
                toast.error("Soft cap has been reached, refund not available");
                return;
            }
            if (error.message.includes("you did not contribute to this sale")) {
                toast.error("You did not contribute to this sale");
                return;
            }
            if (error.message.includes("refund already claimed")) {
                toast.error("You have already claimed your refund");
                return;
            }
            toast.error("Refund failed! Please try again later");
        } finally {
            setProcessingRefundSoftCap(false);
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
            if (error.message.includes("no token to be withdrawn")) {
                toast("No Token to Claim")
                return;
            }
            toast('Withdrawal Failed, please try again later')
        } finally {
            setRefunding(false)
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

    console.log(data)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 p-[40px_20px] lg:p-[40px] text-white">
            {/* Right Column - Moved to top on mobile */}
            <motion.div
                className="relative p-8 overflow-hidden h-fit order-1 lg:order-2 bg-deepspace/30 border border-cosmic/20 rounded-lg"
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
                        <PresaleStatus
                            startTime={data.startTime}
                            endTime={data.endTime}
                            delay={Number(data.withdrawDelay)}
                        />
                    </div>

                    {/* Project Logo and Countdown Timer */}
                    <div className="flex justify-between items-center flex-wrap">
                        <div className="flex flex-col gap-1">
                            {isBefore(new Date(), new Date(data.startTime * 1000)) ? (
                                <>
                                    <span className='text-skyblue font-space text-sm'>Sale starts in</span>
                                    <PresaleCountdownTimer time={data.startTime} />
                                </>
                            ) : isAfter(new Date(), new Date(data.endTime * 1000)) && isBefore(new Date(), new Date((Number(data.endTime) + Number(data.withdrawDelay)) * 1000)) ? (
                                <>
                                    <span className='text-skyblue font-space text-sm'>Refund period ends in</span>
                                    <PresaleCountdownTimer time={Number(data.endTime) + Number(data.withdrawDelay)} />
                                </>
                            ) : (
                                <>
                                    <span className='text-skyblue font-space text-sm'>Sale ends in</span>
                                    <PresaleCountdownTimer time={data.endTime} />
                                </>
                            )}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            <img
                                src={data?.presaleInfo?.images?.logo}
                                className="h-[50px] w-full object-contain"
                                alt={data?.presaleInfo?.projectName}
                            />
                        </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <PresaleProgress
                        totalPaymentReceived={data.totalPaymentReceived}
                        hardCap={data.hardCap}
                        softCap={data.softCap}
                    />

                    {/* Stats */}
                    <motion.div
                        className="bg-deepspace/50 p-4 rounded-lg border border-cosmic/20 space-y-3"
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                    >
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-400 font-space">Participants</p>
                                <p className="text-white font-orbitron">
                                    {data.purchaserCount ? data.purchaserCount : 0}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-gray-400 font-space">Total Raised</p>
                                <p className="text-white font-orbitron">
                                    {data.totalPaymentReceived ? Number(data.totalPaymentReceived).toLocaleString() : 0} {data.paymentToken.symbol}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-gray-400 font-space">Badge</p>
                                <p className="text-white font-orbitron">
                                    {badgeInfo.name}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-gray-400 font-space">Multiplier</p>
                                <p className="text-white font-orbitron">
                                    {returnMultiplier(lockStake?.userData?.amountStaked)}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    {authenticated ? (
                        <>
                            {/* Soft Cap Not Reached Refund Button */}
                            {pastRefundPeriod && !softCapReached && paymentMadeAmount > 0 ? (
                                <motion.button
                                    className="w-full bg-gradient-to-r from-yellow-600/80 to-yellow-500 h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                    whileHover={{
                                        boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)",
                                        y: -1
                                    }}
                                    whileTap={{ y: 1 }}
                                    onClick={handleRefundIfSoftCapNotReached}
                                    disabled={processingRefundSoftCap}
                                >
                                    {processingRefundSoftCap ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <FaUndo className="text-white" />
                                        </motion.div>
                                    ) : (
                                        <FaUndo className="text-white" />
                                    )}
                                    <span>Refund (Soft Cap Not Reached)</span>
                                </motion.button>
                            ) : pastRefundPeriod && paymentMadeAmount === 0 ? (
                                <motion.button
                                    className="w-full bg-gradient-to-r from-gray-600/80 to-gray-500 h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                    whileHover={{
                                        boxShadow: "0 0 15px rgba(156, 163, 175, 0.5)",
                                        y: -1
                                    }}
                                    disabled={true}
                                >
                                    <FaShieldAlt className="text-white" />
                                    <span>Sale Over</span>
                                </motion.button>
                            ) : pastRefundPeriod ? (
                                <motion.button
                                    className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                    whileHover={{
                                        boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                                        y: -1
                                    }}
                                    whileTap={{ y: 1 }}
                                    onClick={handleClaim}
                                    disabled={claimableAmount === 0 || refunding}
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
                                            ? "No tokens to claim"
                                            : `Claim ${Number(claimableAmount).toLocaleString()} ${data.saleToken.symbol}`
                                        }
                                    </span>
                                </motion.button>
                            ) : (
                                <motion.button
                                    className={`w-full h-[50px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4 ${isRefundPeriod
                                        ? "bg-gradient-to-r from-yellow-600/80 to-yellow-500"
                                        : "bg-gradient-to-r from-cosmic/80 to-cosmic"
                                        }`}
                                    whileHover={{
                                        boxShadow: isRefundPeriod
                                            ? "0 0 15px rgba(234, 179, 8, 0.5)"
                                            : "0 0 15px rgba(108, 92, 231, 0.5)",
                                        y: -1
                                    }}
                                    whileTap={{ y: 1 }}
                                    onClick={() => {
                                        if (isBefore(new Date(), new Date(data.startTime * 1000))) {
                                            toast("Sale hasn't started yet");
                                            return;
                                        }

                                        if (isRefundPeriod) {
                                            requestRefund();
                                        } else {
                                            setShowPaymentConfirmModal(true);
                                            setPurchaseAmount(Number(data.minTotalPayment));
                                        }
                                    }}
                                    disabled={purchasing || refunding}
                                >
                                    {purchasing || refunding ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            {isRefundPeriod ? <FaUndo className="text-white" /> : <FaRocket className="text-white" />}
                                        </motion.div>
                                    ) : (
                                        isRefundPeriod ? <FaUndo className="text-white" /> : <FaRocket className="text-white" />
                                    )}
                                    <span>{isRefundPeriod ? "Request Refund" : "Buy Tokens"}</span>
                                </motion.button>
                            )}
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

            {/* Left Column - Moved to bottom on mobile */}
            <motion.div
                className="space-y-8 order-2 lg:order-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Project Details */}
                <motion.div
                    className="bg-deepspace/30 border border-cosmic/20 rounded-lg p-6 space-y-4 relative"
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
                                {data?.presaleInfo?.projectName}
                            </motion.h1>
                            <motion.p
                                className="text-skyblue text-lg font-space mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                Participate in the Future of Solana
                            </motion.p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <motion.div
                                className='bg-deepspace/50 p-6 rounded-lg border border-cosmic/20'
                                whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FaRocket className="text-cosmic" />
                                    <h3 className='text-xl font-semibold text-white font-orbitron'>Presale Details</h3>
                                </div>
                                <ul className='space-y-3'>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>IDO Type</span>
                                        <span className='font-medium text-white font-orbitron'>Refundable sale</span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Sale Access</span>
                                        <span className='text-cosmic font-orbitron'>{data.isPrivateSale ? "Private Sale" : "Public Sale"}</span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Sale Period</span>
                                        <span className='font-medium text-white font-orbitron'>
                                            {differenceInDays(new Date(data.endTime * 1000), new Date(data.startTime * 1000))}
                                            {differenceInDays(new Date(data.endTime * 1000), new Date(data.startTime * 1000)) === 1 ? " day" : " days"}
                                        </span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Ticker</span>
                                        <span className='font-medium text-white font-orbitron'>{data.saleToken.symbol}</span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Token Price</span>
                                        {isAfter(new Date(), new Date(data.startTime * 1000)) ? (
                                            data.presaleInfo.hiddenData && data.presaleInfo.hiddenData.tokenPrice === "TBA" ? (
                                                <span className='font-medium text-white font-orbitron'>${data.salePrice} {data.paymentToken.symbol}</span>
                                            ) : (
                                                <span className='font-medium text-white font-orbitron'>${data.salePrice} {data.paymentToken.symbol}</span>
                                            )
                                        ) : (
                                            <span className='font-medium text-white font-orbitron'>TBA</span>
                                        )}
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className='bg-deepspace/50 p-6 rounded-lg border border-cosmic/20'
                                whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FaCoins className="text-cosmic" />
                                    <h3 className='text-xl font-semibold text-white font-orbitron'>Investment Details</h3>
                                </div>
                                <ul className='space-y-3'>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Soft Cap</span>
                                        <span className='font-medium text-white font-orbitron'>{Number(data.softCap).toLocaleString()} {data.paymentToken.symbol}</span>
                                    </li>
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Hard Cap</span>
                                        <span className='font-medium text-white font-orbitron'>{Number(data.hardCap).toLocaleString()} {data.paymentToken.symbol}</span>
                                    </li>
                                    {data.presaleInfo.hiddenData && data.presaleInfo.hiddenData.totalIMC !== "TBA" && (
                                        <li className='flex justify-between'>
                                            <span className='text-skyblue font-space'>Total IMC</span>
                                            <span className='font-medium text-white font-orbitron'>{Number(data.presaleInfo.hiddenData.totalIMC).toLocaleString()} {data.saleToken.symbol}</span>
                                        </li>
                                    )}
                                    {isAfter(new Date(), new Date(data.startTime * 1000)) && (
                                        <li className='flex justify-between items-center'>
                                            <span className='text-skyblue font-space'>Mainnet Contract</span>
                                            <div className="flex items-center gap-2">
                                                <span className='font-medium text-white font-orbitron'>{data.saleToken.id.slice(0, 6)}...{data.saleToken.id.slice(-4)}</span>
                                                <motion.button
                                                    onClick={() => copyAddress(data.saleToken.id)}
                                                    className="text-cosmic hover:text-cosmic/80 transition-all"
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FaCopy className="w-4 h-4" />
                                                </motion.button>
                                                <motion.a
                                                    href={`https://solscan.io/token/${data.saleToken.id}`}
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
                                    )}
                                    {data.linearVestingEndTime !== 0 && (
                                        <li className='flex justify-between'>
                                            <span className='text-skyblue font-space'>Linear Vesting End</span>
                                            <span className='font-medium text-white font-orbitron'>
                                                {data.linearVestingEndTime && data.linearVestingEndTime > 0 ? (
                                                    new Date(data.linearVestingEndTime * 1000).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                ) : (
                                                    <span className='text-gray-400'>TBA</span>
                                                )}
                                            </span>
                                        </li>)}
                                    {data.cliffPeriod && data.cliffPeriod.length > 0 && (
                                        <li className='flex flex-col'>
                                            <span className='text-skyblue font-space mb-2'>Cliff Vesting Periods</span>
                                            {data.cliffPeriod &&
                                                Array.isArray(data.cliffPeriod) &&
                                                data.cliffPeriod.length > 0 &&
                                                data.cliffPeriod[0].length > 0 ? (
                                                <div className='space-y-2'>
                                                    {data.cliffPeriod.map((period: any, index: number) => (
                                                        period.length > 0 && (
                                                            <div key={index} className='flex justify-between'>
                                                                <span className='text-gray-400 font-space'>
                                                                    {new Date(period.claimTime * 1000).toLocaleDateString('en-GB', {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </span>
                                                                <span className='font-medium text-white font-orbitron'>
                                                                    {period.pct}%
                                                                </span>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className='text-gray-400'>TBA</span>
                                            )}
                                        </li>)
                                    }
                                    <li className='flex justify-between'>
                                        <span className='text-skyblue font-space'>Refund Period</span>
                                        <span className='font-medium text-white font-orbitron'>
                                            {Number(data.withdrawDelay) / 86400}
                                            {Number(data.withdrawDelay) / 86400 === 1 ? " Day" : " Days"}
                                        </span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* About Section */}
                <motion.div
                    className="bg-deepspace/30 border border-cosmic/20 rounded-lg p-6 space-y-4 relative"
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
                        <h2 className="text-2xl font-semibold font-orbitron text-white">About {data?.presaleInfo?.projectName}</h2>
                    </div>

                    <div className="text-white/90 font-space">
                        <p className="mb-4">{data?.presaleInfo?.description}</p>
                        {data?.presaleInfo?.description_md && markdownContent && (
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>{markdownContent}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-cosmic/20">
                        <div className="space-y-2">
                            <h3 className="text-skyblue font-orbitron">Website</h3>
                            <motion.a
                                className="text-cosmic flex items-center gap-2"
                                href={data?.presaleInfo?.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3 }}
                            >
                                <span>{data?.presaleInfo?.website}</span>
                                <FaExternalLinkAlt className="text-xs" />
                            </motion.a>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-skyblue font-orbitron">Documents</h3>
                            <motion.a
                                className="text-cosmic flex items-center gap-2"
                                href={data?.presaleInfo?.website}
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
                                src={data?.presaleInfo?.images?.logo}
                                className="h-[50px] object-contain"
                                alt={data?.presaleInfo?.projectName}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-cosmic/20">
                        <h3 className="text-skyblue font-orbitron mb-4">Social Media</h3>
                        <div className="flex space-x-6">
                            {data?.presaleInfo?.socials?.twitter && (
                                <motion.a
                                    href={data.presaleInfo.socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cosmic hover:text-cosmic/80 transition-all"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTwitter className="w-6 h-6" />
                                </motion.a>
                            )}
                            {data?.presaleInfo?.socials?.telegram && (
                                <motion.a
                                    href={data.presaleInfo.socials.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cosmic hover:text-cosmic/80 transition-all"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTelegramPlane className="w-6 h-6" />
                                </motion.a>
                            )}
                            {data?.presaleInfo?.socials?.discord && (
                                <motion.a
                                    href={data.presaleInfo.socials.discord}
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

            {/* Modals */}
            <AnimatePresence>
                {showPaymentConfirmModal && (
                    <ConfirmPurchase
                        onClose={() => setShowPaymentConfirmModal(false)}
                        onConfirm={handlePayment}
                        purchaseAmount={purchaseAmount}
                        loading={purchasing}
                        claimableAmount={claimableAmount}
                        handleClaim={handleClaim}
                        id={data.id as string}
                        maxAmount={data.maxTotalPayment}
                        minAmount={data.minTotalPayment}
                        requestRefund={requestRefund}
                        refunding={refunding}
                        isCashed={data.cashed}
                        isSaleOver={isSaleOver}
                        isRefundPeriod={isRefundPeriod}
                        isPastRefundPeriod={pastRefundPeriod}
                        setPurchaseAmount={setPurchaseAmount}
                        tokenSymbol={data.paymentToken.symbol}
                    />
                )}

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