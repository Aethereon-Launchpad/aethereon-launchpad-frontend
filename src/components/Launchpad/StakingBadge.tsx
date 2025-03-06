// import React from 'react'
import { Link } from "react-router-dom";

function StakingBadge() {
  return (
    <div className="mt-[40px] font-space lg:p-[40px] p-[40px_20px]">
      <p className="text-[25px] lg:text-[40px] text-white">Staking Badge System & Benefits</p>
      <div className="grid lg:grid-cols-3 mt-[20px] gap-[20px] lg:gap-[40px]">
        <div className="max-h-[460px] flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./pickaxe.svg" alt="" />
              <p className="text-[24px] font-[500]">Copper Miner</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 100 - 1000 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">3x</span>
            </p>

            <ul className="list-disc mt-[15px] px-[20px]">
              <li>
                Basic allocation to token sales (based on available pool).
              </li>
              <li> Access to DerHex community forums and polls.</li>
            </ul>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px] text-center">
            Start Staking
          </Link>
        </div>
        <div className="max-h-[460px] flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./iron.svg" alt="" />
              <p className="text-[24px] font-[500]">Iron Miner</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 1,000 - 5,000 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier:{" "}
              <span className="text-primary">1.2x</span>
            </p>
            <ul className="list-disc mt-[15px] px-[20px]">
              <li>Priority allocation over Copper Miners in token sales.</li>
              <li> Monthly updates and reports from project teams.</li>
              <li> Small bonus rewards for staking longer than 90 days.</li>
            </ul>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px]  text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-[460px] max-h-[460px] flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./steel.svg" alt="" />
              <p className="text-[24px] font-[500]">Steel Forgemaster</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 5,000- 14,000 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">2x</span>
            </p>

            <ul className="list-disc mt-[15px] px-[20px]">
              <li>
                Guaranteed allocation in token sales (up to a set percentage).
              </li>
              <li>
                Bonus staking rewards for lock-in periods exceeding 6 months.
              </li>
              <li> Access to DerHex community forums and polls.</li>
            </ul>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px] text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-[460px] max-h-[460px] flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./titan.svg" alt="" />
              <p className="text-[24px] font-[500]">Titanium Pioneer</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 15,000 - 50,000 $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">2x</span>
            </p>

            <ul className="list-disc mt-[15px] px-[20px]">
              <li>
                Increased allocation in token sales compared to lower tiers.
              </li>
              <li>Special rewards for staking longer than 1 year.</li>
              <li>Invitations to private community governance sessions.</li>
              <li>
                Early access to testnet projects launched on the platform.
              </li>
            </ul>
          </div>
          <Link to="/dynamic-rewards" className="bg-primary w-full py-[5px] mt-[30px]  text-center">
            Start Staking
          </Link>
        </div>
        <div className="h-[460px] max-h-[460px] flex flex-col justify-between bg-[#000027] overflow-hidden rounded-[10px] text-white">
          <div className="p-[20px]">
            <div className="flex items-center space-x-[10px]">
              <img src="./obs.svg" alt="" />
              <p className="text-[24px] font-[500]">Obsidian Vanguard</p>
            </div>
            <p className="text-[18px] mt-[10px] text-[#ACBBCC]">
              Stake 50,000+ $HEX
            </p>
            <p className="text-[24px] font-[700] mt-[20px]">
              🛡 Pool Weight Multiplier: <span className="text-primary">3x</span>
            </p>

            <ul className="list-disc mt-[15px] px-[20px]">
              <li>
                Top-tier allocation in token sales (highest pool weight
                priority).
              </li>
              <li>
                {" "}
                Governance voting power with a 2x multiplier compared to lower
                ranks.
              </li>
              <li>Exclusive NFT drops tied to major platform milestones.</li>
              <li>
                Participation in advisory committees for new project launches.
              </li>
            </ul>
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
