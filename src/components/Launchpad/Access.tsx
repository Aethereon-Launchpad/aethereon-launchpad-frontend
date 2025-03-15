// import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
function Access() {
  const navigation = useNavigate();
  return (
    <div className=" mt-[40px] font-space lg:p-[40px] p-[40px_20px]">
      <p className="text-[25px] lg:text-[40px] text-white">
        Access the launchpad
      </p>
      <div className="grid lg:grid-cols-3 gap-[20px] mt-[20px] text-white">
        <div className="p-[20px] flex-col flex justify-between items-start bg-[#000027]">
          <div>
            <img src="./dynamic.svg" alt="" />
            <p className="text-[30px] font-[500] leading-[45px] mt-[10px]">
              Dynamic Rewards Staking
            </p>
            <p className="text-[16px] mt-[5px] font-[400]">
              Earn more rewards the longer you{" "}
              <br className="hidden lg:block" />
              stake your tokens!
            </p>
          </div>

          <button
            onClick={() => navigation("/lock-stake")}
            className="bg-primary  w-[222px] h-[45px] mt-[10px] text-white flex items-center justify-center space-x-[5px]"
          >
            <span>Lock Token</span>

            <GoArrowUpRight className="text-[20px]" />
          </button>
        </div>
        <div className="p-[20px] flex-col flex justify-between items-start bg-[#000027]">
          <div>
            <img src="./rise.svg" alt="" />
            <p className="text-[30px] font-[500] leading-[40px] mt-[20px]">
              Rise to the Top: Explore Our Leaderboard
            </p>
            <p className="text-[16px] mt-[10px] font-[400]">
              See how you rank among the top stakers and{" "}
              <br className="hidden lg:block" /> claim your spot as a Diamond
              Guardian!
            </p>
          </div>

          <button
            onClick={() => navigation("/leaderboard")}
            className="bg-primary w-[222px] h-[45px] mt-[10px] text-white flex items-center justify-center space-x-[5px]"
          >
            <span>Explore Now</span>

            <GoArrowUpRight className="text-[20px]" />
          </button>
        </div>
        <div className="p-[20px] flex-col flex justify-between items-start bg-[#000027]">
          <div>
            <img src="./join.svg" alt="" />
            <p className="text-[30px] font-[500] leading-[45px] mt-[10px]">
              Join the Seasonal Staking Challenge
            </p>
            <p className="text-[16px] mt-[5px] font-[400]">
              Stake your way to exclusive rewards, climb the ranks,{" "}
              <br className="hidden lg:block" /> and become an Ethereal
              Miner—only for a limited time
            </p>
          </div>

          <button
            onClick={() => navigation("/seasonal-staking")}
            className="bg-primary w-[222px] h-[45px] mt-[10px] text-white flex items-center justify-center space-x-[5px]"
          >
            <span>Join Now</span>

            <GoArrowUpRight className="text-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Access;
