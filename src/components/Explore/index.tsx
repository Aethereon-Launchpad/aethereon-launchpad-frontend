import { useEffect, useState } from "react";
import SaleCard from "../Global/SaleCard"
import { usePresale } from "../../hooks/web3/usePresale";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { FaSearch, FaRocket, FaSatellite } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { usePageTitle } from "../../hooks/utils";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { GiStarFormation, GiMoonOrbit } from "react-icons/gi";

interface Presale {
  id: string;
  presaleInfo?: {
    projectName: string;
  };
}

function ExploreComp() {
  const { data, error, loading } = usePresale();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Presale[]>([]);
  usePageTitle("Explore IDOs")

  useEffect(() => {
    if (data) {
      const filtered = data.filter((presale: Presale) => {
        const searchLower = searchTerm.toLowerCase();
        const contractAddress = presale.id?.toLowerCase() || '';
        const projectName = presale.presaleInfo?.projectName?.toLowerCase() || '';

        return contractAddress.includes(searchLower) ||
          projectName.includes(searchLower);
      });
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-deepspace/30 p-8 rounded-lg border border-cosmic/20 flex flex-col items-center"
          animate={{ boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.4)', '0 0 0px rgba(108, 92, 231, 0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="relative mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <SiSolana className="text-4xl text-cosmic" />
            <motion.div
              className="absolute -top-1 -right-1 text-xs text-skyblue"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GiStarFormation />
            </motion.div>
          </motion.div>

          <h3 className="text-xl font-bold text-white font-orbitron sci-fi-text-glow mb-2">Loading Launchpad</h3>
          <p className="text-gray-400 text-sm mb-4">Discovering stellar opportunities...</p>

          <Preloader
            use={ThreeDots}
            size={40}
            strokeWidth={6}
            strokeColor="#6c5ce7"
            duration={2000}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (error.message) {
    console.error("Featured IDO Error:", error.message);
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 p-8 text-center h-[300px]"
        id="upcomingido"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-deepspace/30 p-8 rounded-lg border border-red-500/30 flex flex-col items-center max-w-md"
          animate={{ boxShadow: ['0 0 0px rgba(255, 99, 71, 0.3)', '0 0 20px rgba(255, 99, 71, 0.4)', '0 0 0px rgba(255, 99, 71, 0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="bg-red-500/20 p-4 rounded-full mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaRocket className="h-8 w-8 text-red-500" style={{ transform: 'rotate(45deg)' }} />
          </motion.div>

          <h3 className="text-xl font-bold text-white font-orbitron sci-fi-text-glow mb-2">Launch Sequence Aborted</h3>
          <p className="text-gray-400 text-sm mb-6">
            We're having trouble loading the launchpad data. Please try refreshing the page or check back later.
          </p>

          <motion.button
            onClick={() => window.location.reload()}
            className="relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
            <motion.span
              className="relative flex items-center justify-center gap-2 px-6 py-2 font-orbitron"
              whileHover={{
                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
              }}
            >
              Restart System
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="p-[40px_20px] font-space lg:p-[40px] mx-auto flex flex-col items-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] right-[5%] text-cosmic/20 text-4xl"
          animate={{
            y: [0, 15, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <GiStarFormation />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[10%] text-cosmic/20 text-3xl"
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <GiMoonOrbit />
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col items-center text-white text-center max-w-4xl"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-4 bg-cosmic/20 p-3 rounded-full inline-flex"
          animate={{
            boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SiSolana className="text-2xl text-cosmic" />
        </motion.div>

        <motion.h1
          className="text-[32px] lg:text-[56px] font-[700] leading-[36px] lg:leading-[60px] font-orbitron sci-fi-text-glow mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover Stellar Opportunities
        </motion.h1>

        <motion.p
          className="text-[14px] lg:text-[19px] text-skyblue max-w-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Explore the Solana ecosystem's most promising projects and secure your allocation in the next generation of blockchain innovation
        </motion.p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        className="w-full max-w-md mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <FaSearch className="text-cosmic" />
            </motion.div>
          </div>

          <motion.div
            className="relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic/10 rounded-lg border border-cosmic/30"></span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name or contract address..."
              className="w-full pl-12 pr-12 py-4 bg-transparent rounded-lg
                       text-white placeholder-gray-400 focus:outline-none relative z-10"
              aria-label="Search presales"
            />
          </motion.div>

          {searchTerm && (
            <motion.button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-cosmic
                       hover:text-white transition-colors"
              aria-label="Clear search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoClose size={20} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Results Section */}
      <motion.div
        className="w-full mx-auto mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredData.length > 0 ? (
            filteredData.map((presale: Presale, index: number) => (
              <motion.div
                key={`${presale.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <SaleCard presale={presale} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {searchTerm ? (
                <motion.div
                  className="bg-deepspace/30 p-8 rounded-lg border border-cosmic/20 max-w-md mx-auto"
                  animate={{ boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    className="bg-cosmic/10 p-4 rounded-full inline-flex mb-4"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <FaSearch className="text-2xl text-cosmic" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white font-orbitron sci-fi-text-glow mb-2">No Results Found</h3>
                  <p className="text-gray-400 mb-4">No presales found matching "{searchTerm}"</p>

                  <motion.button
                    onClick={() => setSearchTerm("")}
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                    <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                    <motion.span
                      className="relative flex items-center justify-center gap-2 px-6 py-2 font-orbitron"
                      whileHover={{
                        textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                      }}
                    >
                      Clear Search
                    </motion.span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-deepspace/30 p-8 rounded-lg border border-cosmic/20 max-w-md mx-auto"
                  animate={{ boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    className="bg-cosmic/10 p-4 rounded-full inline-flex mb-4"
                    animate={{
                      rotate: 360,
                      boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <SiSolana className="text-2xl text-cosmic" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white font-orbitron sci-fi-text-glow mb-2">Coming Soon</h3>
                  <p className="text-gray-400">
                    No upcoming or active IDOs at the moment. Check back soon for new opportunities.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ExploreComp
