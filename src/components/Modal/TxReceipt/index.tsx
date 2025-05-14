import React from 'react';
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation } from 'react-icons/gi';

interface TxReceiptProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    txHash: string;
}

const TxReceipt: React.FC<TxReceiptProps> = ({
    visible,
    onClose,
    title,
    txHash,
}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(txHash);
        toast('Copied to clipboard!');
    };

    const truncatedHash = `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;

    if (!visible) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative sci-fi-panel w-full max-w-md overflow-hidden border border-cosmic/30 bg-gradient-to-b from-deepspace/90 to-deepspace/100"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 300
                        }}
                    >
                        {/* Decorative corner accents - all four corners */}
                        <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
                        <div className="absolute top-0 left-0 w-[30px] h-[30px] border-t-2 border-l-2 border-cosmic/30 rounded-tl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-[30px] h-[30px] border-b-2 border-r-2 border-cosmic/30 rounded-br-lg"></div>

                        {/* Diagonal line decorations */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-0 w-[150%] h-[1px] bg-cosmic/20 transform rotate-[15deg] translate-y-[20px] translate-x-[-20px]"></div>
                            <div className="absolute bottom-0 right-0 w-[150%] h-[1px] bg-cosmic/20 transform rotate-[15deg] translate-y-[-20px] translate-x-[20px]"></div>
                        </div>

                        {/* Background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-cosmic/10 rounded-full blur-[80px] -z-10"></div>

                        {/* Animated stars */}
                        <motion.div
                            className="absolute top-[15%] right-[10%] text-cosmic text-sm"
                            animate={{
                                y: [0, 10, 0],
                                opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <GiStarFormation />
                        </motion.div>

                        <motion.div
                            className="absolute bottom-[20%] left-[15%] text-skyblue text-xs"
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <GiStarFormation />
                        </motion.div>

                        <div className="relative">
                            {/* Header */}
                            <div className="p-6 border-b border-cosmic/20">
                                <div className="flex flex-col items-center gap-4">
                                    {/* Success icon with orbiting elements */}
                                    <div className="relative">
                                        <motion.div
                                            className="bg-cosmic/20 p-4 rounded-full relative z-10"
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: 1,
                                                rotate: [0, 5, 0, -5, 0],
                                                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.6)', '0 0 0px rgba(108, 92, 231, 0.3)']
                                            }}
                                            transition={{
                                                boxShadow: { duration: 2, repeat: Infinity },
                                                scale: { type: "spring", stiffness: 300, damping: 15 },
                                                rotate: { duration: 2, ease: "easeInOut", repeat: Infinity }
                                            }}
                                        >
                                            <FaCheckCircle className="h-8 w-8 text-cosmic" />
                                        </motion.div>

                                        {/* Orbiting Solana icon */}
                                        <motion.div
                                            className="absolute top-0 left-0 w-full h-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            style={{ transformOrigin: "center center" }}
                                        >
                                            <motion.div
                                                className="absolute -top-1 left-1/2 -translate-x-1/2 bg-cosmic/10 p-1.5 rounded-full"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <SiSolana className="text-xs text-cosmic" />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Title with animated underline */}
                                    <div className="text-center">
                                        <motion.h3
                                            className="text-2xl font-bold text-white font-orbitron sci-fi-text-glow"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {title}
                                        </motion.h3>

                                        <motion.div
                                            className="w-[80px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mx-auto mt-2"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "80px", opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.3 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Hash Section */}
                            <motion.div
                                className="p-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center gap-4 flex-col">
                                    <div className="flex items-center justify-center gap-2">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        >
                                            <SiSolana className="text-cosmic" />
                                        </motion.div>
                                        <span className="font-medium text-gray-300 font-space">Transaction Hash:</span>
                                    </div>

                                    <motion.div
                                        className="bg-cosmic/10 p-4 rounded-lg border border-cosmic/20 w-full group"
                                        whileHover={{
                                            borderColor: "rgba(108, 92, 231, 0.5)",
                                            boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)"
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <motion.code
                                                className="text-cosmic font-mono"
                                                animate={{
                                                    color: ["#6c5ce7", "#8c7ae6", "#6c5ce7"]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {truncatedHash}
                                            </motion.code>

                                            <motion.button
                                                onClick={handleCopy}
                                                className="p-2 text-cosmic bg-cosmic/10 rounded-full"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaCopy className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    <motion.p
                                        className="text-xs text-gray-400 mt-1 font-space"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Click to copy transaction hash
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* Close Button */}
                            <motion.div
                                className="p-4 border-t border-cosmic/20 flex justify-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.button
                                    onClick={onClose}
                                    className="relative w-full py-3 text-white font-medium overflow-hidden group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                                    <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon group-hover:bg-deepspace/80"></span>
                                    <motion.span
                                        className="relative flex items-center justify-center gap-2 font-orbitron"
                                        whileHover={{
                                            textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                                        }}
                                    >
                                        <motion.span
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            Close
                                        </motion.span>
                                    </motion.span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TxReceipt;
