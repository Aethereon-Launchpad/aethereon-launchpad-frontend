import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { FaUsers, FaVoteYea, FaNetworkWired } from "react-icons/fa";
import { GiVote, GiMoonOrbit } from "react-icons/gi";
import { IoIosPlanet } from "react-icons/io";

function GovModel() {
  return (
    <div className="p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      
      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>
      
      <motion.div 
        className="sci-fi-panel border border-cosmic/30 flex flex-col lg:flex-row items-center w-full max-w-6xl mx-auto p-8 lg:p-10 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
        
        <motion.div 
          className="w-full lg:w-[40%] flex items-center justify-center mb-8 lg:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Replace image with React Icons visualization */}
          <div className="relative w-full max-w-[300px] h-[300px] flex items-center justify-center">
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
              <FaUsers className="text-6xl text-cosmic" />
            </motion.div>
            
            {/* Orbiting elements */}
            <motion.div 
              className="absolute w-[250px] h-[250px] rounded-full border border-cosmic/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="absolute -top-3 -left-3 bg-deepspace p-3 rounded-full border border-skyblue/50"
                animate={{
                  boxShadow: ['0 0 10px rgba(135, 206, 235, 0.3)', '0 0 20px rgba(135, 206, 235, 0.5)', '0 0 10px rgba(135, 206, 235, 0.3)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <SiSolana className="text-2xl text-skyblue" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute w-[150px] h-[150px] rounded-full border border-purple-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="absolute -bottom-3 -right-3 bg-deepspace p-3 rounded-full border border-purple-400/50"
                animate={{
                  boxShadow: ['0 0 10px rgba(149, 117, 205, 0.3)', '0 0 20px rgba(149, 117, 205, 0.5)', '0 0 10px rgba(149, 117, 205, 0.3)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <GiVote className="text-2xl text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-start w-full lg:w-[60%] p-[20px] lg:p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h2 
            className="text-[28px] lg:text-[40px] font-bold font-orbitron sci-fi-text-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Cosmic Governance Protocol
          </motion.h2>
          
          <motion.div 
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="my-[10px] text-gray-300 font-space leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Experience Aethereon's decentralized governance system, where holders of $AETHER tokens can vote on critical decisions including protocol upgrades, new feature implementations, and strategic partnerships within the Solana ecosystem.
          </motion.p>
          
          <motion.div 
            className="mt-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="font-bold text-xl font-orbitron text-cosmic">Benefits for Participants</h3>
            
            <div className="space-y-3">
              <motion.div 
                className="flex items-start gap-3 bg-deepspace/30 p-3 rounded-lg border border-cosmic/20"
                whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
              >
                <FaVoteYea className="text-cosmic mt-1" />
                <p className="font-space text-gray-300">Direct influence over Aethereon's development roadmap and strategic direction</p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3 bg-deepspace/30 p-3 rounded-lg border border-cosmic/20"
                whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
              >
                <FaNetworkWired className="text-cosmic mt-1" />
                <p className="font-space text-gray-300">Deeper engagement with the Solana ecosystem through collaborative decision-making</p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3 bg-deepspace/30 p-3 rounded-lg border border-cosmic/20"
                whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
              >
                <SiSolana className="text-cosmic mt-1" />
                <p className="font-space text-gray-300">Exclusive governance rewards for active participants in the Aethereon community</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default GovModel;
