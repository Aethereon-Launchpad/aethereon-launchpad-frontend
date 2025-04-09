// import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
function Access() {
  const navigation = useNavigate();
  return (
    <div className="mt-[40px] font-space lg:p-[40px] p-[40px_20px]">
      <p className="text-[25px] lg:text-[40px] text-white">
        Access the launchpad
      </p>
      <div className="grid lg:grid-cols-3 gap-[20px] mt-[20px] text-white">
        {[
          {
            icon: "./dynamic.svg",
            title: "Dynamic Rewards Staking",
            description: "Earn more rewards the more you stake your tokens!",
            path: "/lock-stake",
            buttonText: "Lock Token"
          },
          {
            icon: "./rise.svg",
            title: "Rise to the Top: Explore Our Leaderboard",
            description: "See how you rank among the top stakers and claim your spot as a Diamond Guardian!",
            path: "/leaderboard",
            buttonText: "Explore Now"
          },
          {
            icon: "./join.svg",
            title: "Join the Seasonal Staking Challenge",
            description: "Stake your way to exclusive rewards, climb the ranks, and become an Ethereal Miner—only for a limited time",
            path: "/seasonal-staking",
            buttonText: "Join Now"
          }
        ].map((item, index) => (
          <div key={index} className="relative p-[20px] flex-col flex justify-between items-start overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-[2px] bg-[#000027] clip-path-polygon transition-all duration-300"></span>
            <div className="relative">
              <img src={item.icon} alt="" />
              <p className="text-[30px] font-[500] leading-[45px] mt-[10px]">
                {item.title}
              </p>
              <p className="text-[16px] mt-[5px] font-[400]">
                {item.description}
              </p>
            </div>
            <button
              onClick={() => navigation(item.path)}
              className="relative w-[222px] h-[45px] mt-[10px] text-white flex items-center justify-center space-x-[5px] overflow-hidden group-button"
            >
              <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-[#000027] transition-all duration-300 clip-path-polygon"></span>
              <span className="relative flex items-center">
                {item.buttonText}
                <GoArrowUpRight className="text-[20px] ml-2" />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Access;
