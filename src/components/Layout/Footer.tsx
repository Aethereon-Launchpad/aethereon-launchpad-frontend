import { Link } from "react-router-dom";
import { FaRocket, FaStar, FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
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

    return (
        <footer className="relative overflow-hidden bg-deepspace/95 border-t border-cosmic/20">
            {/* Cosmic effects */}
            <div className="absolute inset-0">
                <div className="h-[400px] w-[400px] absolute -bottom-1/2 -left-1/2 blur-[100px] bg-cosmic/20"></div>
                <div className="h-[500px] w-[500px] absolute -bottom-1/2 -right-1/2 blur-[100px] bg-purple-400/20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-12">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* About Section */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
                            About DerHex
                        </h3>
                        <p className="text-gray-300 text-sm font-space">
                            DerHex is a decentralized platform offering token launches, staking, and governance solutions.
                        </p>
                        <div className="mt-6">
                            <FaRocket className="text-3xl text-cosmic animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-gray-300 font-space">
                            {[
                                { name: "Launchpad", to: "/launchpad" },
                                { name: "Staking", to: "/staking-pool" },
                                { name: "Governance", to: "/governance" },
                                { name: "Dashboard", to: "/dashboard" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="hover:text-cosmic transition-colors flex items-center space-x-2"
                                    >
                                        <FaStar className="text-xs text-cosmic" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Community */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
                            Community
                        </h3>
                        <ul className="space-y-2 text-gray-300 font-space">
                            {[
                                { icon: FaTwitter, name: "Twitter", href: "https://twitter.com/derhex" },
                                { icon: FaTelegram, name: "Telegram", href: "https://t.me/derhex" },
                                { icon: FaDiscord, name: "Discord", href: "https://discord.gg/derhex" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-cosmic transition-colors flex items-center space-x-2"
                                    >
                                        <link.icon className="text-cosmic" />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-gray-300 font-space">
                            {[
                                { name: "Privacy Policy", to: "/privacy-policy" },
                                { name: "Terms of Service", to: "/terms-of-service" },
                                { name: "Cookies Policy", to: "/cookies-policy" },
                                { name: "Disclaimer", to: "/disclaimer" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="hover:text-cosmic transition-colors flex items-center space-x-2"
                                    >
                                        <FaStar className="text-xs text-cosmic" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    className="mt-8 pt-8 border-t border-cosmic/20 text-center text-gray-400 font-space"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="sci-fi-text-glow">
                        &copy; {new Date().getFullYear()} DerHex. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
} 