import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowCircleRight, FaRocket, FaSatellite, FaSpaceShuttle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { GiGalaxy, GiMoonOrbit } from "react-icons/gi";
import { IoIosPlanet } from "react-icons/io";

interface DynamicSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  reverse?: boolean;
}

function DynamicSection({
  title,
  description,
  buttonText,
  buttonLink,
  image,
  reverse = false,
}: DynamicSectionProps) {
  const navigate = useNavigate();
  const [isExternalLink, setIsExternalLink] = useState(false);

  useEffect(() => {
    // Check if the link is external (starts with http:// or https://)
    setIsExternalLink(buttonLink.startsWith("http"));
  }, [buttonLink]);

  const handleButtonClick = () => {
    if (isExternalLink) {
      window.open(buttonLink, "_blank");
    } else {
      navigate(buttonLink);
    }
  };

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

  // Choose a random icon for the visualization
  const getRandomIcon = () => {
    const icons = [
      <FaRocket className="text-6xl text-cosmic" />,
      <GiGalaxy className="text-6xl text-cosmic" />,
      <IoIosPlanet className="text-6xl text-cosmic" />,
      <SiSolana className="text-6xl text-cosmic" />,
      <GiMoonOrbit className="text-6xl text-cosmic" />,
      <FaSatellite className="text-6xl text-cosmic" />,
      <FaSpaceShuttle className="text-6xl text-cosmic" />
    ];
    
    // Use a hash of the title to consistently get the same icon for the same title
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return icons[hash % icons.length];
  };

  return (
    <div className="p-[60px_20px] lg:p-[80px_40px] font-orbitron bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      
      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>
      
      <div
        className={`w-full max-w-7xl mx-auto rounded-[10px] grid lg:grid-cols-2 gap-[60px] items-center ${
          reverse ? "lg:grid-flow-dense" : ""
        }`}
      >
        <motion.div
          className="space-y-[30px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-[28px] lg:text-[42px] font-[700] text-white leading-[35px] lg:leading-[55px] sci-fi-text-glow">
              {title}
            </h2>
          </motion.div>
          
          <motion.div 
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <motion.p 
            className="text-[16px] lg:text-[18px] text-gray-300 font-space leading-relaxed"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleButtonClick}
              className="relative px-8 py-3 font-medium text-white flex items-center overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
              <motion.span 
                className="relative flex items-center"
                whileHover={{ 
                  textShadow: "0 0 8px rgba(135, 206, 235, 0.8)" 
                }}
              >
                <SiSolana className="mr-2" /> {buttonText} <FaArrowCircleRight className="text-skyblue ml-2" />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`flex justify-center ${
            reverse ? "lg:justify-start" : "lg:justify-end"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Replace image with React Icons visualization */}
          <div className="relative w-full max-w-[400px] h-[300px] sci-fi-panel rounded-lg p-6 flex items-center justify-center">
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
              {getRandomIcon()}
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
                <FaRocket className="text-3xl text-purple-400" />
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
  );
}

export default DynamicSection;
