import { useState, useEffect } from "react";
import { IoWalletSharp } from "react-icons/io5";
import { GoAlert } from "react-icons/go";
import { FaCoins, FaChartLine } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { GiCrystalGrowth } from "react-icons/gi";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import { getTokenData } from "../../services";
import { toast } from "react-hot-toast";
import { usePrivy } from "@privy-io/react-auth";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { noOfDays } from "../../utils/tools";
import { getTokenBalance, getStakingPoolPauseStatus, getTotalSupply, getAmountStaked, getTokenDecimals, getTokenAllowance, getNextRewardWithdrawTime, getStakingPoolRewardsAmount, getLastStakeTime, getStakingPoolDataByAddress, getStakingPoolOwner } from "../../utils/web3/actions";
import ConfirmStakingModal from "../Modal/ConfirmStaking";
import ConfirmUnstaking from "../Modal/ConfirmUnstaking";
import { createWalletClient, custom } from "viem";
import { useChain } from "../../context/ChainContext";
import stakingPoolABI from "../../abis/StakingPool.json";
import erc20Abi from "../../abis/ERC20.json";
import { ethers } from "ethers";
import TxReceipt from "../Modal/TxReceipt";

import ManageStaking from "../Modal/ManageStaking";

// The createViemWalletClient function will be defined inside the component


