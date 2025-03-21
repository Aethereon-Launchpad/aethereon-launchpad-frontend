// import React from 'react'

function Unlock() {
  return (
    <div className="h-[1600px] font-space mt-[40px] lg:h-[800px]  relative flex items-center justify-center">
      <img src="/unlock-gra.svg" className="h-full w-full" alt="" />
      <div className="absolute w-full top-0 min-h-full  flex flex-col lg:flex-row items-center p-[40px_20px] lg:p-[40px_80px]">
        <div className="w-full lg:w-[40%]  flex-col flex items-center lg:items-start">
          <p className="text-white text-[25px] lg:text-[40px] leading-[30px] lg:leading-[45px]">
            Unlock the Power of Blockchain Innovation
          </p>
          <img className="mt-[40px]" src="/der-block.svg" alt="" />
        </div>
        <div className="mt-[10px] lg:mt-0 w-full text-white h-full lg:w-[60%]  grid lg:grid-cols-2">
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
              Your Gateway to Token Launches
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
              Launch your project with confidence using our secure IDO platform. We provide multi-chain support, whitelisting, and vesting solutions to protect both creators and investors.
            </p>
            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Successful Launches</p>
            </div>
          </div>
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
              Grow Your Crypto Portfolio
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
              Maximize your returns with our flexible staking options. Earn rewards and gain exclusive access to promising new projects while maintaining control over your investments.
            </p>
            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Active Stakers</p>
            </div>
          </div>
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
              Be Part of the Decision-Making
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
              Your voice matters. Participate in governance votes to shape the future of the platform and influence the direction of innovative blockchain projects.
            </p>
            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Community Votes</p>
            </div>
          </div>
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
              Smart Investment Management
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
              Stay in control with our intuitive dashboard. Track your portfolio, monitor staking rewards, and analyze your investment performance in real-time.
            </p>
            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Active Users</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Unlock;
