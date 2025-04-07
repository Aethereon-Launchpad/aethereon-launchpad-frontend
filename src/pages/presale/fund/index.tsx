import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { baseSepolia } from "../../../config/chain";
import { publicClient } from "../../../config";
import { usePresale } from "../../../hooks/web3/usePresale";
import { createWalletClient, custom } from "viem";
import { Oval, Preloader, ThreeDots } from 'react-preloader-icon';
import TxReceipt from "../../../components/Modal/TxReceipt";
import Presale from '../../../abis/Presale.json';
import { ethers } from "ethers";
import erc20Abi from "../../../abis/ERC20.json";
import { usePrivy } from "@privy-io/react-auth";
import { getTokenAllowance, getTokenDecimals } from "../../../utils/web3/actions";
import { toast } from "react-hot-toast";
import { IoWalletSharp } from "react-icons/io5";

const createViemWalletClient = () => {
    return createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum)
    });
};

export default function Fund() {
    const { id } = useParams<{ id: `0x${string}` }>();
    const { data, error, loading } = usePresale(id as `0x${string}`, { polling: false });
    const [amount, setAmount] = useState<number>(0)
    const [funding, setFunding] = useState<boolean>(false);
    const { user, authenticated, login } = usePrivy();
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Successfully Funded Presale");
    const [txHash, setTxHash] = useState<string>("");

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
        return <div className="text-red-500 text-center">Error loading presale: {error.message}</div>;
    }

    async function fundPresale() {
        setFunding(true);
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        const decimals = await getTokenDecimals(data.saleToken.id)
        const fundAmount = ethers.parseUnits(amount.toString(), decimals);


        try {
            // Approve Token Spending
            async function approveTokenSpending() {
                if (user?.wallet?.address) {
                    let allowance = await getTokenAllowance(
                        data.saleToken.id,
                        data.id,
                        user.wallet.address as `0x${string}`
                    )

                    console.log(allowance);
                    // Check if allowance is less than stake amount
                    if (Number(allowance) < amount) {
                        // Allow Contract to Spend
                        const { request } = await publicClient.simulateContract({
                            address: data.saleToken.id,
                            account,
                            abi: erc20Abi,
                            functionName: "approve",
                            args: [data.id, fundAmount]  // Changed to approve staking pool contract
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
                    const { request } = await publicClient.simulateContract({
                        address: data.id,
                        abi: Presale,
                        account,
                        functionName: "fund",
                        args: [
                            fundAmount
                        ]
                    })

                    const hash = await walletClient.writeContract(request)
                    toast("Successfully Funded Presale")

                    setTxHash(hash)
                    setTimeout(() => {
                        setShowTxModal(true)
                    }, 2000)
                    setAmount(0)
                } catch (error: any) {
                    console.error(error.message)
                    if (error.message.includes("User rejected the request")) {
                        toast("User Rejected the Request")
                        return;
                    }
                    if (error.message.includes("sale already started")) {
                        toast("Fund Failure! presale already started")
                        return;
                    }
                    if (error.message.includes("caller not funder")) {
                        toast("You are not presale funder")
                        return;
                    }
                    toast.error("Presale Fund Failure, Please Try Again later")
                    setFunding(false)
                } finally {
                    setFunding(false)
                }
            }
        } finally {
            setFunding(false)
        }
    }

    function DeadlineCounter({ deadline }: { deadline: number }) {
        const [timeLeft, setTimeLeft] = useState<number>(0);

        useEffect(() => {
            const interval = setInterval(() => {
                const now = Math.floor(Date.now() / 1000);
                const timeRemaining = deadline - now;
                setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
            }, 1000);

            return () => clearInterval(interval);
        }, [deadline]);

        const days = Math.floor(timeLeft / 86400);
        const hours = Math.floor((timeLeft % 86400) / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            return (
                <div className="text-red-500 font-medium">
                    Deadline Passed
                </div>
            );
        }

        return (
            <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{days}d</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{hours}h</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{minutes}m</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{seconds}s</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-black p-5 text-white font-space">
            <TxReceipt
                onClose={() => setShowTxModal(false)}
                title={txReceiptTitle}
                txHash={txHash}
                visible={showTxModal}
            />
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto border border-primary/20 rounded-[12px] p-[40px_20px] lg:p-[40px] my-10 space-y-6">
                <img
                    src={data?.presaleInfo?.images?.logo}
                    className="h-[60px] w-[60px] object-contain rounded-full border border-primary/20"
                    alt=""
                />
                <p className='text-primary text-center text-[24px] lg:text-[32px] font-[700] uppercase tracking-[3px]'>
                    Fund {data?.presaleInfo?.projectName}
                </p>
                <div>
                    <DeadlineCounter
                        deadline={Number(data.startTime)} />
                </div>
                <div className="w-full space-y-3">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="amountOfSaleTokens" className="text-[#C4C4C4] text-sm">
                            Amount of {data?.saleToken.name}
                        </label>
                        <input
                            type="number"
                            step={0.01}
                            min={0}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    {!authenticated ? (
                        <button
                            onClick={login}
                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                        >
                            <IoWalletSharp className="w-5 h-5" />
                            <span>Connect Wallet</span>
                        </button>
                    ) : (
                        <button
                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                            onClick={fundPresale}
                            disabled={funding}
                        >
                            {funding ? <Preloader
                                use={Oval}
                                size={24}
                                strokeWidth={8}
                                strokeColor="#FFF"
                                duration={800}
                            /> : "Fund Presale"}
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}