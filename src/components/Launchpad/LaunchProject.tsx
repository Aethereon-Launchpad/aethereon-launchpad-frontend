import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function LaunchProject() {
  const navigate = useNavigate();

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

  return (
    <motion.div
      className="relative font-orbitron overflow-hidden bg-gradient-to-r from-deepspace to-secondary/70 rounded-[20px] my-[40px] mx-[20px] lg:mx-[40px] sci-fi-border"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between p-[30px] lg:p-[40px] gap-8">
        {/* Left Section with Text and Button */}
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center gap-3 mb-4"
            variants={itemVariants}
          >
            <div className="relative">
              <FaRocket className="absolute -left-8 -top-8 text-cosmic text-3xl animate-pulse" />
              <h2 className="text-[28px] lg:text-[42px] text-white font-[600] leading-tight sci-fi-text-glow">
                Launch your project on <br />
                <span className="text-cosmic">Aethereon Solana Launchpad</span>
              </h2>
            </div>
          </motion.div>

          <motion.button
            onClick={() => navigate("/apply")}
            className="relative px-8 py-3 text-white font-[500] overflow-hidden group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
            <span className="relative flex items-center">
              <SiSolana className="mr-2" />
              APPLY TO LAUNCH
            </span>
          </motion.button>
        </motion.div>

        {/* Right Section with Features */}
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <Feature text="Solana's high-speed, low-cost infrastructure" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Feature text="Guaranteed refunds with instant processing" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Feature text="Comprehensive security audits and pentesting" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Feature text="Access to Solana ecosystem investors" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Feature text="Decentralized governance integration" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Feature text="Flexible token vesting solutions" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Feature text="Exclusive Solana staking rewards" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cosmic/20 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cosmic/20 rounded-full blur-[80px] -z-10"></div>
    </motion.div>
  );
}

// Feature component with checkmark
function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-white">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-cosmic"
      >
        <path
          d="M16.6666 5L7.49992 14.1667L3.33325 10"
          stroke="#3498db"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[14px] lg:text-[16px] font-space">{text}</span>
    </div>
  );
}

export default LaunchProject;
