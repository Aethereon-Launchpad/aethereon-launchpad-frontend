import { FaArrowCircleRight, FaRocket, FaSatelliteDish, FaSpaceShuttle, FaGlobeAsia, FaStar } from "react-icons/fa";
import { usePrivy } from "@privy-io/react-auth";
import { useLockStake } from "../../hooks/web3/useLockStake";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { GiStarFormation } from "react-icons/gi";

function DashboardNew() {
  const { authenticated, login, logout, user } = usePrivy();
  const { data, error, loading } = useLockStake({ polling: true, userAddress: user?.wallet?.address as `0x${string}` })

  function getBadgeInfo(amount: number) {
    if (amount >= 50000) {
      return {
        name: "Quantum Guardian",
        icon: <FaStar className="text-4xl text-cosmic" />,
        range: "50,000+ $ATH",
        multiplier: "3.5x",
        benefits: ["Maximum allocations", "Private channels"]
      };
    } else if (amount >= 15000) {
      return {
        name: "Nebula Commander",
        icon: <FaGlobeAsia className="text-4xl text-cosmic" />,
        range: "15,000 - 49,999 $ATH",
        multiplier: "3x",
        benefits: ["Premium allocations", "Governance voting"]
      };
    } else if (amount >= 10000) {
      return {
        name: "Stellar Guardian",
        icon: <FaSpaceShuttle className="text-4xl text-cosmic" />,
        range: "10,000 - 14,999 $ATH",
        multiplier: "2.5x",
        benefits: ["Guaranteed allocation", "Exclusive NFTs"]
      };
    } else if (amount >= 5000) {
      return {
        name: "Cosmic Voyager",
        icon: <FaRocket className="text-4xl text-cosmic" />,
        range: "5,000 - 9,999 $ATH",
        multiplier: "2x",
        benefits: ["Priority allocation", "Early access"]
      };
    } else if (amount >= 1000) {
      return {
        name: "Orbital Scout",
        icon: <FaSatelliteDish className="text-4xl text-cosmic" />,
        range: "1,000 - 4,999 $ATH",
        multiplier: "1.5x",
        benefits: ["Basic IDO access", "Community channels"]
      };
    } else {
      return {
        name: "Space Cadet",
        icon: <GiStarFormation className="text-4xl text-cosmic" />,
        range: "0 - 999 $ATH",
        multiplier: "1x",
        benefits: ["Basic access", "Public channels"]
      };
    }
  }

  const badgeInfo = getBadgeInfo(data?.userData?.amountStaked || 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
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
          <p className="text-cosmic mt-4 font-orbitron">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error.message) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-deepspace/50 p-8 rounded-lg border border-red-500/30 flex flex-col items-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-red-500 text-4xl mb-4"
          >
            ⚠️
          </motion.div>
          <p className="text-red-500 text-center font-orbitron">Error loading Dashboard: {error.message}</p>
          <motion.button
            className="mt-4 bg-deepspace border border-cosmic/30 px-4 py-2 rounded-md text-cosmic font-orbitron"
            whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
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
        className="flex flex-col items-center justify-center max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-[30px] lg:text-[70px] font-bold font-orbitron sci-fi-text-glow text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Welcome to Aethereon
        </motion.h1>

        <motion.div
          className="w-[150px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "150px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>

        <motion.p
          className="text-[16px] lg:text-[22px] text-center text-gray-300 font-space max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your gateway to the Solana ecosystem with advanced staking, governance, and DeFi opportunities
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {!authenticated ? (
            <motion.button
              className="relative px-8 py-3 text-white font-medium overflow-hidden"
              onClick={login}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
              <motion.span
                className="relative flex items-center gap-2 font-orbitron"
                whileHover={{
                  textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                }}
              >
                <SiSolana className="text-xl" />
                <span>Connect Wallet</span>
                <FaArrowCircleRight className="text-skyblue ml-1" />
              </motion.span>
            </motion.button>
          ) : (
            <motion.button
              className="relative px-8 py-3 text-white font-medium overflow-hidden"
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
              <motion.span
                className="relative flex items-center gap-2 font-orbitron"
                whileHover={{
                  textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                }}
              >
                <span className="truncate max-w-[100px]">{user?.wallet?.address}</span>
                <span className="truncate max-w-[100px] hover:block hidden">Disconnect</span>
                <FaArrowCircleRight className="text-skyblue ml-1" />
              </motion.span>
            </motion.button>
          )}
        </motion.div>

        <motion.div
          className="sci-fi-panel border border-cosmic/30 p-8 rounded-lg relative w-full max-w-2xl mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

          <div className="relative text-center">
            <motion.div
              className="bg-cosmic/20 p-4 rounded-full mx-auto mb-6 w-20 h-20 flex items-center justify-center"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaRocket className="text-3xl text-cosmic" />
            </motion.div>

            <motion.p
              className="text-[48px] leading-[60px] text-cosmic font-bold font-orbitron"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {data?.userData?.amountStaked}
            </motion.p>

            <motion.div
              className="w-[100px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mx-auto my-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>

            <motion.p
              className="text-lg text-white font-orbitron mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Total Staking Power
            </motion.p>

            <motion.div
              className="bg-deepspace/30 p-3 rounded-lg border border-cosmic/20 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
            >
              <p className="text-gray-300 font-space">Current Tier: <span className="text-cosmic font-bold">{badgeInfo.name}</span></p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4 bg-deepspace/30 p-4 rounded-lg border border-cosmic/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
            >
              {/* Badge Icon with Animation */}
              <motion.div
                className="bg-cosmic/20 p-3 rounded-full relative"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                animate={{
                  boxShadow: ['0 0 5px rgba(108, 92, 231, 0.2)', '0 0 15px rgba(108, 92, 231, 0.4)', '0 0 5px rgba(108, 92, 231, 0.2)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {badgeInfo.icon}

                {/* Orbiting Solana icon */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center center" }}
                >
                  <motion.div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 bg-cosmic/10 p-1 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <SiSolana className="text-xs text-cosmic" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <div className="flex flex-col">
                {/* Badge Name */}
                <h3 className="text-[18px] font-[600] sci-fi-text-glow text-cosmic">{badgeInfo.name}</h3>

                {/* Multiplier */}
                <p className="text-[16px] font-[700] text-cosmic flex items-center">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="inline-block mr-2"
                  >
                    ⚡
                  </motion.span>
                  {badgeInfo.multiplier} Multiplier
                </p>
              </div>
            </motion.div>

            {!authenticated && (
              <motion.div
                className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <p className="text-center text-gray-300 font-space">
                  Connect your wallet to access Aethereon's advanced staking features and participate in the Solana ecosystem
                </p>
                <motion.button
                  className="relative px-8 py-3 text-white font-medium overflow-hidden mt-4"
                  onClick={login}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                  <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                  <motion.span
                    className="relative flex items-center gap-2 font-orbitron"
                    whileHover={{
                      textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                    }}
                  >
                    <SiSolana className="text-xl" />
                    <span>Connect Wallet</span>
                    <FaArrowCircleRight className="text-skyblue ml-1" />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default DashboardNew;
