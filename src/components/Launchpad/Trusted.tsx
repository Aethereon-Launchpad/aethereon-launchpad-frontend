import { motion } from 'framer-motion';
import { SiSolana } from "react-icons/si";

function Trusted() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-deepspace/30 backdrop-blur-sm py-10">
      <motion.div
        className="flex font-orbitron flex-col items-center justify-center py-[40px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SiSolana className="text-cosmic text-3xl animate-pulse" />
          <p className="uppercase text-2xl text-cosmic text-center font-extrabold sci-fi-text-glow">
            Powering Solana's Next Generation
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center space-y-[30px] lg:space-y-0 lg:space-x-[50px] mt-[20px]">
          <motion.div
            className="flex flex-col items-center text-white sci-fi-panel p-6 rounded-lg"
            variants={itemVariants}
            whileHover="hover"
          >
            <p className="font-[700] leading-[45px] text-[40px] text-cosmic">9.2x</p>
            <p className="font-space">AVERAGE ROI</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-white sci-fi-panel p-6 rounded-lg"
            variants={itemVariants}
            whileHover="hover"
          >
            <p className="font-[700] leading-[45px] text-[40px] text-cosmic">{25}+</p>
            <p className="font-space">SOLANA PROJECTS</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-white sci-fi-panel p-6 rounded-lg"
            variants={itemVariants}
            whileHover="hover"
          >
            <p className="font-[700] leading-[45px] text-[40px] text-cosmic">15+</p>
            <p className="font-space">AIRDROPS</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-white sci-fi-panel p-6 rounded-lg"
            variants={itemVariants}
            whileHover="hover"
          >
            <p className="font-[700] leading-[45px] text-[40px] text-cosmic">18%</p>
            <p className="font-space">SUPPLY STAKED</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Trusted;
