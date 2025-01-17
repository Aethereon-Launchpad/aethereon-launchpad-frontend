// import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";

function JoinedPool() {
  return (
    <div className="mt-[20px] p-[40px_20px] flex items-center justify-center lg:p-[40px] font-space text-white">
      <div className="w-full lg:w-[85%]">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <p className="font-[700] text-[28px] lg:text-[40px] leading-[35px] lg:leading-[45px]">
              {" "}
              Staking Pools you have joined
            </p>
            <p>
              View pools of projects that you have successful joined and funded
            </p>
          </div>
          <input
            type="text"
            className="mt-[20px] lg:mt-0 px-[10px] text-white h-[50px] border-white border bg-[#0E1216] w-full lg:w-[200px] rounded-[10px]"
            placeholder="Search.."
          />
        </div>

        <div className="bg-[#291254] h-[200px] p-[10px] rounded-[10px] flex items-center justify-center mt-[30px]">
          <div className="flex flex-col items-center justify-center space-y-[5px]">
            <IoIosInformationCircleOutline className="text-[30px]" />
            <p>You have not Joined any Project yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinedPool;
