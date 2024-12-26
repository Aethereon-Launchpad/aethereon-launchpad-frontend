// import React from 'react'
import { IoWalletSharp } from "react-icons/io5";
import { GoAlert } from "react-icons/go";


function SingleStake() {

  return (
    <div className="text-white font-space flex items-center justify-center p-[40px_20px] lg:py-[80px]">
          <div className="w-full lg:w-[60%] border border-primary p-[20px] lg:p-[40px]">
            <div className="flex items-center ">
              <div className="flex-1 items-center flex justify-center space-x-[10px]">
                <div className="h-[50px] w-[50px] rounded-full border"></div>
                <p className="text-[24px] font-[700]">Coinbase</p>
              </div>
              <div className="flex items-center space-x-[5px]">
                <p className="text-[#D4D4D4]">Status</p>
                <p className="bg-[#02C35B26] text-[14px] rounded-[5px] p-[2px_8px] text-center">
                  Live
                </p>
              </div>
            </div>
            <div className="my-[20px] flex items-center w-full justify-center">
                <p className="text-primary text-[63px] text-xenter">0.00</p>
            </div>
            <div className="">
              <div className="flex items-center justify-between">
              <p className="text-white text-[16px] mb-[5px]">Lock Amount</p>
              <p className="text-white text-[14px] mb-[5px]">Balance 0.8968</p>
              </div>
              <div className="bg-[#291254] mt-[20px] rounded-[8px] space-x-[10px] text-white p-[8px] flex items-center">
                <GoAlert className="text-[25px] lg:text-[20px]" />
                <p className="text-[12px] lg:text-[14px] leading-[16px]">
                  $HEX is the native token of DerHex, designed to facilitate
                  staking, governance, and access to exclusive token sales.
                </p>
              </div>
              <div className="mt-[40px]">
                <p className="uppercase text-[14px] text-[#A1A1AA]">Staking Summary</p>
                <div className="mt-[20px] text-[12px] lg:text-[16px] grid grid-cols-2 gap-[10px]">
                <p>Current Price</p>
                <p>Currently priced at **$0.50**.</p>
                <p>Market Cap</p>
                <p>Market Cap $500000</p>
                <p>Total Supply</p>
                <p>500,000 ($HEX**)</p>
              </div>
              </div>
             
              <div className="mt-[40px] text-[12px] lg:text-[16px] grid grid-cols-2 gap-[10px]">
                <p>Token Type</p>
                <p>Utility and Governance Token**</p>
                <p>APY Rates</p>
                <p>8%** for Flexible Staking</p>
                <p>Vesting Period </p>
                <p> 30 days</p>
              </div>
            </div>
            <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] mt-[40px] w-full justify-center font-[500]">
              <IoWalletSharp className="text-[14px] lg:text-[16px]" />
              <p className="text-[14px] lg:text-[16px]">Connect Wallet to Join</p>
            </button>
          </div>
        </div>
  )
}

export default SingleStake