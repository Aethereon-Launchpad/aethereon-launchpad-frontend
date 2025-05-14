import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCoins, FaChartLine, FaLock, FaRocket } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { GiCrystalGrowth, GiCrystalCluster } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";

function StakeHero() {
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

  return (
    <div className="relative overflow-hidden hero-bg font-orbitron min-h-[90vh] flex items-center">
      {/* Cosmic glow effects */}
      <div className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[80px] bg-cosmic opacity-30"></div>
      <div className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[80px] bg-cosmic opacity-20"></div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-[1px] bg-cosmic/30"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
            style={{ left: `${(i + 1) * 14.28}%` }}
          ></motion.div>
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-[1px] bg-cosmic/30"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
            style={{ top: `${(i + 1) * 20}%` }}
          ></motion.div>
        ))}
      </div>

      <div className="text-white w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 p-[60px_20px] lg:p-[60px] items-center">
        <motion.div
          className="sci-fi-text-glow"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-[35px] lg:text-[65px] font-[700] leading-[45px] lg:leading-[70px]">
              Maximize Your <span className="text-cosmic">Rewards</span>
              <br className="hidden lg:block" /> Through Staking
            </h1>
          </motion.div>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>

          <motion.p
            className="text-[18px] lg:text-[22px] leading-[25px] lg:leading-[30px] mt-[10px] lg:mt-[15px] font-space"
            variants={itemVariants}
          >
            Stake $ATH tokens in our Solana-powered pools to earn up to 25% APY,
            unlock exclusive platform benefits, and generate passive income with
            lightning-fast rewards distribution.
          </motion.p>

          <motion.div
            className="mt-10 grid grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaCoins className="text-cosmic text-xl" />
              </motion.div>
              <span className="font-medium">Up to 25% APY</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <SiSolana className="text-cosmic text-xl" />
              </motion.div>
              <span className="font-medium">Solana Speed</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <FaLock className="text-cosmic text-xl" />
              </motion.div>
              <span className="font-medium">Flexible Locking</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                animate={{
                  boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <FaRocket className="text-cosmic text-xl" />
              </motion.div>
              <span className="font-medium">IDO Allocations</span>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={() => navigate("/staking-pool/new")}
            className="relative px-8 py-3 mt-10 font-medium text-white flex items-center overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
            <motion.span
              className="relative flex items-center"
              whileHover={{
                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
              }}
            >
              <SiSolana className="mr-2" /> Explore Staking Pools
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Staking visualization using React Icons */}
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Central crystal */}
            <motion.div
              className="absolute z-20 bg-deepspace p-8 rounded-lg border-4 border-cosmic/50"
              animate={{
                boxShadow: ['0 0 20px rgba(108, 92, 231, 0.3)', '0 0 40px rgba(108, 92, 231, 0.5)', '0 0 20px rgba(108, 92, 231, 0.3)'],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                boxShadow: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <GiCrystalGrowth className="text-6xl text-cosmic" />
            </motion.div>

            {/* Orbiting elements */}
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border border-cosmic/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -top-4 -left-4 bg-deepspace p-3 rounded-full border border-skyblue/50"
                animate={{
                  boxShadow: ['0 0 10px rgba(135, 206, 235, 0.3)', '0 0 20px rgba(135, 206, 235, 0.5)', '0 0 10px rgba(135, 206, 235, 0.3)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaCoins className="text-3xl text-skyblue" />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute w-[200px] h-[200px] rounded-full border border-purple-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -bottom-4 -right-4 bg-deepspace p-3 rounded-full border border-purple-400/50"
                animate={{
                  boxShadow: ['0 0 10px rgba(149, 117, 205, 0.3)', '0 0 20px rgba(149, 117, 205, 0.5)', '0 0 10px rgba(149, 117, 205, 0.3)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <GiCrystalCluster className="text-3xl text-purple-400" />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full border border-cosmic/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-1/2 -right-4 bg-deepspace p-3 rounded-full border border-cosmic/50"
                animate={{
                  boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IoMdPlanet className="text-3xl text-cosmic" />
              </motion.div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-0 right-1/4 text-skyblue"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <SiSolana className="text-xl" />
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 left-1/4 text-cosmic"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <SiSolana className="text-xl" />
            </motion.div>

            {/* APY indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-deepspace/80 px-4 py-2 rounded-lg border border-cosmic/50 text-center"
              animate={{
                y: [0, -5, 0],
                boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.p
                className="text-lg font-bold text-cosmic"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Up to 25% APY
              </motion.p>
              <p className="text-sm text-gray-300 font-space">Solana-Powered Staking</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StakeHero;
