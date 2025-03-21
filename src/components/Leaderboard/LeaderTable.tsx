// import React from 'react'

import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function LeaderTable() {
  // const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const items = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));
  return (
    <div className="p-[40px_20px] font-space lg:p-[40px]">
      <div className="flex flex-col lg:flex-row  items-start lg:items-center justify-between text-white">
        <p className="text-white text-[40px] font-[700]">Leaderboard</p>
        <div className="bg-[#0C0718] space-x-[8px] p-[5px_10px] rounded-[8px] flex items-center w-full lg:w-fit justify-center mt-[10px] lg:mt-0">
          <button
            onClick={() => setTab(0)}
            className={`${tab === 0 ? "bg-[#1A073E]" : ""
              }  p-[4px_10px] rounded-[8px]`}
          >
            1h
          </button>
          <button
            onClick={() => setTab(1)}
            className={`${tab === 1 ? "bg-[#1A073E]" : ""
              }  p-[4px_10px] rounded-[8px]`}
          >
            6h
          </button>
          <button
            onClick={() => setTab(2)}
            className={`${tab === 2 ? "bg-[#1A073E]" : ""
              }  p-[4px_10px] rounded-[8px]`}
          >
            24h
          </button>
          <button
            onClick={() => setTab(3)}
            className={`${tab === 3 ? "bg-[#1A073E]" : ""
              }  p-[4px_10px] rounded-[8px]`}
          >
            7d
          </button>
          <button
            onClick={() => setTab(4)}
            className={`${tab === 4 ? "bg-[#1A073E]" : ""
              }  p-[4px_10px] rounded-[8px]`}
          >
            30d
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto  mt-[20px] ">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-[12px] lg:text-[16px] text-white   bg-transparent">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[210px]">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 min-w-[210px]">
                Wallet Address
              </th>
              <th scope="col" className="px-6 py-3 min-w-[210px]">
                Staked Amount
              </th>
              <th scope="col" className="px-6 py-3 min-w-[210px]">
                Rank Tier
              </th>
              <th scope="col" className="px-6 py-3 min-w-[210px]">
                Multiplier
              </th>
              <th scope="col" className="px-6 py-3 min-w-[210px]">
                Reward Earned
              </th>
            </tr>
          </thead>
          <tbody className="mt-[20px]">
            {items.map((item, index) => (
              <tr
                // onClick={()=> navigate("/staking-pool/dvbtnyu")}
                className={`${index % 2 === 0 ? "bg-[#190E3080]" : "bg-transparent"
                  } cursor-pointer`}
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-[700] text-gray-900 whitespace-nowrap dark:text-white"
                >
                  🥇 {index + 1}
                </th>
                <td className="px-6 py-4 min-w-[210px]">0x12222333...789</td>
                <td className="px-6 py-4 min-w-[210px]"> 12,345 $HEX</td>
                <td className="px-6 py-4 min-w-[210px] text-[#E8A90E]">
                  Master Miner
                </td>
                <td className="px-6 py-4 min-w-[210px] text-[#28C76B] ">
                  2.5x{" "}
                </td>
                <td className="px-6 py-4 min-w-[210px]">
                  <div>12,345 $HEX</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderTable;
