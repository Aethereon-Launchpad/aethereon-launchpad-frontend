// import React from 'react'

import { useState } from "react";

function Pools() {
  const [tab, setTab] = useState(0);
  const items = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));
  return (
    <div className="font-space p-[40px_20px] lg:p-[40px] ">
      <p className="text-[25px] lg:text-[40px] font-[700] text-white">
        {" "}
        Staking Pools
      </p>
      <div className="mt-[20px] flex items-center">
        <button
          onClick={() => setTab(0)}
          className={`${
            tab === 0 ? "bg-primary" : "bg-transparent"
          } rounded-[8px] text-[11px] lg:text-[16px] text-white p-[8px_20px]`}
        >
          Standard Pool
        </button>
        <button
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
        </button>
      </div>
      <div className="w-full mt-[30px]">
        <div className="relative overflow-x-auto  ">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-[12px] lg:text-[16px] text-white   bg-transparent">
              <tr>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Token Type
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  APY
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Pool Reward Period
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Staking Period
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
              {items.map((item, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-[#190E3080]" : "bg-transparent"
                  }`}
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-[700] text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Coinbase
                  </th>
                  <td className="px-6 py-4 min-w-[210px]">7.5% - 15% APY</td>
                  <td className="px-6 py-4 min-w-[210px]">2 years </td>
                  <td className="px-6 py-4 min-w-[210px]">Flexible</td>
                  <td className="px-6 py-4 min-w-[210px]">
                    <div>
                      Entry Fee: 0.5% | <br /> Exit Fee: 1%
                    </div>
                  </td>
                  <td className="px-6 py-4 min-w-[210px]">
                    <div>
                      Primary Reward: $HEX  | <br /> Bonus Reward: $GOV
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
