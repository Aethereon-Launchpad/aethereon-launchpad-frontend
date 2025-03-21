// import React from 'react'
// import { FaArrowCircleRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function StakeHero() {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden hero-bg font-space">
      {/* <img src="/der-rows.svg" className=" w-full h-[400px]" alt="" /> */}
      <div className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[40px] bg-[#8949FF33]"></div>
      <div className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[40px] bg-[#8949FF33] hidden lg:block"></div>
      <div className=" text-white min-w-full  items-center flex flex-col lg:flex-row justify-between p-[40px_20px] lg:p-[40px]">
        <div className="space-y-[15px] lg:space-y-[30px]">
          <p className="text-[35px] lg:text-[65px] font-[700] leading-[45px] lg:leading-[70px]">
            Maximize Your <span className="text-primary">Rewards</span>
            <br className="hidden lg:block" /> Through Staking
          </p>
          <p className="text-[18px] lg:text-[22px] leading-[25px] lg:leading-[27px] mt-[5px] lg:mt-[10px]">
            Stake and participate in yield farming to unlock{" "}
            <br className="hidden lg:block" /> exclusive platform benefits and
            passive income.
          </p>
          {/* <button onClick={() => navigate("/staking-pool/new")} className="bg-primary p-[8px_20px] mt-[20px] font-[500] text-[16px] lg:text-[20px] text-white rounded-full flex items-center space-x-[5px]">
            <span>Create New Stake Pool</span>

            <FaArrowCircleRight className="text-white" />
          </button> */}
        </div>
        <div className="mt-[40px] lg:mt-0 flex items-center justify-end">
          <img src="/stakehero.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default StakeHero;
