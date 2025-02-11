// import React from 'react'

import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import stakingPoolActions from '../../abis/StakingPoolActions.json';
import { ethers } from "ethers";


function PoolForm() {
  // const abi = [ /* Your Contract ABI Here */ ];
  const contractAddress = "0x6cE168E73C64a502d4850CCE952bb2b75a3F4711";
  const provider = new ethers.JsonRpcProvider("https://your-rpc-url");
  const contract = new ethers.Contract(contractAddress, stakingPoolActions.abi, provider);


  const [tab, setTab] = useState(0);


  const [poolData, setPoolData] = useState({
    stakingTokenSymbol: "",
    rewardTokenAddress: "",
    stakeFee: "",
    withdrawalFee: "",
    rewardBasis: "",
    numberOfDays: "",
    apyRate: ""
  })

  const { stakingTokenSymbol, rewardTokenAddress, stakeFee, withdrawalFee, rewardBasis, numberOfDays, apyRate } = poolData;


  const handleNextMove = async () => {
    if (tab === 0) {
      // Validate for the first step
      if (!stakingTokenSymbol.trim()) {
        toast.error("Staking Token Symbol is required!");
        return;
      }
      if (!rewardTokenAddress.trim()) {
        toast.error("Reward Token Address is required!");
        return;
      }
      // If valid, proceed to the next tab
      setTab(tab + 1);
    } else if (tab === 1) {
      // Validate for the second step

      if (!stakeFee.trim()) {
        toast.error("Stake Fee is required!");
        return;
      }
      if (!withdrawalFee.trim()) {
        toast.error("Withdrawal Fee is required!");
        return;
      }
      if (!rewardBasis.trim()) {
        toast.error("Reward Basis is required!");
        return;
      }
      if (!numberOfDays.trim()) {
        toast.error("Number of Days is required!");
        return;
      }
      if (!apyRate.trim()) {
        toast.error("APY Rate is required!");
        return;
      }
      // If valid, proceed to the next tab
      setTab(tab + 1);
    } else if (tab === 2) {
      // Submit the data
      try {
        await contract.createStakingPool(
          stakingTokenSymbol,
          rewardTokenAddress,
          stakeFee,
          withdrawalFee,
          rewardBasis,
          numberOfDays,
          apyRate
        )
        console.log("Submitting data: ", poolData);
        toast.success("Staking Pool created successfully!");
      } catch (error) {
        toast.error("An error occurred while creating the Staking Pool!");

      }
    }
  };



  const renderButton = () => {
    return (
      <button
        onClick={handleNextMove}
        className={` bg-primary text-white p-[10px_20px] mt-[20px] rounded-[8px] w-full h-[50px]`}
      >
        {tab === 2 ? "Create Staking Pool" : "Continue"}
      </button>
    );
  };
  return (
    <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
      <div className="flex flex-col lg:flex-row items-start  gap-[20px] text-white">
        <div className="w-full h-full lg:w-[30%] ">
          <p className="text-[20px] lg:text-[36px] font-[500]">
            Create Staking Pool
          </p>
          <div className="w-full flex items-center lg:hidden mt-[40px]  justify-between">
            <div className="flex   w-full items-center">
              <div className="w-fit  flex flex-col lg:flex-row items-center space-x-[5px]">
                <div
                  className={`${tab > 0 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                    } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                >
                  {tab > 0 ? (
                    <FaCheck className="text-white text-[20px]" />
                  ) : (
                    <p className="text-white text-[20px] font-[600]">1</p>
                  )}
                </div>
                <p className="font-[500] text-[#848895] text-[14px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                  Token Information
                </p>
              </div>
              <div
                className={` ${tab > 0 ? "border-[#28C76B]" : "border-[#5325A9] "
                  } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
              ></div>
            </div>
            <div className="flex w-full items-center">
              <div className="w-fit  flex flex-col lg:flex-row items-center space-x-[5px]">
                <div
                  className={`${tab > 1 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                    } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                >
                  {tab > 1 ? (
                    <FaCheck className="text-white text-[20px]" />
                  ) : (
                    <p className="text-white text-[20px] font-[600]">1</p>
                  )}
                </div>
                <p className="font-[500] text-[#848895] text-[14px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                  Staking Information
                </p>
              </div>
              <div
                className={` ${tab > 1 ? "border-[#28C76B]" : "border-[#5325A9] "
                  } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
              ></div>
            </div>


            <div className="flex  flex-col lg:mt-[20px] items-center">
              <div className="flex flex-col lg:flex-row items-center space-x-[5px]">
                <div
                  className={`${tab > 2 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                    } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                >
                  {tab > 2 ? (
                    <FaCheck className="text-white text-[20px]" />
                  ) : (
                    <p className="text-white text-[20px] font-[600]">3</p>
                  )}
                </div>
                <p className="font-[500] text-[#848895] text-[14px] w-[100px]   text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                  Review & Submit
                </p>
              </div>
            </div>
          </div>
          <div className="hidden w-full lg:flex flex-row lg:flex-col mt-[20px] items-start justify-start">
            <div className="flex-1 flex flex-row lg:flex-col lg:space-y-[10px] items-start">
              <div className="flex flex-col lg:flex-row items-center lg:space-x-[5px]">
                <div
                  className={`${tab > 0 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                    } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                >
                  {tab > 0 ? (
                    <FaCheck className="text-white text-[20px]" />
                  ) : (
                    <p className="text-white text-[20px] font-[600]">1</p>
                  )}
                </div>
                <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                  Token Information
                </p>
              </div>
              <div className="w-full lg:w-[40px] min-h-full flex justify-center items-center">
                <div
                  className={` ${tab > 0 ? "border-[#28C76B]" : "border-[#5325A9] "
                    } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                ></div>
              </div>
            </div>
            <div className="flex-1  flex flex-vrow lg:flex-col lg:mt-[20px] space-y-[10px] items-start">
              <div className="w-full flex flex-col lg:flex-row items-center space-x-[5px]">
                <div
                  className={`${tab > 1 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                    } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                >
                  {tab > 1 ? (
                    <FaCheck className="text-white text-[20px]" />
                  ) : (
                    <p className="text-white text-[20px] font-[600]">2</p>
                  )}
                </div>
                <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                  Staking Information
                </p>
              </div>
              <div className="w-[40px] flex justify-center items-center">
                <div className="w-full lg:w-[40px] min-h-full flex justify-center items-center">
                  <div
                    className={` ${tab > 1 ? "border-[#28C76B]" : "border-[#5325A9] "
                      } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                  ></div>
                </div>{" "}
              </div>
            </div>
            <div className="flex flex-col mt-[20px] items-center">
              <div className="flex items-center space-x-[5px]">
                <div
                  className={`${tab > 2 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                    } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                >
                  {tab > 2 ? (
                    <FaCheck className="text-white text-[20px]" />
                  ) : (
                    <p className="text-white text-[20px] font-[600]">3</p>
                  )}
                </div>
                <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                  Review & Submit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full lg:w-[70%]  bg-[#17043B] p-[20px] lg:p-[40px] flex flex-col items-center justify-center rounded-[16px] space-y-[20px] lg:space-y-[80px]">
          <p className="text-[20px] lg:text-[36px] font-[500]">
            {tab === 0
              ? " Enter token addresses for Staking and reward"
              : tab === 1
                ? "Staking Information"
                : "Review Information"}
          </p>
          {tab === 0 && (
            <div className="flex flex-col w-full space-y-[20px] lg:space-y-[80px]">
              <div className="w-full">
                <p>Staking Token (CA) / Symbol</p>
                <input
                  value={stakingTokenSymbol}
                  onChange={(e) =>
                    setPoolData({ ...poolData, stakingTokenSymbol: e.target.value })
                  }
                  type="text"
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
              <div className="w-full">
                <p>Reward Token Address</p>
                <input
                  value={rewardTokenAddress}
                  onChange={(e) =>
                    setPoolData({ ...poolData, rewardTokenAddress: e.target.value })
                  }
                  type="text"
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
            </div>
          )}
          {tab === 1 && (
            <div className="flex flex-col w-full space-y-[40px]">
              <div className="w-full">
                <p>Stake Fee (%)</p>
                <input
                  value={stakeFee}
                  onChange={(e) =>
                    setPoolData({ ...poolData, stakeFee: e.target.value })
                  }
                  type="text"
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
              <div className="w-full">
                <p>Withdrawal Fee (%)</p>
                <input
                  value={withdrawalFee}
                  onChange={(e) =>
                    setPoolData({ ...poolData, withdrawalFee: e.target.value })
                  }
                  type="text"
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
              <div className="w-full">
                <p>Reward Basis</p>
                <input
                  value={rewardBasis}
                  onChange={(e) =>
                    setPoolData({ ...poolData, rewardBasis: e.target.value })
                  }
                  type="text"
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
              <div className="w-full">
                <p>Number Of Days</p>
                <input
                  type="text"
                  value={numberOfDays}
                  onChange={(e) =>
                    setPoolData({ ...poolData, numberOfDays: e.target.value })
                  }
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
              <div className="w-full">
                <p>APY Rate (%)</p>
                <input
                  value={apyRate}
                  onChange={(e) =>
                    setPoolData({ ...poolData, apyRate: e.target.value })
                  }
                  type="text"
                  className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
                />
              </div>
            </div>
          )}
          <div className="w-full">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
}

export default PoolForm;
