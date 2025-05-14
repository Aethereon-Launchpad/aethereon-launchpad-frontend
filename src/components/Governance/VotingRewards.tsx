import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { 
  FaVoteYea, 
  FaRocket, 
  FaUserAstronaut, 
  FaChartLine, 
  FaAward, 
  FaClock 
} from "react-icons/fa";
import { GiVote, GiStarFormation, GiPowerLightning } from "react-icons/gi";

function VotingRewards() {
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
    <div className="p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      
      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>
      
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-block bg-cosmic/20 px-4 py-1 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-cosmic font-orbitron uppercase text-sm tracking-wider">Governance Incentives</span>
          </motion.div>
          
          <motion.h2 
            className="text-[28px] lg:text-[48px] font-bold font-orbitron sci-fi-text-glow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Earn Rewards for Active Participation
          </motion.h2>
          
          <motion.div 
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mx-auto my-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
          
          <motion.p 
            className="text-gray-300 font-space max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Unlock exclusive rewards by making your voice heard in the Aethereon ecosystem. $AETHER holders who actively participate in governance gain valuable benefits and help shape the future of the protocol on Solana.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
            
            <motion.div 
              className="bg-cosmic/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaVoteYea className="text-3xl text-cosmic" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-orbitron text-white mb-3">Consistent Voting Bonuses</h3>
            
            <p className="text-gray-300 font-space text-sm">
              By voting on proposals consistently, $AETHER holders become eligible for monthly token rewards. Show your dedication to shaping Aethereon's future on Solana, and earn while you contribute.
            </p>
          </motion.div>
          
          <motion.div 
            className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
            
            <motion.div 
              className="bg-cosmic/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaChartLine className="text-3xl text-cosmic" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-orbitron text-white mb-3">Engagement Boost Rewards</h3>
            
            <p className="text-gray-300 font-space text-sm">
              Governance engagement strengthens our community, and active participants receive special bonus tokens. The more you engage with Aethereon's ecosystem, the higher your potential rewards!
            </p>
          </motion.div>
          
          <motion.div 
            className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
            
            <motion.div 
              className="bg-cosmic/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GiStarFormation className="text-3xl text-cosmic" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-orbitron text-white mb-3">Loyalty Multiplier</h3>
            
            <p className="text-gray-300 font-space text-sm">
              Frequent voters gain loyalty points, which increase their monthly rewards. Earn higher benefits for your long-term commitment to Aethereon's governance on Solana.
            </p>
          </motion.div>
          
          <motion.div 
            className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
            
            <motion.div 
              className="bg-cosmic/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaAward className="text-3xl text-cosmic" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-orbitron text-white mb-3">Cosmic Builder Badge</h3>
            
            <p className="text-gray-300 font-space text-sm">
              Active participants earn a "Cosmic Builder" badge, enhancing their reputation in the Aethereon ecosystem and unlocking exclusive access to advanced features and early opportunities.
            </p>
          </motion.div>
          
          <motion.div 
            className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
            
            <motion.div 
              className="bg-cosmic/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaClock className="text-3xl text-cosmic" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-orbitron text-white mb-3">Early Voter Perks</h3>
            
            <p className="text-gray-300 font-space text-sm">
              Voting early on key proposals grants special perks, such as exclusive access to new Solana-based features, pre-launch opportunities, and priority participation in Aethereon's ecosystem events.
            </p>
          </motion.div>
          
          <motion.div 
            className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
            
            <motion.div 
              className="bg-cosmic/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4"
              animate={{
                boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GiPowerLightning className="text-3xl text-cosmic" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-orbitron text-white mb-3">Governance Power-Up</h3>
            
            <p className="text-gray-300 font-space text-sm">
              Consistent voters unlock a Governance Power-Up, boosting their voting influence on future proposals and gaining increased weight in Aethereon's decision-making processes.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default VotingRewards;
