import React from "react";
import { LuSearch } from "react-icons/lu";

function PastBonds() {
  return (
    <div className="p-[40px_20px] font-space lg:p-[40px]">
      <p className="text-[20px] lg:text-[30px] text-white font-[600]">Past Deals</p>
      <div className="w-full mt-[30px]">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-[12px] border-primary border lg:text-[16px] text-white   bg-transparent">
              <tr>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  <div className="flex items-center bg-gray-800 rounded-[5px] overflow-hidden px-[10px]">
                    <input
                      type="text"
                      placeholder="Search Project"
                      className="font-[500] bg-transparent h-[40px] w-full text-white placeholder:text-white  outline-none "
                      name=""
                      id=""
                    />
                    <LuSearch className="text-white text-[20px]" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Raised
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Ended
                </th>
                <th scope="col" className="px-6 py-3 min-w-[210px]">
                  Chain
                </th>
              </tr>
            </thead>
            <tbody className="mt-[20px]">
              <tr className="cursor-pointer">
                <th
                  scope="row"
                  className="px-6 py-4 font-[700] text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-start space-x-[8px]">
                    <div className="h-[40px] w-[40px] rounded-[5px] border border-white"></div>
                    <div>
                      <p className="font-[600]">Codex Chain -II</p>
                      <p className="font-[400] text-[14px]">CDX</p>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 min-w-fit"> 454,460k CDX</td>
                <td className="px-6 py-4 min-w-fit">20% to 10%</td>
                <td className="px-6 py-4 min-w-fit">14 Feb, 14:00</td>
                <td className="px-6 py-4 min-w-fit">
                  <div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PastBonds;
