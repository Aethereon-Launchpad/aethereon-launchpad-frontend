import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { paymentMade } from "../../../utils/web3/presale";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoins, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

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
                    <motion.div
                        className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 font-space">Min Contribution</span>
                                <span className="font-bold text-lg text-cosmic">{minAmount} {tokenSymbol}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 font-space">Max Contribution</span>
                                <span className="font-bold text-lg text-cosmic">{maxAmount} {tokenSymbol}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                    >
                        <p className="text-gray-300 text-sm mb-3 font-space">You are about to spend:</p>
                        <div className="flex items-center gap-3">
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    value={purchaseAmount}
                                    className="outline-none border-b-2 border-cosmic/30 focus:border-cosmic bg-transparent w-full text-3xl font-bold text-white px-2 py-1 transition-colors duration-300"
                                    min={minAmount}
                                    max={maxAmount}
                                    onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                                />
                                <motion.span
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-cosmic text-2xl font-medium"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {tokenSymbol}
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )
        } else {
            return (
                <div className="space-y-6">
                    <motion.div
                        className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <SiSolana className="text-cosmic" />
                            <p className="text-gray-300 text-sm font-space">Current Contribution:</p>
                        </div>
                        <p className="text-3xl font-bold text-cosmic">{paymentMadeAmount} <span className="text-white text-xl">{tokenSymbol}</span></p>
                    </motion.div>

                    {!isRefundPeriod && (
                        <motion.div
                            className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <FaCoins className="text-cosmic" />
                                <p className="text-gray-300 text-sm font-space">Additional contribution:</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between text-xs text-gray-400 font-space px-1">
                                    <span>Min: {minAmount} {tokenSymbol}</span>
                                    <span>Max: {maxAmount} {tokenSymbol}</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={purchaseAmount}
                                        className="outline-none border-b-2 border-cosmic/30 focus:border-cosmic bg-transparent w-full text-3xl font-bold text-white px-2 py-1 transition-colors duration-300"
                                        min={minAmount}
                                        max={maxAmount}
                                        onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                                    />
                                    <motion.span
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-cosmic text-2xl font-medium"
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {tokenSymbol}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )
        }
    }

    useEffect(() => {
        getPaymentMade();
    }, [authenticated])

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="relative sci-fi-panel w-full max-w-md p-8 overflow-hidden border border-cosmic/30"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 300
                    }}
                >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-cosmic/10 rounded-full blur-[80px] -z-10"></div>

                    <div className="relative">
                        <motion.div className="flex items-center justify-center mb-6">
                            <motion.div
                                className="bg-cosmic/20 p-3 rounded-full"
                                animate={{
                                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FaCoins className="text-2xl text-cosmic" />
                            </motion.div>
                            <h2 className="text-white text-2xl font-bold ml-3 font-orbitron sci-fi-text-glow">Confirm Purchase</h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <AmountProcess />
                        </motion.div>

                        <motion.div
                            className="mt-8 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {!authenticated ? (
                                <motion.button
                                    onClick={login}
                                    className="relative w-full py-3 text-white font-medium overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                                    <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                                    <motion.span
                                        className="relative flex items-center justify-center gap-2 font-orbitron"
                                        whileHover={{
                                            textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                                        }}
                                    >
                                        <IoWalletSharp className="text-xl" />
                                        <span>Connect Wallet</span>
                                    </motion.span>
                                </motion.button>
                            ) : (
                                <div className="space-y-4">
                                    {/* Secondary Button - Request Refund */}
                                    {paymentMadeAmount > 0 && (
                                        <motion.button
                                            onClick={requestRefund}
                                            disabled={refunding}
                                            className="relative w-full py-3 text-white font-medium overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                            whileHover={!refunding ? { scale: 1.02 } : {}}
                                            whileTap={!refunding ? { scale: 0.98 } : {}}
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon opacity-80"></span>
                                            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                                            <motion.span
                                                className="relative flex items-center justify-center gap-2 font-orbitron"
                                                whileHover={{
                                                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                                                }}
                                            >
                                                {refunding ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Preloader
                                                            use={Oval}
                                                            size={24}
                                                            strokeWidth={8}
                                                            strokeColor="#6c5ce7"
                                                            duration={800}
                                                        />
                                                    </motion.div>
                                                ) : (
                                                    <>
                                                        <FaExclamationCircle className="text-xl" />
                                                        Request Refund
                                                    </>
                                                )}
                                            </motion.span>
                                        </motion.button>
                                    )}

                                    {/* Primary Button - Confirm Purchase */}
                                    {!isRefundPeriod && (
                                        <motion.button
                                            onClick={onConfirm}
                                            disabled={loading}
                                            className="relative w-full py-3 text-white font-medium overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                            whileHover={!loading ? { scale: 1.02 } : {}}
                                            whileTap={!loading ? { scale: 0.98 } : {}}
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                                            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                                            <motion.span
                                                className="relative flex items-center justify-center gap-2 font-orbitron"
                                                whileHover={{
                                                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                                                }}
                                            >
                                                {loading ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Preloader
                                                            use={Oval}
                                                            size={24}
                                                            strokeWidth={8}
                                                            strokeColor="#6c5ce7"
                                                            duration={800}
                                                        />
                                                    </motion.div>
                                                ) : (
                                                    <>
                                                        <SiSolana className="text-xl" />
                                                        Confirm Purchase
                                                    </>
                                                )}
                                            </motion.span>
                                        </motion.button>
                                    )}
                                </div>
                            )}

                            {/* Tertiary Button - Cancel */}
                            <motion.button
                                onClick={onClose}
                                className="relative w-full py-3 text-gray-300 hover:text-white overflow-hidden border border-cosmic/30 rounded-md bg-deepspace/50"
                                whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.span
                                    className="relative font-orbitron"
                                    whileHover={{
                                        textShadow: "0 0 8px rgba(135, 206, 235, 0.5)"
                                    }}
                                >
                                    Cancel
                                </motion.span>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ConfirmClaim;
