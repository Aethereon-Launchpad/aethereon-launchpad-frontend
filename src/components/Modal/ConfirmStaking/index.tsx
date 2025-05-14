import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import { useChain } from "../../../context/ChainContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoins, FaChartLine } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { GiCrystalGrowth } from "react-icons/gi";

interface ConfirmStakingModalProps {
    stakeAmount: number;
    tokenSymbol: string;
    onConfirm: () => void;
    onClose: () => void;
    loading?: boolean;
    APY: string;
}

function ConfirmStakingModal({
    stakeAmount,
    tokenSymbol,
    onConfirm,
    onClose,
    loading = false,
    APY
}: ConfirmStakingModalProps) {
    const { authenticated, login } = usePrivy();
    const { chainName } = useChain();

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
                                <SiSolana className="text-2xl text-cosmic" />
                            </motion.div>
                            <h2 className="text-white text-2xl font-bold ml-3 font-orbitron sci-fi-text-glow">Confirm Staking</h2>
                        </motion.div>

                        <div className="space-y-6">
                            {/* Staking Amount Card */}
                            <motion.div
                                className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaCoins className="text-cosmic" />
                                    <p className="text-gray-300 text-sm font-space">You are about to stake:</p>
                                </div>
                                <div className="flex items-center">
                                    <motion.p
                                        className="text-3xl font-bold text-cosmic"
                                        animate={{ scale: [1, 1.03, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {stakeAmount}
                                    </motion.p>
                                    <p className="text-white text-xl ml-2">{tokenSymbol}</p>
                                </div>
                            </motion.div>

                            {/* Network & APY Card */}
                            <motion.div
                                className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                            >
                                <div className="grid grid-cols-2 gap-6 text-white">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <SiSolana className="text-cosmic" />
                                            <p className="text-gray-300 text-sm font-space">Network</p>
                                        </div>
                                        <p className="font-medium text-white">{chainName}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaChartLine className="text-cosmic" />
                                            <p className="text-gray-300 text-sm font-space">Annual Rewards</p>
                                        </div>
                                        <motion.p
                                            className="font-medium text-cosmic"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {APY}% APY
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Staking Benefits */}
                            <motion.div
                                className="bg-deepspace/50 p-4 rounded-lg border border-cosmic/30 flex items-center gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                            >
                                <GiCrystalGrowth className="text-cosmic text-xl" />
                                <p className="text-gray-300 text-sm font-space">Staking increases your tier level and unlocks exclusive benefits in the Aethereon ecosystem.</p>
                            </motion.div>
                        </div>

                        {/* Buttons */}
                        <motion.div
                            className="mt-8 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {/* Primary Button - Connect Wallet or Confirm Stake */}
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
                                                Confirm Stake
                                            </>
                                        )}
                                    </motion.span>
                                </motion.button>
                            )}

                            {/* Tertiary Button - Cancel */}
                            <motion.button
                                onClick={onClose}
                                className="relative w-full py-3 text-white font-medium overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
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

export default ConfirmStakingModal;
