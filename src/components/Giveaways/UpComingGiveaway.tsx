import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GiveawayCardCompleted from "./StatusCard/";
import { useGiveaway } from "../../hooks/web3/useGiveaway";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";
import { motion } from "framer-motion";
import { FaGift, FaExclamationCircle, FaExternalLinkAlt } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function UpComingGiveaways() {
    const { data, error, loading } = useGiveaway(null, { polling: false });
    const [filteredGiveaways, setFilteredGiveaways] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const currentTime = Date.now();
            const filtered = data.filter((giveaway: any) => {
                const endTime = (Number(giveaway.whitelistEndTime)) * 1000;
                return isBefore(currentTime, endTime);
            });
            setFilteredGiveaways(filtered);
        }
    }, [data]);

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Preloader
                        use={ThreeDots}
                        size={60}
                        strokeWidth={6}
                        strokeColor="#6c5ce7"
                        duration={2000}
                    />
                </motion.div>
            </div>
        );
    }

    if (error.message) {
        console.error("Upcoming Giveaway Error:", error.message);
        return (
            <motion.div
                className="flex flex-col items-center justify-center space-y-4 p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FaExclamationCircle className="text-6xl text-red-500" />
                <h3 className="text-red-500 text-xl font-medium font-orbitron">Oops! Something went wrong</h3>
                <p className="text-gray-400 max-w-md font-space">
                    We're having trouble loading the upcoming airdrops. Please try refreshing the page or check back later.
                </p>
                <motion.button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 rounded-lg bg-cosmic hover:bg-cosmic/80 text-white transition-colors font-orbitron"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Refresh Page
                </motion.button>
            </motion.div>
        )
    }

    return (
        <div className="font-orbitron flex flex-col p-[60px_20px] lg:p-[60px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

            {/* Decorative grid line */}
            <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
            <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

            <motion.div
                className="flex flex-col items-center text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-3 mb-4">
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
                        className="relative"
                    >
                        <FaGift className="text-cosmic text-4xl" />
                        <motion.div
                            className="absolute inset-0 bg-cosmic rounded-full blur-md -z-10"
                            animate={{
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        ></motion.div>
                    </motion.div>
                    <h1 className="text-[32px] lg:text-[48px] font-bold sci-fi-text-glow text-cosmic">
                        Solana Airdrops
                    </h1>
                </div>

                <motion.div
                    className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100px", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                ></motion.div>

                <motion.p
                    className="text-[16px] lg:text-[18px] text-gray-300 max-w-2xl mx-auto font-space"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    Discover and participate in exclusive Solana token airdrops. Claim free tokens from promising projects in the Solana ecosystem.
                </motion.p>
            </motion.div>

            <motion.div
                className="w-full mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <div className="grid gap-[40px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[40px]">
                    {filteredGiveaways.length > 0 ? (
                        filteredGiveaways.map((giveaway: any, index: number) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 0 20px rgba(108, 92, 231, 0.3)",
                                    transition: { duration: 0.3 }
                                }}
                                className="sci-fi-border"
                            >
                                <GiveawayCardCompleted giveaway={giveaway} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full text-center p-12 sci-fi-panel rounded-lg"
                            variants={itemVariants}
                        >
                            <SiSolana className="text-6xl text-cosmic mx-auto mb-4" />
                            <h3 className="text-2xl font-medium sci-fi-text-glow mt-4">No Upcoming Airdrops</h3>
                            <p className="text-gray-300 mt-4 max-w-md mx-auto font-space">
                                There are no upcoming Solana airdrops at the moment. Please check back later for new opportunities or subscribe to our newsletter to get notified.
                            </p>

                            <motion.div
                                className="mt-8 flex justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/subscribe"
                                    className="relative text-white px-8 py-3 overflow-hidden inline-flex items-center"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                                    <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                                    <motion.span
                                        className="relative flex items-center"
                                        whileHover={{
                                            textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                                        }}
                                    >
                                        <SiSolana className="mr-2" /> Get Notified <FaExternalLinkAlt className="ml-2 text-sm" />
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {filteredGiveaways.length > 0 && (
                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/explore"
                        className="relative text-white px-8 py-3 overflow-hidden inline-flex items-center"
                    >
                        <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                        <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                        <motion.span
                            className="relative flex items-center"
                            whileHover={{
                                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                            }}
                        >
                            <SiSolana className="mr-2" /> View All Airdrops <FaExternalLinkAlt className="ml-2 text-sm" />
                        </motion.span>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}

export default UpComingGiveaways;
