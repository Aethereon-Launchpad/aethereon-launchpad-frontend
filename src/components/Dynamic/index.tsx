// import React from 'react'
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

function Dynamic() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col font-space p-[40px_20px] text-white items-center justify-center">
      <p className="text-[30px] lg:text-[70px] font-[500] leading-[35px] lg:leading-[75px] text-center">
        Unlock Dynamic Rewards with <br className="hidden lg:block" /> Longer
        Lock Periods
      </p>
      <p className="text-[15px] text-center lg:text-start  lg:text-[22px] mt-[10px] lg:mt-[5px]">
        The longer you lock your stake, the higher your multiplier!
      </p>

      <img src="./unlock.svg" className="mt-[5px]" alt="" />

      <div className="mt-[20px] w-full lg:w-[50%] grid lg:grid-cols-3 gap-[20px]">
        <div className="lg:col-span-2 relative">
          <p>Lock Period</p>

          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px] flex items-center justify-between px-[10px]"
          >
            <p>1 Month (+1x)</p>
            <FaChevronDown className="size-4 fill-white/60" />
          </div>
          {open && (
            <div className="absolute w-full bg-black top-[90px] z-[20px] border  ">
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer p-[8px_10px] border-b"
              >
                2 Months
              </div>
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer p-[8px_10px] border-b"
              >
                2 Months
              </div>
            </div>
          )}
        </div>
        <div className="">
          <p>Multiplier Bonus</p>
          <input
            type="text"
            className="mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px]"
          />
        </div>
        <div className="lg:col-span-2">
          <p>Lock Period</p>
          <input
            type="text"
            className="mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px]"
          />
        </div>
        <div className="">
          <p>Estimated Rewards</p>
          <input
            type="text"
            className="mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px]"
          />
        </div>
        <button className="bg-primary lg:col-span-3 text-white font-[500] items-center justify-center h-[50px] rounded-[8px]">
          Lock My Stake
        </button>
      </div>
    </div>
  );
}

export default Dynamic;
