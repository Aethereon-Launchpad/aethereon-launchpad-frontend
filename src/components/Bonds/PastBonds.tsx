import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBond } from "../../hooks/web3/useBond";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";
import { format } from "date-fns";
import CurrentChain from "../Presale/CurrentChain";

function PastBonds() {
  const { data, error, loading } = useBond();
  const [filteredBonds, setFilteredBonds] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const currentTime = Date.now();
      const filtered = data.filter((bond: any) => {
        const endTime = Number(bond.saleEndTime) * 1000;
        return !isBefore(currentTime, endTime);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px] p-[40px_20px] lg:p-[40px]">
        <Preloader
          use={ThreeDots}
          size={60}
          strokeWidth={6}
          strokeColor="#5325A9"
          duration={2000}
        />
      </div>
    );
  }

  if (error.message) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center p-[40px_20px] lg:p-[40px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-red-500 text-xl font-medium">Oops! Something went wrong</h3>
        <p className="text-gray-400 max-w-md">
          We're having trouble loading the past bonds. Please try refreshing the page or check back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="font-space flex flex-col p-[40px_20px] lg:p-[40px]">
      <div className="flex flex-col items-start text-white mb-8">
        <h1 className="text-[32px] lg:text-[56px] font-[700] leading-[36px] lg:leading-[60px]">
          Past Bonds
        </h1>
      </div>

      <div className="w-full bg-[#0D0D0D] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="p-4 text-gray-400 font-normal">Project</th>
                <th className="p-4 text-gray-400 font-normal">Raised</th>
                <th className="p-4 text-gray-400 font-normal">Discount</th>
                <th className="p-4 text-gray-400 font-normal">Ended</th>
                <th className="p-4 text-gray-400 font-normal">Chain</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((bond: any, index: number) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/deals/bonds/${bond?.bondInfo?.projectName.toLowerCase()}`)}
                    className="border-b border-gray-800 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={bond.bondInfo?.images?.logo}
                          alt={bond.bondInfo?.projectName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-[#FAFAFA]">
                            {bond.bondInfo?.projectName}
                          </p>
                          <p className="text-sm text-[#ACBBCC]">
                            {bond.saleToken?.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#FAFAFA]">
                      {parseFloat(bond.totalSold).toLocaleString()} {bond.saleToken?.symbol}
                    </td>
                    <td className="p-4 text-[#ACBBCC]">
                      {(bond.initialDiscountPercentage).toFixed()}% to {(bond.finalDiscountPercentage).toFixed()}%
                    </td>
                    <td className="p-4 text-[#FAFAFA]">
                      {format(new Date(bond.saleEndTime * 1000), "dd MMM, HH:mm")}
                    </td>
                    <td className="p-4">
                      <CurrentChain chainId="84532" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-[#ACBBCC]">
                    No completed bonds at the moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBonds.length > itemsPerPage && <Pagination />}
    </div>
  );
}

export default PastBonds;
