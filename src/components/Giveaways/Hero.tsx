import { motion } from 'framer-motion';
import { FaRocket, FaGift, FaSatelliteDish } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation, GiMoonOrbit } from 'react-icons/gi';

function Hero() {
    return (
        <div className="relative font-space overflow-hidden bg-deepspace/30">
            {/* Animated background elements */}
            <motion.div
                className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[60px] bg-cosmic/20"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[60px] bg-cosmic/20"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Star particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-skyblue/30"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 10 + 5}px`
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        <GiStarFormation />
                    </motion.div>
                ))}
            </div>

            {/* Main content */}
            <div className="text-white min-w-full items-center grid lg:grid-cols-2 p-[40px_20px] lg:p-[40px] relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <SiSolana className="text-cosmic text-3xl" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="bg-cosmic/20 px-3 py-1 rounded-md"
                        >
                            <span className="font-orbitron text-sm">SOLANA ECOSYSTEM</span>
                        </motion.div>
                    </div>

                    <motion.h1
                        className="text-[40px] lg:text-[60px] font-bold leading-[45px] lg:leading-[65px] font-orbitron"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Claim Your Share of <span className="text-cosmic">Exclusive Airdrops</span>
                    </motion.h1>

                    <motion.p
                        className="text-[18px] lg:text-[20px] leading-[24px] lg:leading-[28px] mt-6 text-white/80 font-space"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Be among the first to receive free tokens from the hottest new projects on Solana.<br className="hidden lg:block" />
                        Simple participation, maximum rewards - your gateway to the future of crypto.
                    </motion.p>

                    <motion.div
                        className="flex gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <motion.div
                            className="flex items-center gap-2 bg-deepspace/50 border border-cosmic/30 p-3 rounded-lg"
                            whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 0.5)" }}
                        >
                            <FaGift className="text-cosmic" />
                            <span className="font-orbitron text-sm">Exclusive Rewards</span>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-2 bg-deepspace/50 border border-cosmic/30 p-3 rounded-lg"
                            whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 0.5)" }}
                        >
                            <FaRocket className="text-cosmic" />
                            <span className="font-orbitron text-sm">Early Access</span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex items-center justify-center lg:justify-end mt-10 lg:mt-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="relative">
                        <motion.div
                            className="absolute -z-10 w-full h-full rounded-full blur-[60px] bg-cosmic/20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <motion.div
                            className="relative z-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        >
                            <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            >
                                <GiMoonOrbit className="text-cosmic text-4xl" />
                            </motion.div>

                            {/* <img
                                src="/hero-der.svg"
                                alt="Airdrop Giveaways Illustration"
                                className="relative z-10 max-w-[300px] lg:max-w-[400px]"
                            /> */}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-[40px] h-[40px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
        </div>
    )
}

export default Hero