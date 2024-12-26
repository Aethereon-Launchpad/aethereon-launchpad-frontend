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
              Launch New Tokens Securely
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
              DerHex enables projects to securely launch their tokens through
              Initial DEX Offerings (IDO). With multi-chain support,
              whitelisting, and built-in vesting, we ensure safe, structured
              token sales for both projects and investors.
            </p>

            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">New Tokens</p>
            </div>
          </div>
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
            Stake Tokens, Earn Rewards
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
            Stake your $HEX tokens or provide liquidity to earn rewards and gain access to exclusive token sales. Choose between flexible or fixed staking options to suit your strategy.
            </p>

            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Stake Tokens and rewards</p>
            </div>
          </div>
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
            Shape the Future with Your Vote
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
            DerHex enables projects to securely launch their tokens through Initial DEX Offerings (IDO). With multi-chain support, whitelisting, and built-in vesting, we ensure safe, structured token sales for both projects and investors.
            </p>

            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Transactions per second</p>
            </div>
          </div>
          <div className="p-[20px] bg-[#00000047] h-fit rounded-[10px]">
            <p className="border-l-[4px] pl-[10px] text-white font-[500] text-[18px] lg:text-[24px] border-l-primary">
            Track and Manage Your Investments
            </p>
            <p className="text-[#C4C4C4] text-[15px] lg:text-[17px] mt-[10px]">
            The DerHex user dashboard provides a comprehensive overview of token holdings, staking rewards, and participation in token sales. Stay informed with real-time updates on upcoming projects, transaction history, and performance metrics.
            </p>

            <div className="mt-[5px]">
              <p className="text-[18px] lg:text-[28px]">3,969</p>
              <p className="uppercase text-[#C4C4C4] text-[14px] lg:text-[16px]">Transactions per second</p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Unlock;