function SingleStake() {
  const { publicClient } = useChain();

  // Add this function to create wallet client
  const createViemWalletClient = () => {
    return createWalletClient({
      chain: publicClient.chain,
      transport: custom(window.ethereum)
    });
  };

  const [coinGeckoData, setCoinGeckoData] = useState<any>(null);
  const { id } = useParams<{ id: `0x${string}` }>();
  // const { data, loading: loadingStakingPool, error: stakingPoolError } = useQuery(GET_STAKING_POOL_BY_ID, {
  //   variables: { id }
  // })

  const [startUpLoading, setStartUpLoading] = useState<boolean>(true);
  const [loadingStakingPool, setLoadingStakingPool] = useState<boolean>(true);
  const [stakingPoolError, setStakingPoolError] = useState<{ message: string }>({ message: "" });
  const [data, setData] = useState<any>(null);

  const { authenticated, login, user } = usePrivy();
  const [stakeAmount, setStakeAmount] = useState<number>(0.00)
  const [balance, setTokenBalance] = useState<string | 0>(0);
  const [paused, setPaused] = useState<boolean>(true)
  const [totalSupply, setTotalSupply] = useState<number | string>(0)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [staked, setStaked] = useState<number>(0);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [txReceiptTitle, setTxReceiptTitle] = useState<string>("Staking Successful");
  const [txHash, setTxHash] = useState<string>("");

  const [showUnstakeModal, setShowUnstakeModal] = useState<boolean>(false)
  const [nextRewardTime, setNextRewardTime] = useState<number>(0);
  const [rewardAmount, setRewardAmount] = useState<number>(0);
  const [lastStakeTime, setLastStakeTime] = useState(0);
  const [stakingPoolOwner, setStakingPoolOwner] = useState<`0x${string}` | string>("")

  const [manageStakingModal, setManageStakingModal] = useState<boolean>(false)


  useEffect(() => {
    if (authenticated) {
      loadUpData();
    }
  }, [authenticated]);

  async function loadUpData() {
    setLoadingStakingPool(true);
    try {
      const owner = await getStakingPoolOwner(id as `0x${string}`);
      setStakingPoolOwner(owner)
      const stakingPoolData = await getStakingPoolDataByAddress(id as `0x${string}`);
      // Set data first
      setData(stakingPoolData);
      // Then call getCoinGeckoTokenData with the new data directly
      await getCoinGeckoTokenData(stakingPoolData);
    } catch (error) {
      setStakingPoolError((prevError) => ({ ...prevError, message: "Failed to retrieve staking pool data" }));
    } finally {
      setLoadingStakingPool(false);
    }
  }

  async function getCoinGeckoTokenData(stakingPoolData?: any) {
    setStartUpLoading(true);

    // Use the passed data or fall back to state
    const poolData = stakingPoolData || data;

    try {
      if (!poolData?.stakingPool?.stakeToken?.id) {
        throw new Error("Staking pool data not available");
      }

      const tokenData = await getTokenData(poolData.stakingPool.stakeToken.id);
      setCoinGeckoData(tokenData);

      if (!user?.wallet?.address) {
        throw new Error("User wallet not connected");
      }

      const [
        tokenBalance,
        pauseStatus,
        supply,
        alreadyStaked,
        nextRewardTime,
        rewardsAmount,
        lastStakeTime
      ] = await Promise.all([
        getTokenBalance(poolData.stakingPool.stakeToken.id, user.wallet.address as `0x${string}`),
        getStakingPoolPauseStatus(poolData.stakingPool.id),
        getTotalSupply(poolData.stakingPool.stakeToken.id),
        getAmountStaked(poolData.stakingPool.id, user.wallet.address as `0x${string}`),
        getNextRewardWithdrawTime(poolData.stakingPool.id, user.wallet.address as `0x${string}`),
        getStakingPoolRewardsAmount(poolData.stakingPool.id, user.wallet.address as `0x${string}`),
        getLastStakeTime(poolData.stakingPool.id, user.wallet.address as `0x${string}`)
      ]);

      // Update state in one batch
      setTokenBalance(tokenBalance);
      setPaused(pauseStatus);
      setTotalSupply(supply);
      setStaked(Number(alreadyStaked));
      setNextRewardTime(nextRewardTime);
      setRewardAmount(Number(rewardsAmount));
      setLastStakeTime(lastStakeTime);

    } catch (error) {
      console.error(error);
      // toast.error("Failed to retrieve staking data");
    } finally {
      setStartUpLoading(false);
    }
  }

  async function reloadLockedAmount() {
    try {
      if (user?.wallet?.address) {
        const alreadyStaked = await getAmountStaked(data.stakingPool.id, user.wallet.address as `0x${string}`)
        const newBalance = await getTokenBalance(data.stakingPool.stakeToken.id, user.wallet.address as `0x${string}`);
        setStaked(Number(alreadyStaked));
        setTokenBalance(newBalance);
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleStake() {
    setIsStaking(true);
    const walletClient = createViemWalletClient();
    const [account] = await walletClient.getAddresses();
    const decimals = await getTokenDecimals(data.stakingPool.stakeToken.id)
    const stakeAmountArg = ethers.parseUnits(stakeAmount.toString(), decimals);
    const balanceOfStakeToken = await getTokenBalance(data.stakingPool.stakeToken.id, user?.wallet?.address as `0x${string}`);
    const tokenBalance = await getTokenBalance(data.stakingPool.stakeToken.id, user?.wallet?.address as `0x${string}`)
    console.log("running handle stake")
    if (Number(stakeAmount) > Number(tokenBalance)) {
      toast(`Insufficient ${data.stakingPool.stakeToken.symbol} Balance`)
      setIsStaking(false)
      return;
    }

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
          data.stakingPool.stakeToken.id,
          data.stakingPool.id,
          user.wallet.address as `0x${string}`
        )

        console.log(allowance);
        // Check if allowance is less than stake amount
        if (Number(allowance) < stakeAmount) {
          // Allow Contract to Spend
          const { request } = await publicClient.simulateContract({
            address: data.stakingPool.stakeToken.id,
            account,
            abi: erc20Abi,
            functionName: "approve",
            args: [data.stakingPool.id, stakeAmountArg]  // Changed to approve staking pool contract
          })

          // Run Approval
          const txHash = await walletClient.writeContract(request);
          await new Promise(resolve => setTimeout(resolve, 2000));
          const receipt = await publicClient.waitForTransactionReceipt({
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
          address: data.stakingPool.id,
          abi: stakingPoolABI,
          account,
          functionName: "stake",
          args: [
            stakeAmountArg
          ]
        })

        const hash = await walletClient.writeContract(request)
        toast("Successfully staked")
        setShowModal(false);


        setTxHash(hash)
        setTimeout(() => {
          setShowTxModal(true)
        }, 2000)
        setStakeAmount(0)
        setTimeout(async () => {
          await reloadLockedAmount();
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

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

        {/* Decorative grid line */}
        <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
        <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

        <motion.div
          className="sci-fi-panel p-8 max-w-[500px] w-full border border-cosmic/30 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

          <motion.div
            className="bg-cosmic/20 p-5 rounded-full mx-auto mb-6 w-[80px] h-[80px] flex items-center justify-center"
            animate={{
              boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <GiCrystalGrowth className="text-5xl text-cosmic" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-[28px] font-bold text-white mb-4 sci-fi-text-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Start Earning <span className="text-cosmic">Solana Rewards</span>
          </motion.h2>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>

          <motion.p
            className="text-[16px] text-gray-300 mb-8 font-space"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join our Solana staking pool to earn up to 25% APY rewards and increase your IDO allocation power.
            Connect your wallet to start earning passive income with lightning-fast rewards distribution.
          </motion.p>

          <motion.button
            onClick={login}
            className="relative px-8 py-3 font-medium text-white flex items-center justify-center overflow-hidden w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
            <motion.span
              className="relative flex items-center"
              whileHover={{
                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
              }}
            >
              <IoWalletSharp className="text-xl mr-2" />
              <span>Connect Wallet</span>
            </motion.span>
          </motion.button>

          {/* Floating elements */}
          <motion.div
            className="absolute top-10 right-10 text-skyblue"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SiSolana className="text-xl" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 text-cosmic"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SiSolana className="text-xl" />
          </motion.div>
        </motion.div>
      </div>
    );
  }


  if (startUpLoading || loadingStakingPool) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotate: 360,
              boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="p-4 rounded-full bg-deepspace border border-cosmic/30"
          >
            <SiSolana className="text-4xl text-cosmic" />
          </motion.div>
          <p className="text-cosmic mt-4 text-center font-orbitron">Loading Staking Data...</p>
        </motion.div>
      </div>
    );
  }


  if (stakingPoolError.message) {
    return (
      <motion.div
        className="text-red-400 text-center p-10 bg-deepspace/50 rounded-lg border border-red-500/30 max-w-2xl mx-auto my-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaChartLine className="text-4xl text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 font-orbitron">Error Loading Staking Pool</h3>
        <p className="font-space">{stakingPoolError.message}</p>
        <motion.button
          className="mt-4 px-4 py-2 bg-cosmic/20 hover:bg-cosmic/30 border border-cosmic/50 rounded-lg text-white transition-colors"
          onClick={() => loadUpData()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }


  function confirmStake() {
    if (stakeAmount === 0) {
      toast("Set stake amount")
      return;
    }

    setShowModal(true)
    return
  }

  async function unstakeConfirm() {
    setShowUnstakeModal(true)
    return;
  }

  async function handleWithdraw(unstake: boolean = false) {
    const walletClient = createViemWalletClient();
    const [account] = await walletClient.getAddresses();

    if (unstake === false) {
      if (Number(rewardAmount) === 0) {
        toast("No Rewards Available")
        return;
      }
    }

    try {
      setIsStaking(true);
      const { request } = await publicClient.simulateContract({
        address: data.stakingPool.id,
        abi: stakingPoolABI,
        account,
        functionName: "withdraw",
        args: [unstake]
      })

      const hash = await walletClient.writeContract(request);
      setTxReceiptTitle(unstake ? "Successfully Unstaked" : "Successfully Withdrawal and Unstaking")
      setTxHash(hash)
      setStaked(0)
      setShowUnstakeModal(false)

      toast(unstake ? "Successfully Unstaked tokens" : "Successful Withdrawal of Reward Tokens & Unstake")


      setTimeout(() => {
        setShowTxModal(false)
      }, 2000)
      setTimeout(async () => {
        await reloadLockedAmount();
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


  return (
    <div className="text-white font-orbitron p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <TxReceipt
        visible={showTxModal}
        onClose={() => setShowTxModal(false)}
        title={txReceiptTitle}
        txHash={txHash}
      />
      {manageStakingModal && (
        <ManageStaking
          stakingPoolAddress={id as `0x${string}`}
          onClose={() => setManageStakingModal(false)}
          userAddress={user?.wallet?.address as `0x${string}`}
          refetch={loadUpData}
        />
      )}
      {showModal && (
        <ConfirmStakingModal
          stakeAmount={stakeAmount}
          tokenSymbol={data.stakingPool.stakeToken.symbol}
          onConfirm={handleStake}
          onClose={() => {
            setShowModal(false)
            setIsStaking(false)
          }}
          loading={isStaking}
          APY={data.stakingPool.apyRate}
        />
      )}
      {showUnstakeModal && (
        <ConfirmUnstaking
          tokenSymbol={data.stakingPool.stakeToken.symbol}
          onConfirm={handleWithdraw}
          onClose={() => {
            setShowUnstakeModal(false)
            setIsStaking(false)
          }}
          loading={isStaking}
          APY={data.stakingPool.apyRate}
          rewardsTokenSymbol={data.stakingPool.rewardToken.symbol}
          lockAmount={staked}
          nextRewardTime={nextRewardTime}
          rewardAmount={rewardAmount}
          lastStakeTime={lastStakeTime}
        />
      )}

      <motion.div
        className="w-full max-w-3xl mx-auto sci-fi-panel rounded-lg border border-cosmic/30 p-[40px] relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

        <div className="relative">
          <motion.div
            className="flex items-center justify-center relative mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="items-center flex justify-center space-x-[15px]">
              {coinGeckoData?.image?.thumb ? (
                <motion.img
                  src={coinGeckoData.image.thumb}
                  className="h-[60px] w-[60px] rounded-full border border-cosmic/50 p-1 bg-deepspace/50"
                  alt=""
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.div
                  className="h-[60px] w-[60px] rounded-full border border-cosmic/50 flex items-center justify-center bg-deepspace/50"
                  animate={{
                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <SiSolana className="text-2xl text-cosmic" />
                </motion.div>
              )}
              <div>
                <h2 className="text-[28px] font-bold sci-fi-text-glow">{data.stakingPool.stakeToken.name}</h2>
                <div className="flex items-center space-x-[10px] mt-1">
                  <p className="text-gray-400 text-sm">Status:</p>
                  {!paused ? (
                    <motion.p
                      className="bg-cosmic/15 text-cosmic text-[14px] rounded-lg px-3 py-1 text-center"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Live
                    </motion.p>
                  ) : (
                    <p className="bg-red-500/15 text-red-500 text-[14px] rounded-lg px-3 py-1 text-center">
                      Paused
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="my-[30px] flex flex-col items-center w-full justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="text-gray-400 mb-2 font-space">Amount to Stake</label>
            <div className="relative w-full max-w-xs">
              <input
                className="text-cosmic text-[48px] text-center bg-deepspace/30 outline-none border border-cosmic/30 rounded-lg w-full py-4 px-6 font-bold"
                type="number"
                step={0.01}
                value={stakeAmount.toFixed(2)}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                min={0}
              />
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-cosmic/20 px-2 py-1 rounded text-sm font-space"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {data.stakingPool.stakeToken.symbol}
              </motion.div>
            </div>
          </motion.form>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between bg-deepspace/30 p-4 rounded-lg border border-cosmic/20">
              <div className="flex items-center gap-2">
                <FaCoins className="text-cosmic" />
                <p className="text-white text-[16px] font-space">Locked Amount:</p>
              </div>
              <p className="text-cosmic font-bold">{staked} {data.stakingPool.stakeToken.symbol}</p>
            </div>
            <div className="flex items-center justify-between bg-deepspace/30 p-4 rounded-lg border border-cosmic/20 mt-2">
              <div className="flex items-center gap-2">
                <SiSolana className="text-cosmic" />
                <p className="text-white text-[16px] font-space">Available Balance:</p>
              </div>
              <p className="text-cosmic font-bold">{balance} {data.stakingPool.stakeToken.symbol}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-deepspace/30 rounded-lg border border-cosmic/20 p-4 space-x-[10px] text-white flex items-center hover:border-cosmic/40 transition-colors mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <GoAlert className="text-[25px] lg:text-[20px] text-cosmic" />
            <p className="text-[14px] lg:text-[16px] leading-[20px] truncate font-space" title={coinGeckoData?.description?.en || "..."}>
              {coinGeckoData?.description?.en || "..."}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-deepspace/30 rounded-lg border border-cosmic/20 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FaChartLine className="text-cosmic" /> Staking Summary
              </h3>
              <div className="space-y-3 font-space">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Current Price:</p>
                  <p className="text-white font-bold">
                    {coinGeckoData?.market_data?.current_price?.usd
                      ? `$${coinGeckoData.market_data.current_price.usd}`
                      : "$???"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Market Cap:</p>
                  <p className="text-white font-bold">
                    {coinGeckoData?.market_data?.market_cap?.usd
                      ? `$${new Intl.NumberFormat('en-US').format(coinGeckoData.market_data.market_cap.usd)}`
                      : "$???"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Total Supply:</p>
                  <p className="text-white font-bold">
                    {totalSupply
                      ? new Intl.NumberFormat('en-US').format(Number(totalSupply))
                      : 0} {data.stakingPool.stakeToken.symbol}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-deepspace/30 rounded-lg border border-cosmic/20 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <SiSolana className="text-cosmic" /> Pool Details
              </h3>
              <div className="space-y-3 font-space">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Total Staked:</p>
                  <p className="text-white font-bold">
                    {data.stakingPool.totalStaked} {data.stakingPool.stakeToken.symbol}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">APY Rate:</p>
                  <motion.p
                    className="text-cosmic font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {data.stakingPool.apyRate}%
                  </motion.p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Vesting Period:</p>
                  <p className="text-white font-bold">
                    {noOfDays(data.stakingPool.withdrawalIntervals)} days
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {!authenticated ? (
              <motion.button
                className="relative w-full py-3 text-center overflow-hidden"
                onClick={login}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                <motion.span
                  className="relative flex items-center justify-center gap-2"
                  whileHover={{
                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                  }}
                >
                  <IoWalletSharp className="text-xl" />
                  <span>Connect Wallet to Join</span>
                </motion.span>
              </motion.button>
            ) : (
              <div className="space-y-4">
                {/* Secondary Button - Manage Staking Pool */}
                {stakingPoolOwner.toLowerCase() === user?.wallet?.address?.toLowerCase() && (
                  <motion.button
                    className="relative w-full py-3 text-center overflow-hidden"
                    onClick={() => setManageStakingModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                    <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                    <motion.span
                      className="relative flex items-center justify-center gap-2"
                      whileHover={{
                        textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                      }}
                    >
                      <SiSolana className="mr-2" /> Manage Staking Pool
                    </motion.span>
                  </motion.button>
                )}

                {/* Primary Button - Withdraw */}
                {(staked > 0 || rewardAmount > 0) && (
                  <motion.button
                    className="relative w-full py-3 text-center overflow-hidden"
                    onClick={unstakeConfirm}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                    <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                    <motion.span
                      className="relative flex items-center justify-center gap-2"
                      whileHover={{
                        textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                      }}
                    >
                      <FaCoins className="mr-2" /> Withdraw Rewards
                    </motion.span>
                  </motion.button>
                )}

                {/* Primary Button - Confirm Stake */}
                <motion.button
                  className="relative w-full py-3 text-center overflow-hidden"
                  onClick={confirmStake}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={stakeAmount === 0}
                >
                  <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                  <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                  <motion.span
                    className="relative flex items-center justify-center gap-2"
                    whileHover={{
                      textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                    }}
                  >
                    <SiSolana className="mr-2" /> Confirm Stake
                  </motion.span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SingleStake
