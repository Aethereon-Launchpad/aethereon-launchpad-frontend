import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { FaRocket, FaSatellite, FaSpaceShuttle, FaStar } from "react-icons/fa";

function Access() {
  const navigation = useNavigate();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      color: "#87ceeb",
      transition: { duration: 0.2, yoyo: Infinity }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.1
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="mt-[60px] font-orbitron lg:p-[60px] p-[60px_20px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-cosmic/5 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-cosmic/5 rounded-full blur-[80px] -z-10"></div>
      <motion.div
        className="absolute top-20 right-20"
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar className="text-cosmic text-xl" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar className="text-skyblue text-xl" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex flex-col items-center justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SiSolana className="text-cosmic text-4xl animate-pulse" />
          </motion.div>
          <p className="text-[30px] lg:text-[48px] text-cosmic text-center font-extrabold sci-fi-text-glow">
            Access the Solana Launchpad
          </p>
        </div>

        <motion.p
          className="text-[16px] lg:text-[20px] text-gray-300 text-center max-w-3xl mx-auto mb-8 font-space"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Stake $ATH tokens to unlock exclusive benefits and priority access to Solana's most promising projects
        </motion.p>


      </motion.div>

      <motion.div
        className="grid lg:grid-cols-3 gap-[30px] mt-[40px] text-white max-w- mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          {
            icon: <FaRocket className="text-5xl text-cosmic" />,
            title: "Solana Speed Staking",
            description: "Earn up to 25% APY with Solana's lightning-fast staking system. Experience transaction speeds 4000x faster than traditional blockchains with minimal fees and maximum security.",
            path: "/lock-stake",
            buttonText: "Stake $ATH"
          },
          {
            icon: <FaSatellite className="text-5xl text-cosmic" />,
            title: "Cosmic Tier System",
            description: "Rise through our space-themed tiers from Orbital Scout to Quantum Guardian and unlock exclusive Solana IDO allocations! Higher tiers receive up to 5x larger allocations and early access.",
            path: "#tierSystem",
            buttonText: "View Tiers"
          },
          {
            icon: <FaSpaceShuttle className="text-5xl text-cosmic" />,
            title: "Solana Ecosystem Rewards",
            description: "Participate in limited-time staking challenges to earn exclusive Solana ecosystem rewards, NFT drops, and governance voting power. Join our community of forward-thinking Solana enthusiasts.",
            path: "/seasonal-staking",
            buttonText: "Join Challenge"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative p-[30px] flex-col flex justify-between items-start overflow-hidden group sci-fi-panel rounded-lg h-full border border-cosmic/20"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="relative w-full">
              <motion.div
                className="mb-6"
                variants={iconVariants}
                whileHover="hover"
              >
                {item.icon}
              </motion.div>
              <motion.p
                className="text-[24px] font-[600] leading-[32px] mt-[10px] sci-fi-text-glow"
                variants={titleVariants}
              >
                {item.title}
              </motion.p>
              <motion.p
                className="text-[16px] mt-[10px] font-[400] font-space text-gray-300"
                variants={descriptionVariants}
              >
                {item.description}
              </motion.p>
            </div>
            <motion.button
              onClick={() => navigation(item.path)}
              className="relative w-full lg:w-[222px] h-[45px] mt-[30px] text-white flex items-center justify-center overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
              <span className="relative flex items-center">
                {item.buttonText}
                <GoArrowUpRight className="text-[20px] ml-2 text-skyblue" />
              </span>
            </motion.button>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Final CTA Section */}
      <motion.div
        className="mt-20 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.h3
          className="text-2xl lg:text-3xl font-bold text-cosmic sci-fi-text-glow mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to Join the Aethereon Community?
        </motion.h3>

        <motion.p
          className="text-gray-300 mb-8 font-space"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Start your journey in the Solana ecosystem today and gain access to exclusive IDO opportunities
        </motion.p>

        <motion.button
          onClick={() => navigation("/lock-stake")}
          className="relative px-8 py-3 text-white font-medium overflow-hidden inline-flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
          <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
          <span className="relative flex items-center font-orbitron">
            <SiSolana className="mr-2" />
            Begin Staking Journey
            <GoArrowUpRight className="ml-2 text-skyblue" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Access;
