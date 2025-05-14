import { FaRocket, FaSatellite, FaSpaceShuttle, FaStar, FaGlobeAsia, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiSolana } from "react-icons/si";
import { motion } from "framer-motion";
import { GiGalaxy, GiMoonOrbit } from "react-icons/gi";
import { IoIosPlanet } from "react-icons/io";

function HomeHero() {
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative overflow-hidden hero-bg font-orbitron min-h-[90vh] flex items-center">
      {/* Cosmic glow effects */}
      <div className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[80px] bg-cosmic opacity-30"></div>
      <div className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[80px] bg-cosmic opacity-20"></div>

      {/* Animated stars */}
      <motion.div
        className="absolute top-[15%] right-[10%] text-cosmic text-xl"
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[15%] text-skyblue text-sm"
        animate={{
          y: [0, -8, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar />
      </motion.div>

      <motion.div
        className="absolute top-[40%] left-[5%] text-purple-400 text-lg"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar />
      </motion.div>

      <div className="text-white w-full max-w- mx-auto grid lg:grid-cols-2 gap-12 p-[60px_20px] lg:p-[60px] items-center">
        <motion.div
          className="sci-fi-text-glow"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-[40px] lg:text-[70px] font-[700] leading-[45px] lg:leading-[75px]">
              The <span className="text-cosmic">Solana</span> Launchpad <br className="hidden lg:block" /> of Tomorrow
            </h1>
          </motion.div>

          <motion.p
            className="text-[18px] lg:text-[22px] leading-[25px] lg:leading-[30px] mt-[10px] lg:mt-[15px] font-space"
            variants={itemVariants}
          >
            Discover, Invest, and Empower the Next Generation of <br className="hidden lg:block" />
            Solana Projects – Fast, Secure, and Built for the Future
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mt-8"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="#upcomingido"
                className="relative px-6 py-3 font-[500] text-[18px] text-white flex items-center justify-center overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                <motion.span
                  className="relative flex items-center"
                  whileHover={{
                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                  }}
                >
                  <FaRocket className="mr-2" />
                  Upcoming IDOs
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/lock-stake"
                className="relative px-6 py-3 font-[500] text-[18px] text-white flex items-center justify-center overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                <motion.span
                  className="relative flex items-center"
                  whileHover={{
                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                  }}
                >
                  <FaSatellite className="mr-2" />
                  Stake $ATH
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="https://t.me/+SZiyw7ZP9gliM2Fk"
                target="_blank"
                className="relative px-6 py-3 font-[500] text-[18px] text-white flex items-center justify-center overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                <motion.span
                  className="relative flex items-center"
                  whileHover={{
                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                  }}
                >
                  <FaSpaceShuttle className="mr-2" />
                  Get Notified
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative px-6 py-3 mt-[30px] w-fit font-[500] text-[18px] text-white flex items-center justify-center overflow-hidden group"
            variants={itemVariants}
          >
            <span className="absolute inset-0 w-full h-full bg-nebula-gradient clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
            <div className="relative flex items-center space-x-[10px]">
              <motion.div
                className="flex items-center justify-center p-2"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <SiSolana className="text-2xl text-skyblue" />
              </motion.div>
              <p className="text-base lg:text-xl font-space">Powered by Solana</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Space station visualization using React Icons */}
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Central hub */}
            <motion.div
              className="absolute z-20 bg-deepspace p-8 rounded-full border-4 border-cosmic/50"
              animate={{
                boxShadow: ['0 0 20px rgba(108, 92, 231, 0.3)', '0 0 40px rgba(108, 92, 231, 0.5)', '0 0 20px rgba(108, 92, 231, 0.3)']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <SiSolana className="text-6xl text-cosmic" />
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
                <FaRocket className="text-3xl text-skyblue" />
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
                <IoIosPlanet className="text-3xl text-purple-400" />
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
                <GiGalaxy className="text-3xl text-cosmic" />
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
              <FaStar className="text-xl" />
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
              <FaStar className="text-xl" />
            </motion.div>

            <motion.div
              className="absolute top-1/3 left-1/5 text-purple-400"
              animate={{
                y: [0, 15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaStar className="text-xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomeHero
