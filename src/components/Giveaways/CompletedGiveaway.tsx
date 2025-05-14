/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GiveawayCardCompleted from "./StatusCard";
import { useGiveaway } from "../../hooks/web3/useGiveaway";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";
import CurrentChain from "../Presale/CurrentChain";
import { useChain } from "../../context/ChainContext";
import { motion } from 'framer-motion';
import { FaSearch, FaRocket, FaGift } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation } from 'react-icons/gi';

function CompletedGiveaways() {
    const { data, error, loading } = useGiveaway();
    const [filteredGiveaways, setFilteredGiveaways] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate();
    const { selectedChain } = useChain();

    useEffect(() => {
        if (data) {
            const currentTime = Date.now();
            const filtered = data.filter((giveaway: any) => {
                const endTime = Number(giveaway.whitelistEndTime) * 1000;
                return !isBefore(currentTime, endTime);
            }).filter((giveaway: any) =>
                giveaway.giveawayInfo?.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                giveaway.airdropToken?.symbol.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredGiveaways(filtered);
            setCurrentPage(1); // Reset to first page when search changes
        }
    }, [data, searchTerm]);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredGiveaways.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredGiveaways.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const PaginationButton = ({ page, isActive }: { page: number, isActive: boolean }) => (
        <motion.button
            onClick={() => paginate(page)}
            className={`px-4 py-2 mx-1 rounded-md font-orbitron text-sm ${isActive
                ? 'bg-cosmic text-white'
                : 'bg-deepspace/50 text-white/70 border border-cosmic/20 hover:border-cosmic/50'
                }`}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(108, 92, 231, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: page * 0.05 }}
        >
            {page}
        </motion.button>
    );

    const Pagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            // Show first page, last page, current page, and one page before and after current
            if (
                i === 1 ||
                i === totalPages ||
                i === currentPage ||
                i === currentPage - 1 ||
                i === currentPage + 1
            ) {
                pages.push(
                    <PaginationButton
                        key={i}
                        page={i}
                        isActive={currentPage === i}
                    />
                );
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                pages.push(
                    <motion.span
                        key={i}
                        className="px-2 text-cosmic/70 font-orbitron"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        ...
                    </motion.span>
                );
            }
        }
        return (
            <div className="flex items-center justify-center mt-8 space-x-2">
                <motion.button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white font-orbitron bg-deepspace/50 rounded-md border border-cosmic/20 hover:border-cosmic/50 disabled:opacity-50 disabled:hover:border-cosmic/20 flex items-center gap-2"
                    whileHover={{
                        scale: currentPage === 1 ? 1 : 1.05,
                        boxShadow: currentPage === 1 ? "none" : "0 0 10px rgba(108, 92, 231, 0.3)"
                    }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.span
                        animate={{ x: currentPage === 1 ? 0 : [-3, 0, -3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        ←
                    </motion.span>
                    <span>Previous</span>
                </motion.button>

                <div className="flex">
                    {pages}
                </div>

                <motion.button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white font-orbitron bg-deepspace/50 rounded-md border border-cosmic/20 hover:border-cosmic/50 disabled:opacity-50 disabled:hover:border-cosmic/20 flex items-center gap-2"
                    whileHover={{
                        scale: currentPage === totalPages ? 1 : 1.05,
                        boxShadow: currentPage === totalPages ? "none" : "0 0 10px rgba(108, 92, 231, 0.3)"
                    }}
                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span>Next</span>
                    <motion.span
                        animate={{ x: currentPage === totalPages ? 0 : [3, 0, 3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        →
                    </motion.span>
                </motion.button>
            </div>
        );
    };

    if (loading) {
        return (
            <motion.div
                className="flex flex-col justify-center items-center h-[400px] bg-deepspace/30 border border-cosmic/20 rounded-lg p-8 relative"
                animate={{
                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
                    borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mb-6"
                >
                    <SiSolana className="text-5xl text-cosmic" />
                </motion.div>

                <motion.h3
                    className="text-xl font-orbitron text-white mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Loading Airdrops
                </motion.h3>

                <motion.div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-cosmic"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>

                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
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
            </motion.div>
        );
    }

    if (error.message) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center space-y-6 p-8 text-center bg-deepspace/30 border border-red-500/30 rounded-lg relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-red-500/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-red-500/50 rounded-bl-lg"></div>

                <motion.div
                    animate={{
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-red-500 text-5xl"
                >
                    <FaRocket />
                </motion.div>

                <div className="space-y-2">
                    <motion.h3
                        className="text-2xl font-orbitron text-white"
                        animate={{ textShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.5)', '0 0 0px rgba(255, 255, 255, 0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Houston, We Have a Problem
                    </motion.h3>

                    <p className="text-white/80 font-space">
                        {error.message || "Failed to load giveaways. Please try again later."}
                    </p>
                </div>

                <motion.button
                    className="bg-gradient-to-r from-cosmic/80 to-cosmic px-6 py-3 rounded-md text-white font-orbitron flex items-center gap-2"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                >
                    <FaRocket className="text-white" />
                    <span>Retry Launch</span>
                </motion.button>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="font-space flex flex-col p-[40px_20px] lg:p-[40px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col items-start text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <SiSolana className="text-cosmic text-2xl" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="bg-cosmic/20 px-3 py-1 rounded-md"
                    >
                        <span className="font-orbitron text-sm">SOLANA ECOSYSTEM</span>
                    </motion.div>
                </div>

                <motion.h1
                    className="text-[32px] lg:text-[56px] font-bold leading-[36px] lg:leading-[60px] font-orbitron"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Past <span className="text-cosmic">Airdrops</span>
                </motion.h1>

                <motion.p
                    className="text-white/80 mt-2 font-space"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Explore completed airdrops and see what you might have missed
                </motion.p>
            </motion.div>

            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div className="relative">
                    <motion.input
                        type="text"
                        placeholder="Search Project"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-[300px] px-4 py-3 bg-deepspace/50 text-white border border-cosmic/30 rounded-lg focus:outline-none focus:border-cosmic focus:ring-1 focus:ring-cosmic/50 font-space"
                        whileFocus={{ boxShadow: "0 0 0 2px rgba(108, 92, 231, 0.2)" }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    />
                    <motion.div
                        className="absolute right-3 top-3 text-cosmic"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaSearch size={18} />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="w-full bg-deepspace/30 border border-cosmic/20 rounded-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(108, 92, 231, 0.4)" }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-cosmic/20">
                                <th className="p-4 text-skyblue font-orbitron">Project</th>
                                <th className="p-4 text-skyblue font-orbitron">Total Reward</th>
                                <th className="p-4 text-skyblue font-orbitron">Vesting Duration</th>
                                <th className="p-4 text-skyblue font-orbitron">Ended</th>
                                <th className="p-4 text-skyblue font-orbitron">Chain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((giveaway: any, index: number) => (
                                    <motion.tr
                                        key={index}
                                        onClick={() => navigate(`/deals/giveaways/${giveaway?.giveawayInfo?.projectName.toLowerCase()}`)}
                                        className="border-b border-cosmic/10 hover:bg-cosmic/5 transition-colors cursor-pointer"
                                        whileHover={{ backgroundColor: "rgba(108, 92, 231, 0.05)" }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <motion.div
                                                    className="w-10 h-10 rounded-full overflow-hidden border border-cosmic/30 bg-deepspace/50 flex items-center justify-center"
                                                    whileHover={{ scale: 1.1, borderColor: "rgba(108, 92, 231, 0.8)" }}
                                                >
                                                    <img
                                                        src={giveaway.giveawayInfo?.images?.logo}
                                                        alt={giveaway.giveawayInfo?.projectName}
                                                        className="w-8 h-8 object-contain"
                                                    />
                                                </motion.div>
                                                <div>
                                                    <motion.p
                                                        className="font-medium text-white font-orbitron"
                                                        whileHover={{ color: "rgba(108, 92, 231, 1)" }}
                                                    >
                                                        {giveaway.giveawayInfo?.projectName}
                                                    </motion.p>
                                                    <p className="text-sm text-white/60 font-space">
                                                        {giveaway.airdropToken?.symbol}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-white font-orbitron">
                                                {giveaway.giveawayInfo?.totalReward.toLocaleString()}
                                            </span>
                                            <span className="text-cosmic ml-1 font-space">
                                                {giveaway.airdropToken?.symbol}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white/80 font-space">
                                            {giveaway.linearVestingEndTime && giveaway.linearVestingEndTime > 0
                                                ? (
                                                    <motion.div
                                                        className="flex items-center gap-1"
                                                        whileHover={{ x: 3 }}
                                                    >
                                                        <span>{Math.floor((giveaway.linearVestingEndTime - giveaway.startTime) / 86400)}</span>
                                                        <span>days</span>
                                                    </motion.div>
                                                )
                                                : (
                                                    <motion.span
                                                        className="bg-cosmic/20 px-2 py-1 rounded text-xs"
                                                        whileHover={{ backgroundColor: "rgba(108, 92, 231, 0.3)" }}
                                                    >
                                                        No vesting
                                                    </motion.span>
                                                )
                                            }
                                        </td>
                                        <td className="p-4 text-white font-orbitron">
                                            {new Date(giveaway.whitelistEndTime * 1000).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="p-4">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="inline-block"
                                            >
                                                <CurrentChain chainId={giveaway.chainId || selectedChain} />
                                            </motion.div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <td colSpan={5} className="text-center p-12">
                                        <motion.div
                                            className="flex flex-col items-center justify-center space-y-4"
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, 0, -10, 0],
                                                    y: [0, -5, 0]
                                                }}
                                                transition={{ duration: 5, repeat: Infinity }}
                                                className="text-cosmic text-5xl"
                                            >
                                                <FaGift />
                                            </motion.div>
                                            <p className="text-white/80 font-space">
                                                No completed airdrops at the moment
                                            </p>
                                            <motion.p
                                                className="text-cosmic font-orbitron text-sm"
                                                animate={{ opacity: [0.7, 1, 0.7] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                Check back soon for new opportunities
                                            </motion.p>
                                        </motion.div>
                                    </td>
                                </motion.tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {filteredGiveaways.length > itemsPerPage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Pagination />
                </motion.div>
            )}
        </motion.div>
    );
}

export default CompletedGiveaways;
