// import React from 'react'
import { useEffect, useState } from "react";
import SaleCard from "../Global/SaleCard"
import { usePresale } from "../../hooks/web3/usePresale";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { usePageTitle } from "../../hooks/utils";

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
      <div className="flex justify-center items-center h-[200px]">
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
    console.error("Featured IDO Error:", error.message);
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center" id="upcomingido">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-red-500 text-xl font-medium">Oops! Something went wrong</h3>
        <p className="text-gray-400 max-w-md">
          We're having trouble loading the featured IDOs. Please try refreshing the page or check back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        >
          Refresh Page
        </button>
      </div>
    )
  }

  return (
    <div className="p-[40px_20px] font-space lg:p-[40px] mx-auto flex flex-col items-start">
      <div className="flex flex-col items-start text-white">
        <p className="text-[32px] lg:text-[56px] font-[700] leading-[36px] lg:leading-[60px]">Find Your Next<br /> Investment Opportunity</p>
        <p className="text-[14px] lg:text-[19px] text-[#A1A1AA]">
          Search by project name or contract address to discover promising IDOs
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-md mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by contract address or project name..."
            className="w-full pl-10 pr-12 py-3 bg-[#190E3080] border border-[#FFFFFF1A] rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:border-primary 
                     transition-colors"
            aria-label="Search presales"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 
                       hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full mx-auto">
        <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-[40px]">
          {filteredData.length > 0 ? (
            filteredData.map((presale: Presale, index: number) => (
              <SaleCard key={`${presale.id}-${index}`} presale={presale} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              {searchTerm ? (
                <div className="text-gray-400 space-y-2">
                  <p>No presales found matching "{searchTerm}"</p>
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="text-primary hover:text-primary-600 underline"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <p className="text-gray-400">
                  No upcoming or active IDOs at the moment
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreComp
