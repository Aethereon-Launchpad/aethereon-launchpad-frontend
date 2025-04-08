// import React from 'react'


function Trusted() {

  return (
    <div>
      <div className="flex font-space flex-col items-center justify-center py-[40px]">
        <p className="uppercase text-2xl text-primary text-center font-extrabold">
          Trusted by blockchain innovators
        </p>
        <div className="flex flex-col lg:flex-row items-center space-y-[30px] lg:space-y-0 lg:space-x-[50px] mt-[20px]">
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">8.5x</p>
            <p>ATH AVG
              ROI</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">{20}+</p>
            <p>Completed IDOs</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">10+</p>
            <p>Giveaways</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">12%</p>
            <p>Supply Staked</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trusted;
