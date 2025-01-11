// import React from 'react'

function Access() {
  return (
    <div className=" mt-[40px] font-space lg:p-[40px] p-[40px_20px]">
      <p className="text-[40px] text-white">Access the launchpad</p>
      <div className="grid grid-cols-3 gap-[20px] mt-[20px] text-white">
        <div className="p-[20px] bg-[#000027]">
          <img src="./dynamic.svg" alt="" />
          <p className="text-[40px] font-[500] leading-[45px] mt-[10px]">
            Dynamic Rewards Staking
          </p>
          <p className="text-[16px] mt-[5px] font-[400]">
            Earn more rewards the longer you <br className="hidden lg:block" />
            stake your tokens!
          </p>

          <button className="bg-primary w-[222px] h-[45px] mt-[10px] text-white flex items-center justify-center">Lock Token</button>
        </div>
        <div className="p-[20px] bg-[#000027]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, optio
          nesciunt quibusdam eaque iste quia quisquam doloremque minus
          asperiores nihil sint rem aspernatur commodi dignissimos ad provident
          aliquam ducimus? Laboriosam!
        </div>
        <div className="p-[20px] bg-[#000027]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, optio
          nesciunt quibusdam eaque iste quia quisquam doloremque minus
          asperiores nihil sint rem aspernatur commodi dignissimos ad provident
          aliquam ducimus? Laboriosam!
        </div>
      </div>
    </div>
  );
}

export default Access;
