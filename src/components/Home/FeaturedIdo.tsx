import { useEffect, useState } from "react";
import SaleCard from "../Global/SaleCard";
import { usePresale } from "../../hooks/web3/usePresale";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";
import { motion } from "framer-motion";
import { FaRocket, FaExclamationCircle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function FeaturedIdo() {
  const { data, error, loading } = usePresale(null, { polling: false });
  const [filteredSales, setFilteredSales] = useState<[]>([]);

  useEffect(() => {
    if (data) {
      const currentTime = Date.now();
      const filtered = data.filter((presale: any) => {
        // const startTime = Number(presale.startTime) * 1000;
        const endTime = (Number(presale.endTime) + Number(presale.withdrawDelay)) * 1000;
        return isBefore(currentTime, endTime) // Show presales that haven't ended yet
      });
      setFilteredSales(filtered);
    }
  }, [data]);

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
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Preloader
            use={ThreeDots}
            size={60}
            strokeWidth={6}
            strokeColor="#6c5ce7"
            duration={2000}
          />
        </motion.div>
      </div>
    );
  }

  if (error.message) {
    console.error("Featured IDO Error:", error.message);
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 p-8 text-center"
        id="upcomingido"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaExclamationCircle className="text-6xl text-red-500" />
        <h3 className="text-red-500 text-xl font-medium font-orbitron">Oops! Something went wrong</h3>
        <p className="text-gray-400 max-w-md font-space">
          We're having trouble loading the featured IDOs. Please try refreshing the page or check back later.
        </p>
        <motion.button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-lg bg-cosmic hover:bg-cosmic/80 text-white transition-colors font-orbitron"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh Page
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="font-orbitron flex flex-col p-[60px_20px] lg:p-[60px] bg-gradient-to-b from-deepspace/10 to-deepspace/30" id="upcomingido">
      <motion.div
        className="flex flex-col items-start text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-2">
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
          >
            <FaRocket className="text-cosmic text-4xl" />
          </motion.div>
          <h1 className="text-[32px] lg:text-[56px] font-[700] leading-[36px] lg:leading-[60px] sci-fi-text-glow">
            Featured <span className="text-cosmic">Solana</span> IDOs
          </h1>
        </div>
        <p className="text-[16px] lg:text-[19px] text-[#CDCDCD] mt-[10px] font-space max-w-3xl">
          Don't miss your chance to participate in the next generation of Solana projects. Our curated selection offers early access to innovative blockchain solutions.
        </p>
      </motion.div>

      <motion.div
        className="w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-[40px]">
          {filteredSales.length > 0 ? (
            filteredSales.map((presale: any, index: any) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(108, 92, 231, 0.3)",
                  transition: { duration: 0.3 }
                }}
                className="sci-fi-border"
              >
                <SaleCard presale={presale} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center p-12 sci-fi-panel rounded-lg"
              variants={itemVariants}
            >
              <SiSolana className="text-6xl text-cosmic mx-auto mb-4" />
              <h3 className="text-2xl font-medium sci-fi-text-glow mt-4">No Upcoming Solana IDOs</h3>
              <p className="text-[#CDCDCD] mt-4 max-w-md mx-auto font-space">
                There are no upcoming Solana IDOs at the moment. Please check back later for new opportunities or subscribe to our newsletter to get notified.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default FeaturedIdo;
