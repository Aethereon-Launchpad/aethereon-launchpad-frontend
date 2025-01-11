// import React from 'react'

function VotingRewards() {
  return (
    <div className="font-space justify-center items-center mb-[40px] p-[20px] flex flex-col text-white">
      <p className="uppercase text-white font-[700] text-[18px]">
        Voting Rewards
      </p>
      <p className="text-[24px] lg:text-[48px] text-center font-[700]">
        Earn Rewards for Active Participation
      </p>
      <p className="text-[#CDCDCD] text-center mt-[10px]">
        Unlock exclusive rewards for making your voice heard in the DerHex
        community. $HEX holders who vote <br className="hidden lg:block" />{" "}
        consistently gain monthly bonuses and other perks!
      </p>
      <div className="w-[70%] mt-[50px] grid lg:grid-cols-3 gap-[20px] lg:gap-[40px]">
        <div className="flex flex-col items-center justify-center border p-[20px] border-[#5325A9]">
          <img src="./consistent.svg" alt="" />
          <p className="font-[700] text-[24px] my-[8px] text-center">
            Consistent Voting Bonuses
          </p>
          <p className="text-[14px] text-center">
            By voting on proposals consistently, $HEX holders become eligible
            for monthly rewards. Show your dedication to shaping DerHex, and
            earn while you do it.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center border p-[20px]  border-[#5325A9]">
          <img src="./engagement.svg" alt="" />
          <p className="font-[700] text-center leading-[30px] text-[24px] my-[8px]">
            Engagement Boost Rewards
          </p>
          <p className="text-[14px] text-center">
            Governance engagement helps strengthen our community, and active
            participants can receive special bonus tokens. The more you engage,
            the higher your potential rewards!{" "}
          </p>
        </div>
        <div className="flex flex-col items-center border p-[20px]  border-[#5325A9] justify-center">
          <img src="./loyalty.svg" alt="" />
          <p className="font-[700] text-center leading-[30px] text-[24px] my-[8px]">Loyalty Multiplier</p>
          <p className="text-[14px] text-center">
            Frequent voters gain loyalty points, which increase their monthly
            rewards. Earn higher rewards for your commitment to platform
            governance over time.{" "}
          </p>
        </div>
        <div className="flex flex-col items-center  border p-[20px]  border-[#5325A9] justify-center">
          <img src="./builder.svg" alt="" />
          <p className="font-[700] text-center leading-[30px] text-[24px] my-[8px]">
            Community Builder Badge
          </p>
          <p className="text-[14px] text-center">
            Active participants earn a “Community Builder” badge, enhancing
            their reputation on DerHex and unlocking additional benefits on the
            platform.{" "}
          </p>
        </div>
        <div className="flex flex-col items-center  border p-[20px]  border-[#5325A9] justify-center">
          <img src="./early.svg" alt="" />
          <p className="font-[700] text-[24px] leading-[30px] my-[8px]">
          Early Voter Perks          </p>
          <p className="text-[14px] text-center">
          Voting early on key proposals can grant special perks, such as exclusive access to certain platform features or pre-launch opportunities, 
          </p>
        </div>
        <div className="flex flex-col items-center  border p-[20px]  border-[#5325A9] justify-center">
          <img src="./governance.svg" alt="" />
          <p className="font-[700] text-[24px] leading-[30px] my-[8px]">
          Governance Power-Up          </p>
          <p className="text-[14px] text-center">
          Consistent voters unlock a Governance Power-Up, boosting their voting power on future proposals. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default VotingRewards;
