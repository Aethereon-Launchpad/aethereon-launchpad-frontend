// import React from 'react'
import { Link } from "react-router-dom";

function StakingBadge() {
  return (
    <div className="mt-[40px] font-space lg:p-[40px] p-[40px_20px]">
      <p className="text-[25px] lg:text-[40px] text-white">Stake Lock Badge System & Benefits</p>
      <div className="grid lg:grid-cols-3 mt-[20px] gap-[20px] lg:gap-[40px]">
        {[
          {
            icon: "./pickaxe.svg",
            title: "Copper Miner",
            range: "1,000 - 4,999 $HEX",
            multiplier: "1.5x"
          },
          {
            icon: "./iron.svg",
            title: "Iron Miner",
            range: "5,000 - 9,999 $HEX",
            multiplier: "2x"
          },
          {
            icon: "./steel.svg",
            title: "Steel Forgemaster",
            range: "10,000 - 14,999 $HEX",
            multiplier: "2.5x"
          },
          {
            icon: "./titan.svg",
            title: "Titanium Pioneer",
            range: "15,000 - 49,999 $HEX",
            multiplier: "3x"
          },
          {
            icon: "./obs.svg",
            title: "Obsidian Vanguard",
            range: "50,000+ $HEX",
            multiplier: "3.5x"
          }
        ].map((badge, index) => (
          <div key={index} className="relative h-fit flex flex-col justify-between overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-[2px] bg-[#000027] clip-path-polygon transition-all duration-300"></span>
            <div className="relative p-[20px] text-white">
              <div className="flex items-center space-x-[10px]">
                <img src={badge.icon} alt="" />
                <p className="text-[24px] font-[500]">{badge.title}</p>
              </div>
              <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
                Stake {badge.range}
              </p>
              <p className="text-[24px] font-[700] mt-[20px]">
                🛡 Pool Weight Multiplier: <span className="text-primary">{badge.multiplier}</span>
              </p>
            </div>
            <Link
              to="/dynamic-rewards"
              className="relative w-full py-[5px] mt-[30px] text-center overflow-hidden group-button text-white"
            >
              <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-[#000027] transition-all duration-300 clip-path-polygon"></span>
              <span className="relative">Start Staking</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StakingBadge;
