import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy, FaSearch, FaCoins, FaRocket, FaChartLine } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import toast from 'react-hot-toast';
import { noOfDays } from "../../utils/tools";
import { getAllStakingPoolData } from "../../utils/web3/actions";

function Pools() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<{ message: string }>({ message: "" });
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const stakingPools = await getAllStakingPoolData();
      setData(stakingPools);
    } catch (error) {
      console.error(error);
      setError((prevError) => ({ ...prevError, message: "Failed to load staking pools" }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied staking pool address!');
      })
      .catch(() => {
        toast.error('Failed to copy address');
      });
  };

  // Filter staking pools based on search term
  const filteredPools = data.filter((pool: any) =>
    pool.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotate: 360,
              boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="p-4 rounded-full bg-deepspace border border-cosmic/30"
          >
            <SiSolana className="text-4xl text-cosmic" />
          </motion.div>
          <p className="text-cosmic mt-4 text-center font-orbitron">Loading Staking Pools...</p>
        </motion.div>
      </div>
    );
  }

  if (error.message) {
    return (
      <motion.div
        className="text-red-400 text-center p-10 bg-deepspace/50 rounded-lg border border-red-500/30 max-w-2xl mx-auto my-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaRocket className="text-4xl text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 font-orbitron">Error Loading Staking Pools</h3>
        <p className="font-space">{error.message}</p>
        <motion.button
          className="mt-4 px-4 py-2 bg-cosmic/20 hover:bg-cosmic/30 border border-cosmic/50 rounded-lg text-white transition-colors"
          onClick={() => loadData()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="font-orbitron p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
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
            >
              <FaCoins className="text-cosmic text-4xl" />
            </motion.div>
            <h2 className="text-[28px] lg:text-[42px] font-bold text-white sci-fi-text-glow">
              Solana Staking Pools
            </h2>
          </div>

          {/* Search Input */}
          <motion.div
            className="relative max-w-md w-full"
            variants={itemVariants}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-cosmic" />
            </div>
            <input
              type="text"
              placeholder="Search by Contract Address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-deepspace/50 border border-cosmic/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cosmic transition-colors"
            />
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-[20px] flex items-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setTab(0)}
            className={`${tab === 0 ? "bg-cosmic" : "bg-transparent border border-cosmic/30"
              } rounded-lg text-[14px] lg:text-[16px] text-white px-6 py-2 transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <SiSolana /> Standard Pool
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full mt-[30px] sci-fi-panel rounded-lg p-4 border border-cosmic/20"
          variants={itemVariants}
        >
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-white">
              <thead className="text-[14px] lg:text-[16px] text-white bg-deepspace/50 border-b border-cosmic/20">
                <tr>
                  <th scope="col" className="px-6 py-4 min-w-[210px] font-bold">
                    <span className="flex items-center gap-2">
                      <SiSolana className="text-cosmic" /> Staking Pool
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 min-w-[210px] font-bold">
                    <span className="flex items-center gap-2">
                      <FaChartLine className="text-cosmic" /> APY
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 min-w-[210px] font-bold">
                    Reward Intervals
                  </th>
                  <th scope="col" className="px-6 py-4 min-w-[210px] font-bold">
                    Next Reward
                  </th>
                  <th scope="col" className="px-6 py-4 min-w-[210px] font-bold">
                    Token Fees
                  </th>
                  <th scope="col" className="px-6 py-4 min-w-[210px] font-bold">
                    Reward Token
                  </th>
                  <th className="px-6 py-4 font-bold">Total Staked</th>
                  <th className="px-6 py-4 font-bold">Available Rewards</th>
                </tr>
              </thead>
              <tbody className="mt-[20px]">
                <AnimatePresence>
                  {filteredPools.length > 0 ? (
                    filteredPools.map((item: any, index: number) => (
                      <motion.tr
                        className={`${hoveredRow === item.id ? "bg-cosmic/10" : index % 2 === 0 ? "bg-deepspace/30" : "bg-transparent"
                          } cursor-pointer transition-colors border-b border-cosmic/10`}
                        key={item.id}
                        onClick={() => navigate(`/staking-pool/${item.id}`)}
                        onMouseEnter={() => setHoveredRow(item.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap text-white"
                        >
                          <span className="flex items-center gap-x-3">
                            <span className="truncate max-w-[100px] font-mono">{item.id}</span>
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaRegCopy
                                color="#6c5ce7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(item.id);
                                }}
                                className="cursor-pointer hover:text-cosmic transition-colors"
                              />
                            </motion.div>
                          </span>
                        </th>
                        <td className="px-6 py-4 min-w-fit">
                          <motion.span
                            className="font-bold text-cosmic"
                            animate={hoveredRow === item.id ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {item.apyRate}% APY
                          </motion.span>
                        </td>
                        <td className="px-6 py-4 min-w-fit font-space">
                          {`${noOfDays(item.withdrawalIntervals)} Days`}
                        </td>
                        <td className="px-6 py-4 min-w-fit font-space">Recurring Rewards</td>
                        <td className="px-6 py-4 min-w-fit font-space">
                          <div>
                            Entry Fee: <span className="text-cosmic">{item.stakeFeePercentage}%</span> | <br />
                            Exit Fee: <span className="text-cosmic">{item.withdrawalFeePercentage}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 min-w-fit font-space">
                          <div>
                            Stake Token: <span className="text-cosmic">{item.stakeToken.symbol}</span> | <br />
                            Reward Token: <span className="text-cosmic">{item.rewardToken.symbol}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 min-w-fit font-space">
                          <span className="font-bold">{item.totalStaked}</span> {item.stakeToken.symbol}
                        </td>
                        <td className="px-6 py-4 min-w-fit font-space">
                          <span className="font-bold">{Number(item.totalRewardable).toFixed(0)}</span> {item.rewardToken.symbol}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <SiSolana className="text-4xl text-cosmic/50 mb-4" />
                          <p className="text-gray-400 font-space">No staking pools found matching your search</p>
                          {searchTerm && (
                            <motion.button
                              onClick={() => setSearchTerm("")}
                              className="mt-4 text-cosmic hover:underline"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Clear search
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Decorative corner accent */}
        <div className="absolute top-[120px] right-[40px] w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
        <div className="absolute bottom-[120px] left-[40px] w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
      </motion.div>
    </div>
  );
}

export default Pools;
