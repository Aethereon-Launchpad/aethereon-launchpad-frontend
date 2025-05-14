import { useEffect, useState } from "react";
import { GET_STAKING_POOLS } from "../../graphql/queries"
import { useQuery } from "@apollo/client"
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { usePrivy } from "@privy-io/react-auth";
import { getStakingPower, getTotalRewards, getAllStakingPoolData } from "../../utils/web3/actions";
import { toast } from "react-hot-toast";
import { useLockStake } from "../../hooks/web3/useLockStake";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { FaCoins, FaChartLine, FaRocket } from "react-icons/fa";
import { GiStarFormation, GiMoonOrbit } from "react-icons/gi";

function Reward() {
  const { user, authenticated } = usePrivy()
  const [loading, setLoading] = useState<boolean>(true);
  const [stakingPower, setStakingPower] = useState<number | string>("N/A");
  const [totalRewards, setTotalRewards] = useState<number | string>("N/A");



  useEffect(() => {
    async function loadData() {
      if (!user?.wallet?.address) {
        return;
      }

      try {
        const stakingPools = await getAllStakingPoolData();
        const totalAmountStaked = await getStakingPower(stakingPools, user.wallet.address as `0x${string}`);
        const totalAmountRewards = await getTotalRewards(stakingPools, user.wallet.address as `0x${string}`)
        setStakingPower(totalAmountStaked);
        setTotalRewards(Number(totalAmountRewards).toFixed(5));
      } catch (error) {
        toast('Failed to Retrieve dashboard data... Please try again later')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [authenticated])





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
          <p className="text-cosmic mt-4 font-orbitron">Loading Rewards...</p>
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
        className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Total Rewards Card */}
        <motion.div
          className="sci-fi-panel border border-cosmic/30 p-8 rounded-lg relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="bg-cosmic/20 p-4 rounded-full"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaCoins className="text-2xl text-cosmic" />
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <GiMoonOrbit className="text-3xl text-cosmic" />
              </motion.div>
            </div>

            <motion.h2
              className="text-2xl font-bold font-orbitron sci-fi-text-glow mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Total Rewards
            </motion.h2>

            <motion.div
              className="w-[80px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "80px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>

            <motion.p
              className="text-gray-300 font-space mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              The total amount of rewards you've earned from participating in Aethereon's staking pools on the Solana network
            </motion.p>

            <motion.div
              className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
            >
              <motion.p
                className="text-3xl font-bold text-cosmic font-orbitron"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Number(totalRewards).toFixed(3)}
              </motion.p>
              <p className="text-white text-lg ml-2 font-space">AETHER</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Staking Power Card */}
        <motion.div
          className="sci-fi-panel border border-cosmic/30 p-8 rounded-lg relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="bg-cosmic/20 p-4 rounded-full"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaRocket className="text-2xl text-cosmic" />
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <GiStarFormation className="text-3xl text-cosmic" />
              </motion.div>
            </div>

            <motion.h2
              className="text-2xl font-bold font-orbitron sci-fi-text-glow mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Staking Power
            </motion.h2>

            <motion.div
              className="w-[80px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "80px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            ></motion.div>

            <motion.p
              className="text-gray-300 font-space mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              The total amount you've currently invested in Aethereon's staking pools, determining your influence in the ecosystem
            </motion.p>

            <motion.div
              className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
            >
              <motion.p
                className="text-3xl font-bold text-cosmic font-orbitron"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {Number(stakingPower).toFixed(3)}
              </motion.p>
              <p className="text-white text-lg ml-2 font-space">AETHER</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Reward