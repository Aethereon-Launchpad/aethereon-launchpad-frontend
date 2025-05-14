/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { toast } from 'react-hot-toast';
import { getParticipatedStakingPool, getAllStakingPoolData } from "../../utils/web3/actions";
import { noOfDays } from "../../utils/tools";
import { FaRegCopy, FaSearch, FaRocket, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { GiStarFormation } from "react-icons/gi";

function JoinedPool() {
  const { user } = usePrivy();
  const [stakingPools, setStakingPools] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

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
  const filteredPools = stakingPools.filter((pool: any) =>
    pool.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function loadData() {
      if (!user?.wallet?.address) {
        console.log("No Wallet Address")
        return;
      }

      try {
        const allPools = await getAllStakingPoolData();
        const participatingPools = await getParticipatedStakingPool(allPools, user.wallet.address as `0x${string}`)
        console.log(participatingPools)
        setStakingPools(participatingPools);
      } catch (error) {
        console.error(error)
        toast('Failed to retreive data... Please try again later')
      } finally {
        setLoading(false)
      }

    }

    loadData()

  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-deepspace/50 p-8 rounded-lg border border-cosmic/30 flex flex-col items-center"
        >
          <SiSolana className="text-cosmic text-3xl mb-4" />
          <Preloader
            use={ThreeDots}
            size={60}
            strokeWidth={6}
            strokeColor="#6c5ce7"
            duration={2000}
          />
          <p className="text-cosmic mt-4 font-orbitron">Loading Staking Pools...</p>
        </motion.div>
      </div>
    );
  }



  return (
    <div className="p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.h2
              className="text-[28px] lg:text-[40px] font-bold font-orbitron sci-fi-text-glow leading-[35px] lg:leading-[45px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your Active Staking Pools
            </motion.h2>

            <motion.div
              className="w-[100px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>

            <motion.p
              className="text-gray-300 font-space"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              View all Solana staking pools you've joined in the Aethereon ecosystem
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mt-[20px] lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <input
              type="text"
              className="px-4 py-3 text-white border border-cosmic/30 bg-deepspace/50 w-full lg:w-[250px] rounded-lg font-space pl-10"
              placeholder="Search pools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic" />
          </motion.div>
        </div>

        {filteredPools.length === 0 ? (
          <motion.div
            className="sci-fi-panel border border-cosmic/30 p-8 rounded-lg relative h-[200px] flex items-center justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

            <motion.div
              className="flex flex-col items-center justify-center space-y-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="bg-cosmic/20 p-4 rounded-full"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SiSolana className="text-3xl text-cosmic" />
              </motion.div>
              <p className="text-gray-300 font-space text-center">You haven't joined any staking pools yet in the Aethereon ecosystem</p>
              <motion.button
                className="relative px-6 py-2 text-white font-medium overflow-hidden mt-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/staking')}
              >
                <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                <motion.span
                  className="relative flex items-center gap-2 font-orbitron"
                  whileHover={{
                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                  }}
                >
                  <span>Explore Staking Pools</span>
                  <FaArrowRight className="text-skyblue" />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative overflow-x-auto sci-fi-panel border border-cosmic/30 p-4 rounded-lg">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

              <table className="w-full text-sm text-left rtl:text-right text-white">
                <thead className="text-[12px] lg:text-[16px] text-cosmic font-orbitron bg-deepspace/30 rounded-lg">
                  <tr>
                    <th scope="col" className="px-6 py-4 min-w-[210px] rounded-tl-lg">
                      Staking Pool
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px]">
                      APY
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px]">
                      Reward Period
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px]">
                      Next Reward
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px]">
                      Token Fees
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px]">
                      Reward Token
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px]">
                      Available Rewards
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[210px] rounded-tr-lg">
                      Total Staked
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-[20px] font-space">
                  {filteredPools.map((item: any, index: number) => (
                    <motion.tr
                      className={`${index % 2 === 0 ? "bg-deepspace/20" : "bg-transparent"} cursor-pointer border-b border-cosmic/10 hover:bg-cosmic/10 transition-colors`}
                      key={item.id}
                      onClick={() => navigate(`/staking-pool/${item.id}`)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-white"
                      >
                        <span className="flex items-center gap-x-3">
                          <SiSolana className="text-cosmic" />
                          <span className="truncate max-w-[100px]">{item.id}</span>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaRegCopy
                              className="text-cosmic cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(item.id);
                              }}
                            />
                          </motion.div>
                        </span>
                      </th>
                      <td className="px-6 py-4 min-w-fit">
                        <span className="text-cosmic font-bold">{item.apyRate}%</span> APY
                      </td>
                      <td className="px-6 py-4 min-w-fit">
                        {`${noOfDays(item.withdrawalIntervals)} Days`}
                      </td>
                      <td className="px-6 py-4 min-w-fit">
                        <span className="bg-cosmic/10 px-3 py-1 rounded-full text-cosmic">Recurring</span>
                      </td>
                      <td className="px-6 py-4 min-w-fit">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Entry:</span>
                            <span className="text-white">{item.stakeFeePercentage}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Exit:</span>
                            <span className="text-white">{item.withdrawalFeePercentage}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 min-w-fit">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Primary:</span>
                            <span className="text-cosmic">{item.stakeToken.symbol}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Bonus:</span>
                            <span className="text-cosmic">{item.rewardToken.symbol}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 min-w-fit">
                        <span className="text-cosmic font-bold">{item.totalStaked}</span> {item.stakeToken.symbol}
                      </td>
                      <td className="px-6 py-4 min-w-fit">
                        <span className="text-cosmic font-bold">{Number(item.totalRewardable).toFixed(0)}</span> {item.rewardToken.symbol}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default JoinedPool;
