import { Link } from 'react-router-dom';
import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { motion } from 'framer-motion';
import { SiSolana } from "react-icons/si";

export default function Navbar() {
    const { authenticated, login, logout } = usePrivy();

    const navItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        hover: {
            scale: 1.05,
            color: "#6c5ce7",
            transition: { duration: 0.2 }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            boxShadow: "0 0 15px rgba(108, 92, 231, 0.7)",
            transition: { duration: 0.2, yoyo: Infinity }
        },
        tap: { scale: 0.95 }
    };

    return (
        <nav className="bg-deepspace/50 border-b border-cosmic/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="flex items-center">
                            <img src="/aethereon-logo-sm.svg" alt="Aethereon" className="h-8" />
                        </Link>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <motion.div variants={navItemVariants} initial="hidden" animate="visible" whileHover="hover">
                            <Link to="/launchpad" className="text-gray-300 hover:text-cosmic transition-colors font-orbitron">
                                Launchpad
                            </Link>
                        </motion.div>
                        <motion.div variants={navItemVariants} initial="hidden" animate="visible" whileHover="hover">
                            <Link to="/giveaway" className="text-gray-300 hover:text-cosmic transition-colors font-orbitron">
                                Airdrops
                            </Link>
                        </motion.div>
                        <motion.div variants={navItemVariants} initial="hidden" animate="visible" whileHover="hover">
                            <Link to="/staking-pool" className="text-gray-300 hover:text-cosmic transition-colors font-orbitron">
                                Staking
                            </Link>
                        </motion.div>
                        <motion.div variants={navItemVariants} initial="hidden" animate="visible" whileHover="hover">
                            <Link to="/governance" className="text-gray-300 hover:text-cosmic transition-colors font-orbitron">
                                Governance
                            </Link>
                        </motion.div>
                        <motion.div variants={navItemVariants} initial="hidden" animate="visible" whileHover="hover">
                            <Link to="/dashboard" className="text-gray-300 hover:text-cosmic transition-colors font-orbitron">
                                Dashboard
                            </Link>
                        </motion.div>
                    </div>

                    {/* Wallet Connection */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {authenticated ? (
                            <motion.button
                                onClick={() => logout()}
                                className="bg-cosmic/90 hover:bg-cosmic px-4 py-2 clip-path-polygon text-white font-medium flex items-center space-x-2 transition-all duration-200"
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <IoWalletSharp className="w-5 h-5" />
                                <span className="font-orbitron">Disconnect</span>
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={() => login()}
                                className="bg-cosmic/90 hover:bg-cosmic px-4 py-2 clip-path-polygon text-white font-medium flex items-center space-x-2 transition-all duration-200"
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <SiSolana className="w-5 h-5 mr-2" />
                                <span className="font-orbitron">Connect Solana Wallet</span>
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </div>
        </nav>
    );
}