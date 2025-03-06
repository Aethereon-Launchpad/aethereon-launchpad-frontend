// import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import { usePrivy } from "@privy-io/react-auth";

function DashComp() {
  const { authenticated, login, logout, user } = usePrivy();
  return (
    <div className="p-[40px_20px] lg:p-[40px] flex flex-col items-center justify-center font-space text-white">
      <p className="font-[700] text-[30px] lg:text-[70px]">Welcome!</p>
      <p className="text-[16px] text-center lg:text-[22px]">
        Everything you need to know to get started on the derhex
      </p>

      <div className="mt-[20px]">

      </div>

      {!authenticated ? (
        <button className="bg-primary p-[8px_20px] mt-[20px] font-[500] text-[20px] text-white rounded-full flex items-center space-x-[5px]" onClick={login}>
          <span>Connect Wallet</span>
          <FaArrowCircleRight className="text-white" />
        </button>
      ) : (
        <button className="bg-primary p-[8px_20px] mt-[20px] font-[500] text-[20px] text-white rounded-full flex items-center space-x-[5px] hover:bg-red-500" onClick={logout}>
          <span className="truncate max-w-[100px] hover:hidden block">{user?.wallet?.address}</span>
          <span className="truncate max-w-[100px] hover:block hidden">Disconnect</span>
          <FaArrowCircleRight className="text-white" />
        </button>
      )}

      <div className="border border-primary p-[20px] lg:p-[40px] w-full  xl:w-[50%] rounded-[10px] mt-[80px] flex flex-col items-center justify-center">
        <p className="text-[63px] leading-[60px] text-primary">0.00</p>
        <p className="text-[14px]">Total IDO Power</p>
        <div className="bg-[#291254] text-white p-[20px] lg:p-[20px_40px] mt-[20px] rounded-[10px]">
          <p className="text-center">
            You do not have any registered wallets yet{" "}
            <br className="hidden lg:block" /> Connect one or multiple wallets
            so that you can be part of our IDOs
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashComp;
