import { motion } from "framer-motion";
import { FaChartLine, FaCoins, FaRocket, FaLock, FaVoteYea } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { GiCrystalGrowth, GiGrowth } from "react-icons/gi";

function Passive() {
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
    <div className="p-[60px_20px] lg:p-[80px_40px] font-orbitron bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="w-full max-w-7xl mx-auto sci-fi-panel rounded-lg border border-cosmic/30 p-[40px] relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

        <div className="grid lg:grid-cols-2 gap-[60px] items-center">
          <motion.div
            className="flex flex-col items-start justify-center"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4 mb-6">
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
                <GiGrowth className="text-cosmic text-4xl" />
              </motion.div>
              <h2 className="text-[28px] lg:text-[42px] font-bold text-white sci-fi-text-glow">
                Earn Passive Income with <span className="text-cosmic">Yield Farming</span>
              </h2>
            </div>

            <motion.div
              className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>

            <motion.div
              className="space-y-6 font-space"
              variants={itemVariants}
            >
              <div className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                    animate={{
                      boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaCoins className="text-cosmic text-xl" />
                  </motion.div>
                  <h3 className="text-[20px] font-[600] text-cosmic">Yield Distribution</h3>
                </div>
                <p className="text-[16px] text-gray-300 leading-relaxed">
                  Participating in yield farming on Aethereon rewards you with both $ATH and bonus governance tokens.
                  Rewards are distributed daily on Solana's lightning-fast network, allowing you to enhance your
                  earnings while also gaining a say in platform governance.
                </p>
              </div>

              <div className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                    animate={{
                      boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <FaChartLine className="text-cosmic text-xl" />
                  </motion.div>
                  <h3 className="text-[20px] font-[600] text-cosmic">APY Rates</h3>
                </div>
                <p className="text-[16px] text-gray-300 leading-relaxed">
                  Each farming pool features clear APY rates up to 25%, enabling you to compare options easily.
                  These rates are updated in real-time on Solana's blockchain, ensuring you have the most accurate
                  information to maximize your returns with minimal fees.
                </p>
              </div>

              <div className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2 rounded-full bg-cosmic/20 border border-cosmic/30"
                    animate={{
                      boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <FaVoteYea className="text-cosmic text-xl" />
                  </motion.div>
                  <h3 className="text-[20px] font-[600] text-cosmic">Governance Benefits</h3>
                </div>
                <p className="text-[16px] text-gray-300 leading-relaxed">
                  Stakers receive governance voting rights proportional to their staked amount, allowing you
                  to help shape the future of the Aethereon platform. Participate in key decisions and earn
                  additional rewards for active governance participation.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            variants={itemVariants}
          >
            {/* Yield farming visualization using React Icons */}
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
                  <FaVoteYea className="text-3xl text-purple-400" />
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
                  <FaRocket className="text-3xl text-cosmic" />
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
                <p className="text-sm text-gray-300 font-space">Solana-Powered Farming</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Passive;