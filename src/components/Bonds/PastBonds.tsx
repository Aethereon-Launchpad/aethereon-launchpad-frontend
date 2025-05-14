import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBond } from "../../hooks/web3/useBond";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore, isAfter } from "date-fns";
import { format } from "date-fns";
import CurrentChain from "../Presale/CurrentChain";
import { getClient } from "../../utils/web3/client";
import { motion } from 'framer-motion';
import { SiSolana } from 'react-icons/si';
import { FaExclamationCircle, FaHistory, FaArchive } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { GiStarFormation } from 'react-icons/gi';
import BondCard from './BondCard';

function PastBonds() {
  const { data, error, loading } = useBond(null, { polling: false });
  const [filteredBonds, setFilteredBonds] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const currentTime = Date.now();
      const filtered = data.filter((bond: any) => {
        const endTime = Number(bond.saleEndTime) * 1000;
        return isAfter(currentTime, endTime);
      });
      setFilteredBonds(filtered);
    }
  }, [data]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBonds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBonds.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const PaginationButton = ({ page, isActive }: { page: number, isActive: boolean }) => (
    <button
      onClick={() => paginate(page)}
      className={`px-3 py-1 mx-1 rounded ${isActive
        ? 'bg-primary text-white'
        : 'bg-[#1A1A1A] text-gray-400 hover:bg-primary/20'
        }`}
    >
      {page}
    </button>
  );

  const Pagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pages.push(
          <PaginationButton
            key={i}
            page={i}
            isActive={currentPage === i}
          />
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        pages.push(
          <span key={i} className="px-2 text-gray-400">...</span>
        );
      }
    }
    return (
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 text-gray-400 bg-[#1A1A1A] rounded hover:bg-primary/20 disabled:opacity-50 disabled:hover:bg-[#1A1A1A]"
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-gray-400 bg-[#1A1A1A] rounded hover:bg-primary/20 disabled:opacity-50 disabled:hover:bg-[#1A1A1A]"
        >
          Next
        </button>
      </div>
    );
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-[400px] bg-deepspace/30 border border-cosmic/20 rounded-lg p-8 relative m-[40px_20px] lg:m-[40px]"
        animate={{
          boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
          borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <IoTime className="text-5xl text-cosmic" />
        </motion.div>

        <motion.h3
          className="text-xl font-orbitron text-white mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Past Campaigns
        </motion.h3>

        <motion.div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-cosmic"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-skyblue/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 5}px`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              <GiStarFormation />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error.message) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-6 p-8 text-center bg-deepspace/30 border border-red-500/30 rounded-lg relative m-[40px_20px] lg:m-[40px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-red-500/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-red-500/50 rounded-bl-lg"></div>

        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-red-500 text-5xl"
        >
          <FaExclamationCircle />
        </motion.div>

        <div className="space-y-2">
          <motion.h3
            className="text-2xl font-orbitron text-white"
            animate={{ textShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.5)', '0 0 0px rgba(255, 255, 255, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Historical Records Unavailable
          </motion.h3>

          <p className="text-white/80 font-space">
            {error.message || "Failed to retrieve past bond campaigns. Please try again later."}
          </p>
        </div>

        <motion.button
          className="bg-gradient-to-r from-cosmic/80 to-cosmic px-6 py-3 rounded-md text-white font-orbitron flex items-center gap-2"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
        >
          <FaHistory className="text-white" />
          <span>Reload History</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="font-space p-[40px_20px] lg:p-[40px] bg-gradient-to-b from-deepspace/0 to-deepspace/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-40 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid lines */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="flex flex-col items-center gap-3 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
          <FaArchive className="text-cosmic text-4xl mb-2" />
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

        <motion.h1
          className="text-[32px] lg:text-[56px] text-primary font-bold leading-[36px] lg:leading-[60px] font-orbitron text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Past <span className="text-cosmic">Bond Campaigns</span>
        </motion.h1>

        <motion.div
          className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <motion.p
          className="text-lg text-white/80 max-w-2xl text-center font-space"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore historical bond campaigns that have successfully concluded. These represent projects that have completed their fundraising phases.
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid gap-[40px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[40px]">
          {filteredBonds.length > 0 ? (
            filteredBonds.map((bond: any, index: number) => (
              <motion.div
                key={`${bond.id}-${index}`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <BondCard bond={bond} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12 bg-deepspace/30 border border-cosmic/20 rounded-lg relative p-8"
              variants={itemVariants}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative inline-block mb-4"
              >
                <FaArchive className="text-6xl text-cosmic" />
              </motion.div>

              <motion.h3
                className="text-2xl font-orbitron text-white mb-4"
                animate={{ textShadow: ['0 0 0px rgba(108, 92, 231, 0)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                No Past Bond Campaigns
              </motion.h3>

              <motion.p
                className="text-white/70 max-w-md mx-auto font-space"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                There are no completed bond campaigns in our records. Check back after our current campaigns have concluded.
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {filteredBonds.length > itemsPerPage && <Pagination />}
    </div>
  );
}

export default PastBonds;
