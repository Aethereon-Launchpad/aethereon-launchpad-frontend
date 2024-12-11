// import React from 'react'

function Trusted() {
  return (
    <div>
      <div className="flex font-space flex-col items-center justify-center py-[40px]">
        <p className="uppercase text-primary text-center">
          Trusted by blockchain innovators
        </p>
        <div className="flex flex-col lg:flex-row items-center space-y-[30px] lg:space-y-0 lg:space-x-[50px] mt-[20px]">
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">$75M+</p>
            <p>Total Raised</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">$1.5B+</p>
            <p>Total FDV (Fully Diluted Valuation)</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">200K</p>
            <p>Whitelisted Users</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p className="font-[700] leading-[45px] text-[40px]">950K</p>
            <p>Connected Wallets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trusted;
