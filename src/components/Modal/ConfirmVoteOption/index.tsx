import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import { motion, AnimatePresence } from "framer-motion";
import { FaVoteYea, FaCheckCircle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
interface ConfirmVoteOption {
    voteTitle: string;
    voteSelection: string;
    onConfirm: () => void;
    onClose: () => void;
    loading?: boolean;
}

function ConfirmVoteModal({
    voteTitle,
    voteSelection,
    onConfirm,
    onClose,
    loading = false,
}: ConfirmVoteOption) {
    const { authenticated, login } = usePrivy();

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
                                <FaVoteYea className="text-2xl text-cosmic" />
                            </motion.div>
                            <h2 className="text-white text-2xl font-bold ml-3 font-orbitron sci-fi-text-glow">Confirm Your Vote</h2>
                        </motion.div>

                        <motion.div
                            className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                        >
                            <div className="space-y-4 text-center">
                                <p className="text-gray-300 font-space">You are about to submit your vote for:</p>
                                <motion.div
                                    className="bg-cosmic/10 p-3 rounded-lg border border-cosmic/20"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <motion.p
                                        className="capitalize text-cosmic font-bold text-xl font-orbitron"
                                        animate={{ scale: [1, 1.03, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {voteTitle}
                                    </motion.p>
                                </motion.div>

                                <p className="text-gray-300 font-space mt-4">Your selection:</p>
                                <motion.div
                                    className="bg-cosmic/10 p-3 rounded-lg border border-cosmic/20 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <FaCheckCircle className="text-cosmic" />
                                    <motion.p
                                        className="capitalize text-cosmic font-bold text-xl font-orbitron"
                                        animate={{ scale: [1, 1.03, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    >
                                        {voteSelection}
                                    </motion.p>
                                </motion.div>

                                <motion.p
                                    className="text-gray-400 text-sm font-space mt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Once submitted, your vote cannot be changed
                                </motion.p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-8 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
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
                                                <FaVoteYea className="text-xl" />
                                                Confirm Vote
                                            </>
                                        )}
                                    </motion.span>
                                </motion.button>
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

export default ConfirmVoteModal;
