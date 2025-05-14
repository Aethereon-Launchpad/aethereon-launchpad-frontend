import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSatelliteDish,
  FaSpaceShuttle,
  FaRocket,
  FaGlobeAsia,
  FaStar
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function StakingBadge() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const badges = [
    {
      icon: <FaSatelliteDish className="text-4xl text-cosmic" />,
      title: "Orbital Scout",
      range: "1,000 - 4,999 $ATH",
      multiplier: "1.5x",
      benefits: ["Basic IDO access", "Community channels"]
    },
    {
      icon: <FaRocket className="text-4xl text-cosmic" />,
      title: "Cosmic Voyager",
      range: "5,000 - 9,999 $ATH",
      multiplier: "2x",
      benefits: ["Priority allocation", "Early access"]
    },
    {
      icon: <FaSpaceShuttle className="text-4xl text-cosmic" />,
      title: "Stellar Guardian",
      range: "10,000 - 14,999 $ATH",
      multiplier: "2.5x",
      benefits: ["Guaranteed allocation", "Exclusive NFTs"]
    },
    {
      icon: <FaGlobeAsia className="text-4xl text-cosmic" />,
      title: "Nebula Commander",
      range: "15,000 - 49,999 $ATH",
      multiplier: "3x",
      benefits: ["Premium allocations", "Governance voting"]
    },
    {
      icon: <FaStar className="text-4xl text-cosmic" />,
      title: "Quantum Guardian",
      range: "50,000+ $ATH",
      multiplier: "3.5x",
      benefits: ["Maximum allocations", "Private channels"]
    }
  ];

  return (
    <div id="tierSystem" className="mt-[60px] font-orbitron lg:p-[60px] p-[60px_20px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

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

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>

      {/* Header with enhanced styling */}
      <motion.div
        className="relative flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
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
            className="relative"
          >
            <SiSolana className="text-cosmic text-5xl" />
            <motion.div
              className="absolute inset-0 bg-cosmic rounded-full blur-md -z-10"
              animate={{
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.div>
          <h2 className="text-[30px] lg:text-[42px] text-cosmic sci-fi-text-glow font-bold">
            Cosmic Tier System
          </h2>
        </motion.div>

        <motion.div
          className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        ></motion.div>

        <motion.p
          className="text-[16px] lg:text-[18px] text-gray-300 max-w-3xl mb-10 font-space"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Stake $ATH tokens to unlock exclusive benefits in the Aethereon ecosystem. Higher tiers provide increased allocation sizes and premium features on the Solana blockchain.
        </motion.p>

        {/* Tier indicator */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[1, 2, 3, 4, 5].map((tier) => (
            <motion.div
              key={tier}
              className={`w-3 h-3 rounded-full ${tier === 1 ? 'bg-gray-400' : tier === 2 ? 'bg-skyblue' : tier === 3 ? 'bg-blue-500' : tier === 4 ? 'bg-purple-500' : 'bg-cosmic'}`}
              whileHover={{ scale: 1.5 }}
              animate={{
                boxShadow: [`0 0 5px rgba(108, 92, 231, 0.${tier})`, `0 0 10px rgba(108, 92, 231, 0.${tier + 2})`, `0 0 5px rgba(108, 92, 231, 0.${tier})`]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tier * 0.2
              }}
            ></motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="grid lg:grid-cols-3 mt-[20px] gap-[30px] lg:gap-[40px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="relative h-fit flex flex-col justify-between overflow-hidden group"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            {/* Card background with glow effect */}
            <div className="absolute inset-0 bg-deepspace/80 rounded-lg z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic/10 to-deepspace/80 rounded-lg z-0"></div>

            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 rounded-lg z-0 border border-cosmic/30"
              animate={{
                boxShadow: ['0 0 5px rgba(108, 92, 231, 0.2)', '0 0 15px rgba(108, 92, 231, 0.4)', '0 0 5px rgba(108, 92, 231, 0.2)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>

            {/* Card content */}
            <div className="relative p-[30px] text-white z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {badge.icon}
                </motion.div>
                <motion.div
                  className="bg-cosmic/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Tier {index + 1}
                </motion.div>
              </div>

              <h3 className="text-[24px] font-[600] sci-fi-text-glow mb-2">{badge.title}</h3>

              <p className="text-[16px] mt-[10px] text-skyblue font-space">
                Stake {badge.range}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-[18px] font-[700] text-cosmic flex items-center">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="inline-block mr-2"
                  >
                    ⚡
                  </motion.span>
                  Pool Weight: {badge.multiplier}
                </p>

                <ul className="mt-2 space-y-1">
                  {badge.benefits.map((benefit, i) => (
                    <li key={i} className="text-[14px] text-gray-300 flex items-center font-space">
                      <span className="text-cosmic mr-2">•</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Button with improved angled design */}
            <div className="relative mt-6 z-10">
              <motion.div
                className="absolute inset-0 bg-cosmic clip-path-polygon"
                whileHover={{
                  opacity: [0.8, 1],
                  scale: 1.01
                }}
                transition={{ duration: 0.3 }}
              ></motion.div>

              <Link
                to="/lock-stake"
                className="relative block"
              >
                <div className="relative py-[12px] text-center overflow-hidden">
                  <div className="absolute inset-0 bg-deepspace clip-path-polygon transform translate-x-[1px] translate-y-[1px] scale-[0.995]"></div>
                  <motion.span
                    className="relative text-white font-medium flex items-center justify-center"
                    whileHover={{
                      textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                    }}
                  >
                    <SiSolana className="mr-2 text-skyblue" /> Stake Now
                  </motion.span>
                </div>
              </Link>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg z-10"></div>
            <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg z-10"></div>

            {/* Decorative diagonal line */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-[150%] h-[1px] bg-cosmic/20 transform rotate-[15deg] translate-y-[20px] translate-x-[-20px]"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default StakingBadge;
