import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAstronaut, FaWallet, FaCoins, FaRocket } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function HowTo() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200
            }
        },
        hover: {
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            color: "#3498db",
            transition: { duration: 0.5 }
        }
    };

    const steps = [
        {
            icon: <FaUserAstronaut className="text-3xl" />,
            title: "Create Account",
            description: "Join the Aethereon community with a simple sign-up process"
        },
        {
            icon: <FaWallet className="text-3xl" />,
            title: "Connect Solana Wallet",
            description: "Securely link your Solana wallet for seamless transactions and verification"
        },
        {
            icon: <FaCoins className="text-3xl" />,
            title: "Stake $ATH",
            description: "Stake your $ATH tokens to unlock tier benefits and IDO allocations"
        },
        {
            icon: <FaRocket className="text-3xl" />,
            title: "Launch with Us",
            description: "Participate in exclusive Solana token launches with your verified status"
        }
    ];

    return (
        <div className="flex min-w-full items-center justify-center font-orbitron text-white p-[40px_20px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
            <motion.div
                className="flex flex-col lg:flex-row w-full max-w-7xl gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div
                    className="flex-1 space-y-8"
                    variants={itemVariants}
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2 relative">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, 0, -5, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -left-8 -top-5"
                            >
                                <SiSolana className="text-cosmic text-4xl" />
                            </motion.div>
                            <h2 className="text-[32px] lg:text-[42px] font-[600] leading-tight sci-fi-text-glow">
                                Start Your Solana Journey <br />
                                <span className="text-cosmic">In 4 Simple Steps</span>
                            </h2>
                        </div>
                        <p className="text-[16px] lg:text-[18px] text-gray-300 max-w-[500px] font-space">
                            Join the future of Solana with Aethereon's streamlined launchpad process
                        </p>
                    </div>

                    <motion.button
                        onClick={() => navigate("/lock-stake")}
                        className="relative px-8 py-3 text-white font-[500] overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                        <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                        <span className="relative flex items-center">
                            Begin Your Mission <motion.span
                                className="ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >→</motion.span>
                        </span>
                    </motion.button>
                </motion.div>

                <div className="flex-1 grid md:grid-cols-2 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative col-span-1 p-6 overflow-hidden group hover:cursor-pointer sci-fi-panel rounded-lg border border-cosmic/20"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 0 15px rgba(108, 92, 231, 0.3)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="relative flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <motion.div
                                        className="text-cosmic"
                                        variants={iconVariants}
                                        whileHover="hover"
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <div className="text-cosmic text-2xl font-bold">0{index + 1}</div>
                                </div>

                                <div>
                                    <p className="text-[20px] font-[500] mb-2 sci-fi-text-glow">{step.title}</p>
                                    <p className="text-[14px] text-gray-300 leading-relaxed font-space">{step.description}</p>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default HowTo