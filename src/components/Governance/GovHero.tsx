import { FaArrowCircleRight, FaVoteYea, FaSpaceShuttle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { GiVote, GiMoonOrbit, GiGalaxy } from "react-icons/gi";
import { motion } from "framer-motion";

function GovHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-deepspace/10 to-deepspace/30 font-orbitron">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-cosmic/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-cosmic/10 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid lines */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <div className="text-white min-w-full items-center grid lg:grid-cols-2 p-[60px_20px] lg:p-[80px_40px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-[40px] lg:text-[50px] font-bold leading-[45px] lg:leading-[65px] sci-fi-text-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Shape the Future of <span className="text-cosmic">Aethereon</span> <br className="hidden lg:block" /> with Cosmic Governance
          </motion.h1>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>

          <motion.p
            className="text-[18px] lg:text-[20px] leading-[25px] lg:leading-[27px] mt-[5px] lg:mt-[10px] font-space text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Vote on critical protocol updates, propose new features, and participate in the Solana-powered governance system that puts the future of Aethereon in your hands.
          </motion.p>

          <motion.a
            href="#currentProposals"
            className="relative px-8 py-3 mt-8 inline-flex items-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
            <motion.span
              className="relative flex items-center gap-2"
              whileHover={{
                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
              }}
            >
              <GiVote className="text-xl" />
              <span>Vote Now</span>
              <FaArrowCircleRight className="text-skyblue ml-1" />
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-[40px] lg:mt-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Replace image with React Icons visualization */}
          <div className="relative w-full max-w-[400px] h-[400px] sci-fi-panel rounded-lg p-6 flex items-center justify-center">
            {/* Central icon */}
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
              <GiVote className="text-6xl text-cosmic" />
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
                <SiSolana className="text-3xl text-skyblue" />
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

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GovHero