// import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import { usePrivy } from "@privy-io/react-auth";
import { useLockStake } from "../../hooks/web3/useLockStake";
import { Preloader, ThreeDots } from 'react-preloader-icon';

function DashComp() {
  const { authenticated, login, logout, user } = usePrivy();
  const { data, error, loading } = useLockStake({ polling: true, userAddress: user?.wallet?.address as `0x${string}` })


  function returnMultiplier(amount: number) {
    let multiplier = "1x";

    if (amount >= 50000) {
      multiplier = "3.5x";
    } else if (amount >= 15000) {
      multiplier = "3x";
    } else if (amount >= 10000) {
      multiplier = "2.5x";
    } else if (amount >= 5000) {
      multiplier = "2x";
    } else if (amount >= 1000) {
      multiplier = "1.5x";
    }

    return multiplier;
  }

  function getBadgeInfo(amount: number) {
    if (amount >= 50000) {
      return { name: "Obsidian Vanguard", image: "./obs.svg" };
    } else if (amount >= 15000) {
      return { name: "Titanium Pioneer", image: "./titan.svg" };
    } else if (amount >= 10000) {
      return { name: "Steel Forgemaster", image: "./steel.svg" };
    } else if (amount >= 5000) {
      return { name: "Iron Miner", image: "./iron.svg" };
    } else if (amount >= 1000) {
      return { name: "Copper Miner", image: "./pickaxe.svg" };
    }
    return { name: "No Badge", image: "" };
  }

  const badgeInfo = getBadgeInfo(data?.userData?.amountStaked || 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Preloader
          use={ThreeDots}
          size={60}
          strokeWidth={6}
          strokeColor="#5325A9"
          duration={2000}
        />
      </div>
    );
  }


  if (error.message) {
    return <div className="text-red-500 text-center">Error loading Lock & Stake: {error.message}</div>;
  }



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
        <button className="bg-primary p-[8px_20px] mt-[20px] font-[500] text-[20px] text-white rounded-full flex items-center space-x-[5px] hover:bg-red-500 transition-all duration-1000" onClick={logout}>
          <span className="truncate max-w-[100px] ">{user?.wallet?.address}</span>
          <span className="truncate max-w-[100px] hover:block hidden">Disconnect</span>
          <FaArrowCircleRight className="text-white" />
        </button>
      )}

      <div className="border border-primary p-[20px] lg:p-[40px] w-full  xl:w-[50%] rounded-[10px] mt-[80px] flex flex-col items-center justify-center">
        <p className="text-[63px] leading-[60px] text-primary">{data?.userData?.amountStaked}</p>
        <p className="text-[14px]">Total IDO Power</p>
        <p>Presale Multiplier : {returnMultiplier(data?.userData?.amountStaked)}</p>
        <div className="flex items-center space-x-[10px] mt-[10px]">
          {badgeInfo.image && <img src={badgeInfo.image} alt={badgeInfo.name} className="w-[24px] h-[24px]" />}
          <p>Badge: {badgeInfo.name}</p>
        </div>
        {!authenticated && (
          <div className="bg-[#291254] text-white p-[20px] lg:p-[20px_40px] mt-[20px] rounded-[10px]">
            <p className="text-center">
              You do not have any connected wallets yet{" "}
              <br className="hidden lg:block" /> Connect your wallet
              so that you can be part of our IDOs
            </p>
          </div>)}
      </div>
    </div>
  );
}

export default DashComp;
