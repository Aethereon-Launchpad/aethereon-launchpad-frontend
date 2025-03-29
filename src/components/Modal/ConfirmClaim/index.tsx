import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { paymentMade } from "../../../utils/web3/presale";

interface ConfirmClaim {
    id: string;
    purchaseAmount: number;
    setPurchaseAmount: (amount: number) => void;
    minAmount: number;
    maxAmount: number;
    tokenSymbol: string;
    onConfirm: () => void;
    onClose: () => void;
    loading?: boolean;
    requestRefund: () => void;
    refunding?: boolean;
    isCashed?: boolean;
    isSaleOver?: boolean;
    isRefundPeriod?: boolean;
    isPastRefundPeriod?: boolean;
    handleClaim: () => void;
    claimableAmount: number;
}

function ConfirmClaim({
    id,
    purchaseAmount,
    setPurchaseAmount,
    minAmount,
    maxAmount,
    tokenSymbol,
    onConfirm,
    onClose,
    loading = false,
    requestRefund,
    refunding = false,
    isCashed = false,
    isSaleOver = false,
    isRefundPeriod = false,
    isPastRefundPeriod,
    handleClaim,
    claimableAmount,
}: ConfirmClaim) {
    const { authenticated, login, user } = usePrivy();
    const [paymentMadeAmount, setPaymentMadeAmount] = useState<number>(0)


    async function getPaymentMade() {
        if (!user?.wallet?.address) {
            toast("Connect Wallet")
            login();
            return;
        }
        try {
            const amount = await paymentMade(id as `0x${string}`, user?.wallet?.address as `0x${string}`)
            setPaymentMadeAmount(amount)
        } catch (error) {
            console.error(error)
        }
    }

    function AmountProcess() {
        if (paymentMadeAmount === 0) {
            return (
                <div className="space-y-6">
                    <div className="bg-[#291254]/80 p-6 rounded-2xl border border-primary/20">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[#C4C4C4]">Min Contribution</span>
                                <span className="font-bold text-lg">{minAmount} {tokenSymbol}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#C4C4C4]">Max Contribution</span>
                                <span className="font-bold text-lg">{maxAmount} {tokenSymbol}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#291254]/80 p-6 rounded-2xl border border-primary/20">
                        <p className="text-[#C4C4C4] text-sm mb-3">You are about to spend:</p>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                value={purchaseAmount}
                                className="outline-none border-none bg-transparent w-32 text-3xl font-bold text-white"
                                min={minAmount}
                                max={maxAmount}
                                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                            />
                            <span className="text-primary text-2xl font-medium">{tokenSymbol}</span>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="space-y-4">
                    <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                        <p className="text-[#C4C4C4] text-sm mb-1">Current Contribution:</p>
                        <p className="text-3xl font-bold">{paymentMadeAmount} {tokenSymbol}</p>
                    </div>
                    {!isRefundPeriod && (
                        <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                            <p className="text-[#C4C4C4] text-sm mb-1">You can only contribute: Min: {minAmount} {tokenSymbol} | Max: {maxAmount} {tokenSymbol}</p>
                            <p className="text-white text-3xl font-bold flex">
                                <input type="number" value={purchaseAmount} className="outline-none border-none bg-transparent w-28" min={minAmount} max={maxAmount} onChange={(e) => setPurchaseAmount(Number(e.target.value))} /> <span className="text-primary">{tokenSymbol}</span>
                            </p>
                        </div>)
                    }
                </div>
            )
        }
    }

    useEffect(() => {
        getPaymentMade();
    }, [authenticated])

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="relative bg-[#17043B] rounded-2xl w-full max-w-md p-6 overflow-hidden group transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Angled Bracket Background */}
                <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-[2px] bg-[#17043B] clip-path-polygon transition-all duration-300 border border-primary/50"></span>

                <div className="relative">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">Confirm Purchase</h2>

                    <AmountProcess />

                    <div className="mt-8 space-y-3">
                        {!authenticated ? (
                            <button
                                onClick={login}
                                className="relative w-full py-3 text-white font-medium overflow-hidden group-button"
                            >
                                <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                                <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
                                <span className="relative flex items-center justify-center space-x-2">
                                    <IoWalletSharp className="w-5 h-5" />
                                    <span>Connect Wallet</span>
                                </span>
                            </button>
                        ) : (
                            <div className="space-y-5">
                                {/* Secondary Button - Request Refund */}
                                {paymentMadeAmount > 0 && (
                                    <button
                                        onClick={requestRefund}
                                        disabled={refunding}
                                        className="relative w-full py-3 text-white font-medium overflow-hidden group-button disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-secondary clip-path-polygon"></span>
                                        <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
                                        <span className="relative">
                                            {refunding ? (
                                                <Preloader
                                                    use={Oval}
                                                    size={24}
                                                    strokeWidth={8}
                                                    strokeColor="#FFF"
                                                    duration={800}
                                                />
                                            ) : (
                                                'Request Refund'
                                            )}
                                        </span>
                                    </button>
                                )}

                                {/* Primary Button - Confirm Purchase */}
                                {!isRefundPeriod && (
                                    <button
                                        onClick={onConfirm}
                                        disabled={loading}
                                        className="relative w-full py-3 text-white font-medium overflow-hidden group-button disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                                        <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
                                        <span className="relative">
                                            {loading ? (
                                                <Preloader
                                                    use={Oval}
                                                    size={24}
                                                    strokeWidth={8}
                                                    strokeColor="#FFF"
                                                    duration={800}
                                                />
                                            ) : (
                                                'Confirm Purchase'
                                            )}
                                        </span>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Tertiary Button - Cancel */}
                        <button
                            onClick={onClose}
                            className="relative w-full py-2.5 text-[#C4C4C4] hover:text-white overflow-hidden group-button"
                        >
                            <span className="absolute inset-0 w-full h-full bg-transparent clip-path-polygon"></span>
                            <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon border border-primary/50"></span>
                            <span className="relative">Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmClaim;
