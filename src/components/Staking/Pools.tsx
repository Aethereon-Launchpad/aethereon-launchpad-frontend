// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy, FaSearch } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_STAKING_POOLS } from "../../graphql/queries";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import toast from 'react-hot-toast';
import { noOfDays } from "../../utils/tools";
import { getAllStakingPoolData } from "../../utils/web3/actions";

function Pools() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<{ message: string }>({ message: "" });

  // const { loading, error, data } = useQuery(GET_STAKING_POOLS, {
  //   context: {
  //     clientName: "staking"
  //   }
  // });

  async function loadData() {
    setLoading(true);
    try {
      const stakingPools = await getAllStakingPoolData();
      setData(stakingPools);
    } catch (error) {
      console.error(error);
      setError((prevError) => ({ ...prevError, message: "Failed to load staking pools" }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied staking pool address!');
      })
      .catch(() => {
        toast.error('Failed to copy address');
      });
  };

  // Filter staking pools based on search term
  const filteredPools = data.filter((pool: any) =>
    pool.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    return <div className="text-red-500 text-center">Error loading staking pools: {error.message}</div>;
  }

  return (
    <div className="font-space p-[40px_20px] lg:p-[40px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <p className="text-[25px] lg:text-[40px] font-[700] text-white mb-4 lg:mb-0">
          Staking Pools
        </p>
        
        {/* Search Input */}
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Contract Address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#190E3080] border border-[#FFFFFF1A] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="mt-[20px] flex items-center">
        <button
          onClick={() => setTab(0)}
          className={`${tab === 0 ? "bg-primary" : "bg-transparent"
            } rounded-[8px] text-[11px] lg:text-[16px] text-white p-[8px_20px]`}
        >
          Standard Pool
        </button>
      </div>

      <div className="w-full mt-[30px]">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-[12px] lg:text-[16px] text-white bg-transparent">
              <tr>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Staking Pool
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  APY
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Reward Intervals
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Next Reward
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Token Fees
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Reward Token
                </th>
                <th>Total Staked</th>
                <th>Available Rewards</th>
              </tr>
            </thead>
            <tbody className="mt-[20px]">
              {filteredPools.length > 0 ? (
                filteredPools.map((item: any, index: number) => (
                  <tr
                    className={`${index % 2 === 0 ? "bg-[#190E3080]" : "bg-transparent"
                      } cursor-pointer hover:bg-[#190E3099] transition-colors`}
                    key={item.id}
                    onClick={() => navigate(`/staking-pool/${item.id}`)}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-[700] text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <span className="flex items-center gap-x-3">
                        <span className="truncate max-w-[100px]">{item.id}</span>
                        <FaRegCopy
                          color="#fff"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.id);
                          }}
                          className="cursor-pointer hover:opacity-80"
                        />
                      </span>
                    </th>
                    <td className="px-6 py-4 min-w-fit">{item.apyRate}% APY</td>
                    <td className="px-6 py-4 min-w-fit">
                      {`${noOfDays(item.withdrawalIntervals)} Days`}
                    </td>
                    <td className="px-6 py-4 min-w-fit">Recurring Rewards</td>
                    <td className="px-6 py-4 min-w-fit">
                      <div>
                        Entry Fee: {item.stakeFeePercentage}% | <br /> Exit Fee: {item.withdrawalFeePercentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 min-w-fit">
                      <div>
                        Stake Token: {item.stakeToken.symbol} | <br /> Reward Token: {item.rewardToken.symbol}
                      </div>
                    </td>
                    <td className="px-6 py-4 min-w-fit">{item.totalStaked} {item.stakeToken.symbol}</td>
                    <td className="px-6 py-4 min-w-fit">{Number(item.totalRewardable).toFixed(0)} {item.rewardToken.symbol}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                    No staking pools found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pools;
