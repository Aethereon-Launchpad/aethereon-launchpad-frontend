// import React from 'react'
import { Link } from "react-router-dom";

function StakingBadge() {
  return (
    <div className="mt-[40px] font-space lg:p-[40px] p-[40px_20px]">
      <p className="text-[25px] lg:text-[40px] text-white">Staking Badge System & Benefits</p>
      <div className="grid lg:grid-cols-3 mt-[20px] gap-[20px] lg:gap-[40px]">
        <div className="h-fit flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./pickaxe.svg" alt="" />
              <p className="text-[24px] font-[500]">Copper Miner</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 1,000 - 4,999 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">1.5x</span>
            </p>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px] text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-fit flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./iron.svg" alt="" />
              <p className="text-[24px] font-[500]">Iron Miner</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 5,000 - 9,999 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">2x</span>
            </p>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px]  text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-fit flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./steel.svg" alt="" />
              <p className="text-[24px] font-[500]">Steel Forgemaster</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 10,000 - 14,999 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">2.5x</span>
            </p>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px] text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-fit flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./titan.svg" alt="" />
              <p className="text-[24px] font-[500]">Titanium Pioneer</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 15,000 - 49,999 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">3x</span>
            </p>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px]  text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-fit flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./obs.svg" alt="" />
              <p className="text-[24px] font-[500]">Obsidian Vanguard</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 50,000+ $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">3.5x</span>
            </p>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px] text-center">
            Start Staking
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StakingBadge;
