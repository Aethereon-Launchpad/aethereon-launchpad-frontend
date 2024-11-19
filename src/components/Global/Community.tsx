// import React from 'react'
import { FaDiscord } from "react-icons/fa6";

function Community() {
  return (
    <div className="flex text-white flex-col items-center justify-center font-space w-full my-[50px]">
      <p className="text-[20px] lg:text-[38px] text-center text-white">
        Join a thriving community.
      </p>
      <div className="w-full  mt-[20px] flex items-center justify-center">
        <img src="/community.svg" className="" alt="" />
      </div>
      <p className="text-[16px] px-[20px] lg:text-[28px] text-center mt-[40px]">
        It's time to join the thousands of creators,{" "}
        <br className="hidden lg:block" /> artists, and developers using Solana.
      </p>
      <button className="bg-[#5325A9] flex items-center space-x-[10px] mt-[15px] rounded-[8px] text-white p-[8px_25px]">
        <FaDiscord />
        <span>Join Our Discord</span>
      </button>
    </div>
  );
}

export default Community;
