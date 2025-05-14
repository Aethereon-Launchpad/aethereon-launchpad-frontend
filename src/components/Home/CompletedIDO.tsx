import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePresale } from "../../hooks/web3/usePresale";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";
import { motion } from "framer-motion";
import { FaHistory, FaExclamationCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function CompletedIDO() {
  const { data, error, loading } = usePresale();
  const [filteredSales, setFilteredSales] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const currentTime = Date.now();
      const filtered = data.filter((presale: any) => {
        const endTime = (Number(presale.endTime) + Number(presale.withdrawDelay)) * 1000;
        return !isBefore(currentTime, endTime);
      });
      setFilteredSales(filtered);
    }
  }, [data]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const PaginationButton = ({ page, isActive }: { page: number, isActive: boolean }) => (
    <motion.button
      onClick={() => paginate(page)}
      className={`px-3 py-1 mx-1 rounded-lg ${isActive
        ? 'bg-cosmic text-white sci-fi-text-glow'
        : 'bg-deepspace/50 text-gray-300 hover:bg-cosmic/20 border border-cosmic/30'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {page}
    </motion.button>
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
          <span key={i} className="px-2 text-skyblue">...</span>
        );
      }
    }
    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
        <motion.button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 text-white bg-deepspace/50 rounded-lg border border-cosmic/30 hover:bg-cosmic/20 disabled:opacity-50 disabled:hover:bg-deepspace/50 flex items-center"
          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        >
          <FaHistory className="mr-1 text-xs" /> Previous
        </motion.button>
        {pages}
        <motion.button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-white bg-deepspace/50 rounded-lg border border-cosmic/30 hover:bg-cosmic/20 disabled:opacity-50 disabled:hover:bg-deepspace/50 flex items-center"
          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        >
          Next <FaHistory className="ml-1 text-xs rotate-180" />
        </motion.button>
      </div>
    );
  };

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
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaExclamationCircle className="text-6xl text-red-500" />
        <h3 className="text-red-500 text-xl font-medium font-orbitron">Oops! Something went wrong</h3>
        <p className="text-gray-400 max-w-md font-space">
          We're having trouble loading the completed IDOs. Please try refreshing the page or check back later.
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
    );
  }

  return (
    <div className="font-orbitron flex flex-col p-[60px_20px] lg:p-[60px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
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
            <FaHistory className="text-cosmic text-4xl" />
          </motion.div>
          <h1 className="text-[32px] lg:text-[56px] font-[700] leading-[36px] lg:leading-[60px] sci-fi-text-glow">
            Completed <span className="text-cosmic">Solana</span> IDOs
          </h1>
        </div>
        <p className="text-[16px] lg:text-[18px] text-[#CDCDCD] mt-[10px] font-space max-w-3xl">
          Explore our track record of successful Solana token launches. These projects have completed their initial fundraising phase.
        </p>
      </motion.div>

      <motion.div
        className="w-full sci-fi-panel rounded-xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-cosmic/20">
                <th className="p-4 text-skyblue font-medium">Project</th>
                <th className="p-4 text-skyblue font-medium">Total Raise</th>
                <th className="p-4 text-skyblue font-medium">Participants</th>
                <th className="p-4 text-skyblue font-medium">Status</th>
                <th className="p-4 text-skyblue font-medium">Chain</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((presale: any, index: number) => (
                  <motion.tr
                    key={index}
                    onClick={() => navigate(`/deals/launchpad/${presale?.presaleInfo?.projectName.toLowerCase()}`)}
                    className="border-b border-cosmic/10 hover:bg-cosmic/5 transition-colors cursor-pointer"
                    variants={itemVariants}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={presale.presaleInfo?.images?.logo}
                          alt={presale.presaleInfo?.projectName}
                          className="w-10 h-10 rounded-full border-2 border-cosmic/30"
                        />
                        <div>
                          <p className="font-medium text-[#FAFAFA] sci-fi-text-glow">
                            {presale.presaleInfo?.projectName}
                          </p>
                          <p className="text-sm text-skyblue font-space">
                            {presale.saleToken?.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#FAFAFA] font-space">
                      {Number(presale.totalPaymentReceived).toLocaleString()} {presale.paymentToken?.symbol}
                    </td>
                    <td className="p-4 text-[#CDCDCD] font-space">
                      {Number(presale.purchaserCount).toLocaleString()} Investors
                    </td>
                    <td className="p-4 text-[#FAFAFA]">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center w-fit ${presale.isSoftCapReached
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                        }`}>
                        {presale.isSoftCapReached ?
                          <><FaCheckCircle className="mr-1" /> Success</> :
                          <><FaTimesCircle className="mr-1" /> Failed</>
                        }
                      </span>
                    </td>
                    <td className="p-4">
                      <SiSolana className="text-cosmic text-xl" />
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr variants={itemVariants}>
                  <td colSpan={5} className="text-center p-12 text-[#CDCDCD] font-space">
                    <SiSolana className="text-4xl text-cosmic mx-auto mb-4" />
                    <p className="text-xl sci-fi-text-glow mb-2">No completed IDOs at the moment</p>
                    <p>Check back later for our track record of successful launches</p>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredSales.length > itemsPerPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Pagination />
        </motion.div>
      )}
    </div>
  );
}

export default CompletedIDO;
