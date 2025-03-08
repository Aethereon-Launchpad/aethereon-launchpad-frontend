// import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";


function GovHero() {
  return (
    <div className="relative overflow-hidden hero-bg font-space">
      {/* <img src="/der-rows.svg" className=" w-full h-[400px]" alt="" /> */}
      <div className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[40px] bg-[#8949FF33]"></div>
      <div className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[40px] bg-[#8949FF33]"></div>
      <div className=" text-white min-w-full  items-center grid lg:grid-cols-2 p-[40px_20px] lg:p-[60px_40px]">
        <div>
          <p className="text-[40px] lg:text-[50px] font-[700] leading-[45px] lg:leading-[65px]">Shape the Future of DerHex <br className="hidden lg:block" /> with Community Governance </p>
          <p className="text-[18px] lg:text-[20px] leading-[25px] lg:leading-[27px] mt-[5px] lg:mt-[10px]">Vote on critical platform updates, propose new features, and participate in  a decentralized governance model that prioritizes community input.</p>
          <a href="#currentProposals" className="bg-primary p-[8px_20px] mt-[20px] font-[500] text-[20px] text-white rounded-full flex items-center space-x-[5px] max-w-fit">
            <span>Vote Now</span>
            <FaArrowCircleRight className="text-white" />
          </a>
        </div>
        <div className="mt-[40px] lg:mt-0 flex items-center justify-center">
          <img src="/gov-hero.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default GovHero