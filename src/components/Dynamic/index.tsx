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
import { baseSepolia } from 'viem/chains';
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
    chain: baseSepolia,
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
          size={24}
          strokeWidth={6}
          strokeColor="#FFFFFF"
          duration={2000}
        />
      </div>
    );
  }


  if (error.message) {
    return <div className="text-red-500 text-center">Error loading Lock & Stake: {error.message}</div>;
  }

  async function handleStake() {
    if(!user?.wallet?.address){
      toast("Connect Wallet")
      return;
    }
    setIsStaking(true);
    const walletClient = createViemWalletClient();
    const [account] = await walletClient.getAddresses();
    const decimals = await getTokenDecimals(data.stakeLock.stakeToken.id)
    const stakeAmountArg = ethers.parseUnits(stakeAmount.toString(), decimals);
    const balanceOfStakeToken = await getTokenBalance(data.stakeLock.stakeToken.id, user?.wallet?.address as `0x${string}`);

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
        try {
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

        } catch (error: any) {
          console.error(error.message)
          if (error.message.includes("User rejected the request")) {
            toast("User Rejected the Request")
            return;
          }
        } finally {
          setIsStaking(false);
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
      if (Number(data?.userData?.rewards) === 0) {
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
  const currentMultiplier = returnMultiplier(data?.userData?.amountStaked || 0);

  return (
    <div className="flex flex-col font-space text-white">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden hero-bg">
        <div className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[40px] bg-[#8949FF33]"></div>
        <div className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[40px] bg-[#8949FF33]"></div>

        {/* Header Content */}
        <div className="w-full lg:w-[80%] mx-auto text-center py-16 px-4">
          <h1 className="text-[30px] lg:text-[70px] font-[500] leading-[35px] lg:leading-[75px] text-center">
            Boost Your Presale Rewards with <br className="hidden lg:block" />
            Staking Multipliers
          </h1>
          <p className="text-[15px] text-center lg:text-[22px] mt-[10px] lg:mt-[5px] text-gray-300">
            The more you stake in this pool, the higher your presale reward multiplier!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
        {/* User Stats Cards */}
        {authenticated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Badge */}
            <div className="bg-[#000027] p-6 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex items-center space-x-3 mb-4">
                {badgeInfo.image && (
                  <img src={badgeInfo.image} alt={badgeInfo.name} className="w-12 h-12" />
                )}
                <div>
                  <h3 className="text-xl font-bold">{badgeInfo.name}</h3>
                  <p className="text-gray-400">Current Badge</p>
                </div>
              </div>
            </div>

            {/* Current Multiplier */}
            <div className="bg-[#000027] p-6 shadow-lg hover:shadow-2xl transition-all">
              <div className="text-center">
                <span className="text-4xl font-bold text-primary block mb-2">{currentMultiplier}</span>
                <p className="text-gray-400">Current Multiplier</p>
              </div>
            </div>

            {/* Amount Staked */}
            <div className="bg-[#000027] p-6 shadow-lg hover:shadow-2xl transition-all">
              <div className="text-center">
                <span className="text-4xl font-bold block mb-2">{data?.userData?.amountStaked || 0}</span>
                <p className="text-gray-400">Total Staked DRX</p>
              </div>
            </div>
          </div>
        )}

        {/* Staking Interface */}
        <div className="bg-[#000027] p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Staking Input */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Amount to Stake</label>
                <div className="relative group">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => handleSetAmount(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A]  p-4 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter amount"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-gray-400">DRX</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Target Multiplier</label>
                <div className="relative">
                  <button
                    onClick={() => setShowMultiplierDropdown(!showMultiplierDropdown)}
                    className="w-full bg-[#1A1A1A]  p-4 text-left flex items-center justify-between hover:bg-[#252525] transition-colors"
                  >
                    <span>{multiplier}</span>
                    <FaChevronDown className={`transition-transform duration-300 ${showMultiplierDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showMultiplierDropdown && (
                    <div className="absolute w-full mt-2 bg-[#1A1A1A]  shadow-xl z-10 border border-primary/20">
                      {multiplierOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleMultiplierSelect(option.value)}
                          className="w-full p-4 text-left hover:bg-primary hover:text-white transition-all flex justify-between items-center"
                        >
                          <span>{option.value}</span>
                          <span className="text-sm text-gray-400">Min: {option.minAmount} DRX</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Estimated Rewards */}
              <div className="bg-[#1A1A1A] p-6  border border-primary/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Estimated Rewards</p>
                    <p className="text-2xl font-bold mt-1">{estimatedRewards} DRX</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">APY</p>
                    <p className="text-xl font-bold text-primary">{data?.stakeLock?.apyRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              {!authenticated ? (
                <button
                  onClick={login}
                  className="w-full bg-primary text-white p-4  flex items-center justify-center space-x-3 hover:bg-primary/90 transition-all text-lg font-medium"
                >
                  <IoWalletSharp className="text-xl" />
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setOpenConfirmStaking(true)}
                    disabled={isStaking || stakeAmount <= 0}
                    className="w-full bg-primary text-white p-4  hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                  >
                    {isStaking ? (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Processing</span>
                        <Preloader
                          use={ThreeDots}
                          size={24}
                          strokeWidth={6}
                          strokeColor="#FFFFFF"
                          duration={2000}
                        />
                      </div>
                    ) : (
                      'Stake DRX'
                    )}
                  </button>
                  <button
                    onClick={() => setOpenConfirmUnstaking(true)}
                    disabled={isStaking || !data?.userData?.amountStaked}
                    className="w-full border-2 border-primary text-primary p-4  hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                  >
                    {isStaking ? (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Processing</span>
                        <Preloader
                          use={ThreeDots}
                          size={24}
                          strokeWidth={6}
                          strokeColor="#FFFFFF"
                          duration={2000}
                        />
                      </div>
                    ) : (
                      'Unstake DRX'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        {openConfirmStaking && (
          <ConfirmStakingModal
            onClose={() => setOpenConfirmStaking(false)}
            onConfirm={handleStake}
            stakeAmount={stakeAmount}
            loading={isStaking}
            APY={data.stakeLock.apyRate}
            tokenSymbol="DRX"
          />
        )}
        {openConfirmUnstaking && (
          <ConfirmUnstaking
            tokenSymbol={data.stakeLock.stakeToken.symbol}
            onConfirm={() => handleWithdraw(false)}
            onClose={() => setOpenConfirmUnstaking(false)}
            loading={isStaking}
            APY={data.stakeLock.apyRate}
            rewardsTokenSymbol={data.stakeLock.rewardToken.symbol}
            nextRewardTime={data.userData.nextRewardTime}
            lockAmount={data.userData.amountStaked}
            rewardAmount={data.userData.rewards}
            lastStakeTime={data.userData.lastStakeTime}
            lockStake={true}
          />
        )}

        <TxReceipt
          visible={showTxModal}
          onClose={() => setShowTxModal(false)}
          txHash={txHash}
          title={txReceiptTitle}
        />
      </div>
    </div>
  );
}

export default Dynamic;
