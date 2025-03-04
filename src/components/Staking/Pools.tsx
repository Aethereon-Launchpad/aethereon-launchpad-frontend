// import React from 'react'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_STAKING_POOLS } from "../../graphql/queries";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import toast from 'react-hot-toast';
import { noOfDays } from "../../utils/tools";

function Pools() {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0);

  const { loading, error, data } = useQuery(GET_STAKING_POOLS, {
    context: {
      clientName: "staking"
    }
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied staking pool address!');
      })
      .catch(() => {
        toast.error('Failed to copy address');
      });
  };

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

  if (error) {
    return <div className="text-red-500 text-center">Error loading staking pools: {error.message}</div>;
  }

  const stakingPools = data?.stakingPools || []

  return (
    <div className="font-space p-[40px_20px] lg:p-[40px]">
      <p className="text-[25px] lg:text-[40px] font-[700] text-white">
        {" "}
        Staking Pools
      </p>
      <div className="mt-[20px] flex items-center">
        <button
          onClick={() => setTab(0)}
          className={`${tab === 0 ? "bg-primary" : "bg-transparent"
            } rounded-[8px] text-[11px] lg:text-[16px] text-white p-[8px_20px]`}
        >
          Standard Pool
        </button>
        {/* <button
          onClick={() => setTab(1)}
          className={`${
            tab === 1 ? "bg-primary" : "bg-transparent"
          } rounded-[8px] text-[11px] lg:text-[16px] text-white p-[8px_20px]`}
        >
          Reward Pool
        </button>
        <button
          onClick={() => setTab(2)}
          className={`${
            tab === 2 ? "bg-primary" : "bg-transparent"
          } rounded-[8px] text-white text-[11px] lg:text-[16px] p-[8px_20px]`}
        >
          Dynamic Pool
        </button> */}
      </div>
      <div className="w-full mt-[30px]">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-[12px] lg:text-[16px] text-white   bg-transparent">
              <tr>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Staking Pool
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  APY
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Pool Reward Period
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Next Reward
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Token Fees
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Reward Type
                </th>
              </tr>
            </thead>
            <tbody className="mt-[20px]">
              {stakingPools.map((item: any, index: number) => (
                <tr
                  className={`${index % 2 === 0 ? "bg-[#190E3080]" : "bg-transparent"
                    } cursor-pointer`}
                  key={item.id}
                  onClick={() => navigate(`/stake-farm/${item.id}`)}
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
                  <td className="px-6 py-4 min-w-[210px]">{item.apyRate}% APY</td>
                  <td className="px-6 py-4 min-w-[210px]">
                    {index === 0 || index === 1 ? "-" : `${noOfDays(item.withdrawalIntervals)} Days`}
                  </td>
                  <td className="px-6 py-4 min-w-[210px]">Recurring Rewards</td>
                  <td className="px-6 py-4 min-w-[210px]">
                    <div>
                      Entry Fee: {item.stakingFeePercentage}% | <br /> Exit Fee: {item.withdrawalFeePercentage}%
                    </div>
                  </td>
                  <td className="px-6 py-4 min-w-[210px]">
                    <div>
                      Primary Reward: {item.stakeToken.symbol}  | <br /> Bonus Reward: {item.rewardToken.symbol}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pools;
