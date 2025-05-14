import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBond } from '../../hooks/web3/useBond';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useChain } from '../../context/ChainContext';
import { CHAIN_ID } from '../../utils/source';
import { differenceInDays, format } from 'date-fns';
import { motion } from 'framer-motion';
import { FaRocket, FaExternalLinkAlt, FaDiscord, FaTelegram, FaTwitter, FaGlobe } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation } from 'react-icons/gi';

function FeaturedBonds() {
    const { selectedChain } = useChain();
    const { data, loading, error, refetch } = useBond(null, { polling: false });
    const [featuredBond, setFeaturedBond] = useState<any>(null);
    const navigate = useNavigate();

    // Log the current chain when the component renders
    useEffect(() => {
        console.log(`FeaturedBonds: Rendering with chain ${selectedChain} (Global: ${CHAIN_ID})`);

        // Force a refetch when the chain changes
        console.log(`FeaturedBonds: Chain changed, refetching data...`);
        refetch();
    }, [selectedChain, CHAIN_ID, refetch]);

    // Select the most recent upcoming bond as the featured bond
    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            try {
                // Sort bonds by start time, most recent first
                const sortedBonds = [...data].sort((a, b) => b.saleStartTime - a.saleStartTime);

                // Find the first bond that has metadata and take it as featured
                const featured = sortedBonds.find(bond => {
                    return bond && bond.bondInfo && bond.metadataURI &&
                        bond.initialDiscountPercentage !== undefined &&
                        bond.finalDiscountPercentage !== undefined;
                });

                if (featured) {
                    console.log('Found featured bond:', featured.bondInfo?.projectName);
                    setFeaturedBond(featured);
                } else {
                    console.log('No suitable bond found for featuring');
                    setFeaturedBond(null);
                }
            } catch (error) {
                console.error('Error processing bond data:', error);
                setFeaturedBond(null);
            }
        } else {
            console.log('No bond data available');
            setFeaturedBond(null);
        }
    }, [data]);

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
                    Loading Featured Bond
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

    if (error.message || !featuredBond) {
        return null; // Don't show the featured section if there's an error or no featured bond
    }

    return (
        <div className='text-white p-[40px_20px] lg:p-[40px] font-space'>
            <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <SiSolana className="text-cosmic text-3xl" />
                </motion.div>
                <motion.h2
                    className="text-3xl font-bold font-orbitron"
                    animate={{ textShadow: ['0 0 0px rgba(108, 92, 231, 0)', '0 0 8px rgba(108, 92, 231, 0.3)', '0 0 0px rgba(108, 92, 231, 0)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    Featured <span className="text-cosmic">Bond</span>
                </motion.h2>
            </motion.div>

            <motion.div
                className='relative w-full overflow-hidden rounded-lg bg-deepspace/30 border border-cosmic/20'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ boxShadow: "0 0 20px rgba(108, 92, 231, 0.3)" }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

                <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
                    <motion.div
                        className='w-full min-h-full relative'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.div
                            className="bg-black bg-opacity-50 flex flex-col items-center justify-center p-10 h-full relative overflow-hidden"
                            style={
                                featuredBond?.bondInfo?.images?.bg ? {
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${featuredBond?.bondInfo?.images?.bg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: "100%",
                                    minHeight: "350px"
                                } : {
                                    height: "100%",
                                    minHeight: "350px"
                                }
                            }
                        >
                            {/* Animated background particles */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute text-cosmic/20"
                                        style={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            fontSize: `${Math.random() * 20 + 10}px`
                                        }}
                                        animate={{
                                            opacity: [0.1, 0.5, 0.1],
                                            scale: [1, 1.2, 1],
                                            y: [0, -20, 0],
                                            x: [0, 10, 0]
                                        }}
                                        transition={{
                                            duration: Math.random() * 5 + 3,
                                            repeat: Infinity,
                                            delay: Math.random() * 2
                                        }}
                                    >
                                        <GiStarFormation />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="max-w-[600px] z-10 relative">
                                <motion.div
                                    className="bg-cosmic/10 rounded-full p-2 w-24 h-24 mb-6 mx-auto relative overflow-hidden"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 92, 231, 0.6)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-cosmic/20 rounded-full"
                                        animate={{
                                            boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.6)', '0 0 0px rgba(108, 92, 231, 0.3)']
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.img
                                        src={featuredBond?.bondInfo?.images?.logo}
                                        alt={featuredBond?.bondInfo?.projectName}
                                        className="w-full h-full rounded-full object-cover"
                                        whileHover={{ rotate: 10 }}
                                    />
                                </motion.div>

                                <motion.h2
                                    className="text-4xl font-bold font-orbitron mb-4 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    {featuredBond?.bondInfo?.projectName}
                                </motion.h2>

                                <motion.p
                                    className="text-gray-200 text-lg leading-relaxed text-center font-space"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    {featuredBond?.bondInfo?.description}
                                </motion.p>

                                <motion.div
                                    className="flex justify-center gap-4 mt-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    {featuredBond?.bondInfo?.website && (
                                        <motion.a
                                            href={featuredBond.bondInfo.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cosmic hover:text-cosmic/80 transition-all"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaGlobe className="w-6 h-6" />
                                        </motion.a>
                                    )}
                                    {featuredBond?.bondInfo?.socials?.twitter && (
                                        <motion.a
                                            href={featuredBond.bondInfo.socials.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cosmic hover:text-cosmic/80 transition-all"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaTwitter className="w-6 h-6" />
                                        </motion.a>
                                    )}
                                    {featuredBond?.bondInfo?.socials?.telegram && (
                                        <motion.a
                                            href={featuredBond.bondInfo.socials.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cosmic hover:text-cosmic/80 transition-all"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaTelegram className="w-6 h-6" />
                                        </motion.a>
                                    )}
                                    {featuredBond?.bondInfo?.socials?.discord && (
                                        <motion.a
                                            href={featuredBond.bondInfo.socials.discord}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cosmic hover:text-cosmic/80 transition-all"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaDiscord className="w-6 h-6" />
                                        </motion.a>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className='w-full p-8 bg-deepspace/60 flex flex-col justify-center'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.div
                            className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20 space-y-5"
                            whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                        >
                            <div className="space-y-2">
                                <h3 className="text-lg text-skyblue font-orbitron">Project Details</h3>
                                <p className="text-white/80 font-space text-sm line-clamp-2">{featuredBond?.bondInfo?.description}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <p className="text-gray-400 font-space text-sm">Discount Rate</p>
                                        <p className="text-white font-orbitron text-sm">{(featuredBond.initialDiscountPercentage).toFixed()}% to {(featuredBond.finalDiscountPercentage).toFixed()}%</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <p className="text-gray-400 font-space text-sm">Vesting Duration</p>
                                        <p className="text-white font-orbitron text-sm">
                                            {featuredBond.linearVestingEndTime && featuredBond.linearVestingEndTime > 0 ? (
                                                differenceInDays(new Date(featuredBond.linearVestingEndTime * 1000), new Date(featuredBond.withdrawTime * 1000))
                                            ) : (
                                                0
                                            )} days
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <p className="text-gray-400 font-space text-sm">Start-End Time</p>
                                        <p className="text-white font-orbitron text-sm">
                                            {format(new Date(featuredBond.saleStartTime * 1000), "dd MMM")} - {format(new Date(featuredBond.saleEndTime * 1000), "dd MMM")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[45px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md mt-4"
                                whileHover={{
                                    boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
                                    y: -1
                                }}
                                whileTap={{ y: 1 }}
                                onClick={() => navigate(`/deals/bonds/${featuredBond?.bondInfo?.projectName.toLowerCase()}`)}
                            >
                                <FaRocket className="text-white" />
                                <span>View Bond Details</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default FeaturedBonds;