import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExternalLinkAlt, FaRocket, FaSpaceShuttle } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation, GiMoonOrbit } from 'react-icons/gi';

interface TxReceiptProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    txHash: `0x${string}`;
}

export default function TxReceipt({ visible, onClose, title, txHash }: TxReceiptProps) {
    return (
        <AnimatePresence>
            {visible && (
                <Dialog
                    as={motion.div}
                    static
                    open={visible}
                    onClose={onClose}
                    className="relative z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel
                            as={motion.div}
                            className="relative sci-fi-panel w-full max-w-md p-8 overflow-hidden border border-cosmic/30 bg-gradient-to-b from-deepspace/90 to-deepspace/100"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
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

                            <div className="flex flex-col items-center gap-6">
                                {/* Success icon with orbiting elements */}
                                <div className="relative">
                                    <motion.div
                                        className="bg-cosmic/20 p-4 rounded-full relative z-10"
                                        transition={{ duration: 2, repeat: Infinity }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.6)', '0 0 0px rgba(108, 92, 231, 0.3)'] }}
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                                        >
                                            <FaCheckCircle className="h-12 w-12 text-cosmic" />
                                        </motion.div>
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

                                    {/* Orbiting star icon in opposite direction */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-full"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        style={{ transformOrigin: "center center" }}
                                    >
                                        <motion.div
                                            className="absolute top-1/2 -right-1 -translate-y-1/2 bg-cosmic/10 p-1.5 rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        >
                                            <GiStarFormation className="text-xs text-skyblue" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Title with animated underline */}
                                <div className="text-center">
                                    <Dialog.Title
                                        as={motion.h2}
                                        className="text-2xl font-bold text-white font-orbitron sci-fi-text-glow"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {title}
                                    </Dialog.Title>

                                    <motion.div
                                        className="w-[80px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mx-auto mt-2"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "80px", opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    ></motion.div>
                                </div>

                                <motion.div
                                    className="bg-deepspace/50 p-6 rounded-lg border border-cosmic/30 w-full relative overflow-hidden"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                                >
                                    {/* Decorative corner accent */}
                                    <div className="absolute top-0 right-0 w-[15px] h-[15px] border-t-[1px] border-r-[1px] border-cosmic/50 rounded-tr-lg"></div>
                                    <div className="absolute bottom-0 left-0 w-[15px] h-[15px] border-b-[1px] border-l-[1px] border-cosmic/50 rounded-bl-lg"></div>

                                    {/* Animated background pulse */}
                                    <motion.div
                                        className="absolute inset-0 bg-cosmic/5 -z-10"
                                        animate={{
                                            opacity: [0.1, 0.2, 0.1]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />

                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            >
                                                <SiSolana className="text-cosmic" />
                                            </motion.div>
                                            <p className="text-gray-300 text-sm font-space">Transaction Hash</p>
                                        </div>

                                        <motion.div
                                            className="bg-cosmic/10 p-4 rounded-lg border border-cosmic/20 mt-2 group"
                                            whileHover={{
                                                borderColor: "rgba(108, 92, 231, 0.5)",
                                                boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)"
                                            }}
                                        >
                                            <a
                                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cosmic hover:text-cosmic/80 break-all text-sm font-mono flex items-center justify-center gap-2"
                                            >
                                                <motion.span
                                                    className="truncate"
                                                    animate={{
                                                        color: ["#6c5ce7", "#8c7ae6", "#6c5ce7"]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    {txHash}
                                                </motion.span>
                                                <motion.span
                                                    whileHover={{ scale: 1.2, rotate: 15 }}
                                                    className="text-cosmic"
                                                >
                                                    <FaExternalLinkAlt />
                                                </motion.span>
                                            </a>
                                        </motion.div>

                                        <motion.p
                                            className="text-xs text-gray-400 mt-3 font-space"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Click to view on Sepolia Explorer
                                        </motion.p>
                                    </div>
                                </motion.div>

                                <motion.button
                                    onClick={onClose}
                                    className="relative w-full py-3 text-white font-medium overflow-hidden group"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
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

                                {/* Decorative bottom line */}
                                <motion.div
                                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-cosmic/30 to-transparent"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                ></motion.div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}