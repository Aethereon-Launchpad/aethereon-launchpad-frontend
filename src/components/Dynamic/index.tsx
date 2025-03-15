// import React from 'react'
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import ConfirmStakingModal from "../Modal/ConfirmStaking";
import ConfirmUnstaking from "../Modal/ConfirmUnstaking";
import TxReceipt from "../Modal/TxReceipt";
import { useLockStake } from "../../hooks/web3/useLockStake";
import { usePrivy } from "@privy-io/react-auth";
import { createWalletClient, custom } from 'viem';
import { publicClient } from '../../config';
import { sonicTestnet } from '../../config/chain';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { IoWalletSharp } from "react-icons/io5";
import { ethers } from 'ethers';
import { estimateRewards as estimateStakeRewards } from "../../utils/web3/stakeLock";
import { toast } from 'react-hot-toast';
import { getTokenDecimals, getTokenBalance, getTokenAllowance } from "../../utils/web3/actions";
import erc20Abi from "../../abis/ERC20.json";
import stakeLockABI from "../../abis/StakeLock.json";

// Add this function to create wallet client
const createViemWalletClient = () => {
  return createWalletClient({
    chain: sonicTestnet,
    transport: custom(window.ethereum)
  });
};


function Dynamic() {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<string>("1x");
  const [estimatedRewards, setEstimatedRewards] = useState<number>(0);
  const [showMultiplierDropdown, setShowMultiplierDropdown] = useState<boolean>(false);
  const { user, login, authenticated } = usePrivy();
  const { data, error, loading, refetch } = useLockStake({ polling: true, userAddress: user?.wallet?.address as `0x${string}` })
  const [openConfirmStaking, setOpenConfirmStaking] = useState<boolean>(false);
  const [openConfirmUnstaking, setOpenConfirmUnstaking] = useState<boolean>(false);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Staking Successful");
  const [txHash, setTxHash] = useState<string>("");

  const multiplierOptions = [
    { value: "1x", minAmount: 0 },
    { value: "1.5x", minAmount: 1000 },
    { value: "2x", minAmount: 5000 },
    { value: "2.5x", minAmount: 10000 },
    { value: "3x", minAmount: 15000 },
    { value: "3.5x", minAmount: 50000 },
  ];

  async function setEstimate(stakeAmount: number) {
    const stakeAmountInWei = ethers.parseEther(stakeAmount.toString());
    const estimate = await estimateStakeRewards(stakeAmountInWei);
    setEstimatedRewards(Number(estimate));
  }

  function handleSetAmount(amount: number) {
    const amountToStake = Number(amount);
    let multiplier = "1x";

    if (amountToStake >= 50000) {
      multiplier = "3.5x";
    } else if (amountToStake >= 15000) {
      multiplier = "3x";
    } else if (amountToStake >= 10000) {
      multiplier = "2.5x";
    } else if (amountToStake >= 5000) {
      multiplier = "2x";
    } else if (amountToStake >= 1000) {
      multiplier = "1.5x";
    }

    setMultiplier(multiplier);
    setStakeAmount(amount)
    setEstimate(amount);
  }

  function handleMultiplierSelect(selectedMultiplier: string) {
    const selected = multiplierOptions.find(option => option.value === selectedMultiplier);
    if (selected) {
      setStakeAmount(selected.minAmount);
      setEstimate(selected.minAmount);
      setMultiplier(selected.value);
    }
    setShowMultiplierDropdown(false);
  }

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

  async function handleStake() {
    setIsStaking(true);
    const walletClient = createViemWalletClient();
    const [account] = await walletClient.getAddresses();
    const decimals = await getTokenDecimals(data.stakeLock.stakeToken.id)
    const stakeAmountArg = ethers.parseUnits(stakeAmount.toString(), decimals);
    const balanceOfStakeToken = await getTokenBalance(data.stakeLock.stakeToken.id, user?.wallet?.address);

    if (stakeAmount === 0) {
      toast("Set stake amount")
      setIsStaking(false)
      return;
    }

    if (stakeAmount > Number(balanceOfStakeToken)) {
      toast("Insufficient balance")
      setIsStaking(false)
      return;
    }

    if (!account) {
      toast("Connect Wallet");
      setIsStaking(false)
      return;
    }

    // Approve Token Spending
    async function approveTokenSpending() {
      if (user?.wallet?.address) {
        let allowance = await getTokenAllowance(
          data.stakeLock.stakeToken.id,
          data.stakeLock.id,
          user.wallet.address as `0x${string}`
        )

        console.log(allowance);
        // Check if allowance is less than stake amount
        if (Number(allowance) < stakeAmount) {
          // Allow Contract to Spend
          const { request } = await publicClient.simulateContract({
            address: data.stakeLock.stakeToken.id,
            account,
            abi: erc20Abi,
            functionName: "approve",
            args: [data.stakeLock.id, stakeAmountArg]  // Changed to approve staking pool contract
          })

          // Run Approval
          const txHash = await walletClient.writeContract(request);
          await new Promise(resolve => setTimeout(resolve, 2000));
          const receipt = await publicClient.getTransactionReceipt({
            hash: txHash
          })
          return receipt
        }

        return {
          status: "success"
        }
      }
    }

    const receipt = await approveTokenSpending();
    if (receipt && receipt.status === "success") {
      try {
        // Stake Transaction
        const { request } = await publicClient.simulateContract({
          address: data.stakeLock.id,
          abi: stakeLockABI,
          account,
          functionName: "stake",
          args: [
            stakeAmountArg
          ]
        })

        const hash = await walletClient.writeContract(request)
        toast("Successfully staked")
        setShowTxModal(false);
        setTxReceiptTitle("Succesfully Staked")

        setTxHash(hash)
        setTimeout(() => {
          setShowTxModal(true)
        }, 2000)
        setStakeAmount(0)
        setOpenConfirmStaking(false)
        setTimeout(async () => {
          await refetch();
        }, 5000)
      } catch (error: any) {
        console.error(error.message)
        if (error.message.includes("User rejected the request")) {
          toast("User Rejected the Request")
          return;
        }
        toast.error("Stake Failure, Please Try Again later")
        setIsStaking(false)
      } finally {
        setIsStaking(false)
      }
    }
  }


  async function handleWithdraw(unstake: boolean = false) {
    const walletClient = createViemWalletClient();
    const [account] = await walletClient.getAddresses();

    if (unstake === false) {
      if (Number(data?.userData?.ewards) === 0) {
        toast("No Rewards Available")
        return;
      }
    }

    try {
      setIsStaking(true);
      const { request } = await publicClient.simulateContract({
        address: data.stakeLock.id,
        abi: stakeLockABI,
        account,
        functionName: "withdraw",
        args: [unstake]
      })

      const hash = await walletClient.writeContract(request);
      setTxReceiptTitle(unstake ? "Successfully Unstaked" : "Successfully Withdrawal and Unstaking")
      setTxHash(hash)
      setStakeAmount(0)
      setOpenConfirmUnstaking(false)

      toast(unstake ? "Successfully Unstaked tokens" : "Successful Withdrawal of Reward Tokens & Unstake")


      setTimeout(() => {
        setShowTxModal(false)
      }, 2000)
      setTimeout(async () => {
        await refetch()
      }, 5000)
    } catch (error: any) {
      console.error(error)
      if (error.message.includes("User rejected the request")) {
        toast("User Rejected the Request")
        return;
      }
      if (error.message.includes("not_reward_timestamp")) {
        toast("Not yet reward date")
        return;
      }
      toast.error(unstake ? "Failed to Unstake Tokens" : "Failed to Withdraw Rewards")
    } finally {
      setIsStaking(false)
    }
  }


  console.log(data)

  return (
    <div className="flex flex-col font-space p-[40px_20px] text-white items-center justify-center">
      <TxReceipt
        visible={showTxModal}
        onClose={() => setShowTxModal(false)}
        title={txReceiptTitle}
        txHash={txHash}
      />
      {openConfirmStaking && (
        <ConfirmStakingModal
          stakeAmount={stakeAmount}
          tokenSymbol={data.stakeLock.stakeToken.symbol}
          onConfirm={handleStake}
          onClose={() => {
            setOpenConfirmStaking(false)
            setIsStaking(false)
          }}
          loading={isStaking}
          APY={data.stakeLock.apyRate}
        />
      )}
      {
        openConfirmUnstaking && (
          <ConfirmUnstaking
            tokenSymbol={data.stakeLock.stakeToken.symbol}
            onConfirm={handleWithdraw}
            onClose={() => {
              setOpenConfirmUnstaking(false)
              setIsStaking(false)
            }}
            loading={isStaking}
            APY={data.stakeLock.apyRate}
            rewardsTokenSymbol={data.stakeLock.rewardToken.symbol}
            lockAmount={data?.userData?.amountStaked}
            nextRewardTime={data.userData.nextRewardTime}
            rewardAmount={data?.userData?.rewards}
            lastStakeTime={data.userData.lastStakeTime}
          />
        )
      }
      <p className="text-[30px] lg:text-[70px] font-[500] leading-[35px] lg:leading-[75px] text-center">
        Boost Your Presale Rewards with <br className="hidden lg:block" />
        Staking Multipliers
      </p>
      <p className="text-[15px] text-center lg:text-start  lg:text-[22px] mt-[10px] lg:mt-[5px]">
        The more you stake in this pool, the higher your presale reward multiplier!
      </p>

      <img src="./unlock.svg" className="mt-[5px]" alt="" />

      <div className="mt-[40px] lg:mt-[20px] w-full lg:w-[50%] grid lg:grid-cols-3 gap-[20px]">
        <div className="lg:col-span-2 relative">
          <label>Lock Amount : {data?.userData?.amountStaked} DRX</label>

          <input type="number" step={0.01} className="cursor-pointer mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px] flex items-center justify-between px-[10px] text-center" value={stakeAmount} onChange={(e) => handleSetAmount(Number(e.target.value))} />
        </div>
        <div className="flex flex-col justify-center items-center relative">
          <p>Presale Multiplier Bonus</p>
          <div
            className="cursor-pointer mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px] flex items-center justify-center px-[10px] relative"
            onClick={() => setShowMultiplierDropdown(!showMultiplierDropdown)}
          >
            {multiplier}
            <FaChevronDown className="absolute right-2" />
            {showMultiplierDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white text-black rounded-[6px] border shadow-lg z-10">
                {multiplierOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMultiplierSelect(option.value)}
                  >
                    {option.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <p>Lock Period</p>
          <span className="cursor-pointer mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px] flex items-center justify-center px-[10px]">{Number(data.stakeLock.withdrawalIntervals) / (24 * 60 * 60)} Days</span>
        </div>
        <div className="">
          <p>Estimated Rewards</p>
          <span className="cursor-pointer mt-[5px] h-[50px] w-full outline-none bg-transparent border rounded-[6px] flex items-center justify-center px-[10px] relative">
            {estimatedRewards ? estimatedRewards : ""} DRX
          </span>
        </div>
        {
          !authenticated ? (
            <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] mt-[40px] w-full justify-center font-[500]" onClick={login}>
              <IoWalletSharp className="text-[14px] lg:text-[16px] col-span-3" />
              <p className="text-[14px] lg:text-[16px]">Connect Wallet to Join</p>
            </button>
          ) : (
            <>
                {(data?.userData?.amountStaked > 0 || data?.userData?.rewards > 0) && <button className="bg-transparent border-primary border-2 lg:col-span-3 text-bold text-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] mt-[40px] min-w-full justify-center font-[500]" onClick={() => setOpenConfirmUnstaking(true)}>
                  <p className="text-[14px] lg:text-[16px]">Withdraw</p>
                </button>}
                <button className="bg-primary lg:col-span-3 text-white font-[500] items-center justify-center h-[50px] rounded-[8px] min-w-full"
                  onClick={() => setOpenConfirmStaking(true)}
                >
                  Lock My Stake
                </button>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Dynamic;
