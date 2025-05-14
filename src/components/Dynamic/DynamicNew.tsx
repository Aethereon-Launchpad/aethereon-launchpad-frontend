import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import {
  FaSatelliteDish,
  FaSpaceShuttle,
  FaRocket,
  FaGlobeAsia,
  FaStar,
  FaChartLine
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { IoWalletSharp } from "react-icons/io5";
import { GiStarFormation, GiMoonOrbit, GiGalaxy } from "react-icons/gi";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import ConfirmStakingModal from "../Modal/ConfirmStaking";
import ConfirmUnstaking from "../Modal/ConfirmUnstaking";
import TxReceipt from "../Modal/TxReceipt";
import { useLockStake } from "../../hooks/web3/useLockStake";
import { usePrivy } from "@privy-io/react-auth";
import { createWalletClient, custom } from 'viem';
import { ethers } from 'ethers';
import { estimateRewards as estimateStakeRewards } from "../../utils/web3/stakeLock";
import { toast } from 'react-hot-toast';
import { getTokenDecimals, getTokenBalance, getTokenAllowance } from "../../utils/web3/actions";
import erc20Abi from "../../abis/ERC20.json";
import stakeLockABI from "../../abis/StakeLock.json";
import { useChain } from "../../context/ChainContext";

function DynamicNew() {
  const { publicClient } = useChain();
  const createViemWalletClient = () => {
    return createWalletClient({
      chain: publicClient.chain,
      transport: custom(window.ethereum)
    });
  };

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
  const [activeTab, setActiveTab] = useState<string>("stake");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const badges = [
    {
      icon: <FaSatelliteDish className="text-4xl text-cosmic" />,
      title: "Orbital Scout",
      range: "1,000 - 4,999 $ATH",
      multiplier: "1.5x",
    },
    {
      icon: <FaRocket className="text-4xl text-cosmic" />,
      title: "Cosmic Voyager",
      range: "5,000 - 9,999 $ATH",
      multiplier: "2x",
    },
    {
      icon: <FaSpaceShuttle className="text-4xl text-cosmic" />,
      title: "Stellar Guardian",
      range: "10,000 - 14,999 $ATH",
      multiplier: "2.5x",
    },
    {
      icon: <FaGlobeAsia className="text-4xl text-cosmic" />,
      title: "Nebula Commander",
      range: "15,000 - 49,999 $ATH",
      multiplier: "3x",
    },
    {
      icon: <FaStar className="text-4xl text-cosmic" />,
      title: "Quantum Guardian",
      range: "50,000+ $ATH",
      multiplier: "3.5x",
    }
  ];

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
      return {
        name: "Quantum Guardian",
        icon: <FaStar className="text-4xl text-cosmic" />,
        tier: 5
      };
    } else if (amount >= 15000) {
      return {
        name: "Nebula Commander",
        icon: <FaGlobeAsia className="text-4xl text-cosmic" />,
        tier: 4
      };
    } else if (amount >= 10000) {
      return {
        name: "Stellar Guardian",
        icon: <FaSpaceShuttle className="text-4xl text-cosmic" />,
        tier: 3
      };
    } else if (amount >= 5000) {
      return {
        name: "Cosmic Voyager",
        icon: <FaRocket className="text-4xl text-cosmic" />,
        tier: 2
      };
    } else if (amount >= 1000) {
      return {
        name: "Orbital Scout",
        icon: <FaSatelliteDish className="text-4xl text-cosmic" />,
        tier: 1
      };
    }
    return {
      name: "No Badge",
      icon: <SiSolana className="text-4xl text-cosmic/50" />,
      tier: 0
    };
  }

  const badgeInfo = getBadgeInfo(data?.userData?.amountStaked || 0);
  const currentMultiplier = returnMultiplier(data?.userData?.amountStaked || 0);

  // Handlers for staking and unstaking
  async function handleStake() {
    if (!user?.wallet?.address) {
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

        try {
          // Check if allowance is less than stake amount
          if (Number(allowance) < stakeAmount) {
            // Allow Contract to Spend
            const { request } = await publicClient.simulateContract({
              address: data.stakeLock.stakeToken.id,
              account,
              abi: erc20Abi,
              functionName: "approve",
              args: [data.stakeLock.id, stakeAmountArg]
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

        } catch (error: any) {
          console.error(error.message)
          if (error.message.includes("User rejected the request")) {
            toast("User Rejected the Request")
            return;
          }
          setIsStaking(false)
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
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: hash
        })

        if (receipt.status === "success") {
          toast("Successfully staked")
          setShowTxModal(false);
          setTxReceiptTitle("Successfully Staked")

          setTxHash(hash)
          setTimeout(() => {
            setShowTxModal(true)
          }, 2000)
          setStakeAmount(0)
          setOpenConfirmStaking(false)
          setTimeout(async () => {
            await refetch();
          }, 5000)
        }

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[600px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-deepspace/50 p-8 rounded-lg border border-cosmic/30 flex flex-col items-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <SiSolana className="text-cosmic text-5xl mb-4" />
          </motion.div>
          <Preloader
            use={ThreeDots}
            size={60}
            strokeWidth={6}
            strokeColor="#6c5ce7"
            duration={2000}
          />
          <p className="text-cosmic mt-4 font-orbitron">Loading Staking Data...</p>
        </motion.div>
      </div>
    );
  }

  if (error.message) {
    return (
      <div className="flex justify-center items-center min-h-[600px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-deepspace/50 p-8 rounded-lg border border-red-500/30 flex flex-col items-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-red-500 text-4xl mb-4"
          >
            ⚠️
          </motion.div>
          <p className="text-red-500 text-center font-orbitron">Error loading staking data: {error.message}</p>
          <motion.button
            className="mt-4 bg-deepspace border border-cosmic/30 px-4 py-2 rounded-md text-cosmic font-orbitron"
            whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-space text-white">
      {/* Hero Section with animated background */}
      <div className="p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

        {/* Animated stars */}
        <motion.div
          className="absolute top-[15%] right-[10%] text-cosmic text-xl"
          animate={{
            y: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaStar />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[15%] text-skyblue text-sm"
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaStar />
        </motion.div>

        {/* Decorative grid line */}
        <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
        <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-12"
          >
            <motion.div
              className="inline-block bg-cosmic/20 px-4 py-1 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-cosmic font-orbitron uppercase text-sm tracking-wider">Solana Ecosystem</span>
            </motion.div>

            <motion.h1
              className="text-[36px] lg:text-[60px] font-bold font-orbitron sci-fi-text-glow mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Boost Your Rewards with <br className="hidden lg:block" />
              <span className="text-cosmic">Staking Multipliers</span>
            </motion.h1>

            <motion.div
              className="w-[150px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "150px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>

            <motion.p
              className="text-[16px] lg:text-[20px] text-gray-300 font-space max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Stake $AETHER tokens to unlock exclusive benefits and higher multipliers in the Aethereon ecosystem on Solana
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* User Stats Cards */}
      {authenticated && (
        <div className="p-[40px_20px] lg:p-[60px_40px] bg-gradient-to-b from-deepspace/20 to-deepspace/10 relative">
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Current Badge Card */}
            <motion.div
              className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

              <div className="flex items-center space-x-4">
                <motion.div
                  className="bg-cosmic/20 p-4 rounded-full"
                  animate={{
                    boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {badgeInfo.icon}
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">{badgeInfo.name}</h3>
                  <p className="text-gray-400 text-sm font-space">Current Badge</p>

                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((tier) => (
                      <motion.div
                        key={tier}
                        className={`w-2 h-2 rounded-full mr-1 ${tier <= badgeInfo.tier
                          ? 'bg-cosmic'
                          : 'bg-gray-700'
                          }`}
                        animate={tier <= badgeInfo.tier ? {
                          scale: [1, 1.3, 1],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: tier * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Multiplier Card */}
            <motion.div
              className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative mb-2"
                >
                  <FaChartLine className="text-4xl text-cosmic" />
                  <motion.div
                    className="absolute inset-0 bg-cosmic rounded-full blur-md -z-10"
                    animate={{
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </motion.div>

                <motion.p
                  className="text-4xl font-bold text-cosmic font-orbitron"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentMultiplier}
                </motion.p>
                <p className="text-gray-400 text-sm font-space mt-1">Current Multiplier</p>
              </div>
            </motion.div>

            {/* Amount Staked Card */}
            <motion.div
              className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative mb-2"
                >
                  <SiSolana className="text-4xl text-cosmic" />
                  <motion.div
                    className="absolute inset-0 bg-cosmic rounded-full blur-md -z-10"
                    animate={{
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </motion.div>

                <motion.p
                  className="text-4xl font-bold text-cosmic font-orbitron"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {data?.userData?.amountStaked || 0}
                </motion.p>
                <p className="text-gray-400 text-sm font-space mt-1">Total Staked AETHER</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Staking Interface */}
      <div className="p-[40px_20px] lg:p-[60px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <motion.h2
              className="text-[28px] lg:text-[36px] font-bold font-orbitron sci-fi-text-glow mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Stake Your AETHER Tokens
            </motion.h2>

            <motion.div
              className="w-[100px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-deepspace/30 p-1 rounded-lg border border-cosmic/20 flex">
              <motion.button
                className={`px-6 py-2 rounded-md font-orbitron ${activeTab === 'stake' ? 'bg-cosmic text-white' : 'text-gray-300'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('stake')}
              >
                Stake
              </motion.button>
              <motion.button
                className={`px-6 py-2 rounded-md font-orbitron ${activeTab === 'unstake' ? 'bg-cosmic text-white' : 'text-gray-300'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('unstake')}
              >
                Unstake
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="sci-fi-panel border border-cosmic/30 p-8 rounded-lg relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Staking Input */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'stake' ? (
                    <motion.div
                      key="stake-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2 font-space">Amount to Stake</label>
                        <div className="relative group">
                          <input
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => handleSetAmount(Number(e.target.value))}
                            className="w-full bg-deepspace/50 p-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic transition-all border border-cosmic/20 focus:border-transparent font-space"
                            placeholder="Enter amount"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                            <span className="text-gray-400 font-medium font-space">AETHER</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 font-space">Target Multiplier</label>
                        <div className="relative">
                          <motion.button
                            onClick={() => setShowMultiplierDropdown(!showMultiplierDropdown)}
                            className="w-full bg-deepspace/50 p-4 text-left flex items-center justify-between hover:bg-deepspace/70 transition-colors rounded-lg border border-cosmic/20"
                            whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
                          >
                            <div className="flex items-center">
                              <span className="text-cosmic font-medium mr-2 font-orbitron">{multiplier}</span>
                              <span className="text-sm text-gray-400 font-space">Multiplier</span>
                            </div>
                            <motion.div
                              animate={{ rotate: showMultiplierDropdown ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FaChevronDown className="text-cosmic" />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {showMultiplierDropdown && (
                              <motion.div
                                className="absolute w-full mt-2 bg-deepspace/80 rounded-lg shadow-xl z-10 border border-cosmic/20 overflow-hidden"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {multiplierOptions.map((option, index) => (
                                  <motion.button
                                    key={option.value}
                                    onClick={() => handleMultiplierSelect(option.value)}
                                    className="w-full p-4 text-left hover:bg-cosmic/20 transition-all flex justify-between items-center border-b border-cosmic/10 last:border-b-0"
                                    whileHover={{ x: 5 }}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                  >
                                    <span className="font-medium font-orbitron text-cosmic">{option.value}</span>
                                    <span className="text-sm text-gray-400 font-space">Min: {option.minAmount} AETHER</span>
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Estimated Rewards */}
                      <motion.div
                        className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20"
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-400 mb-1 font-space">Estimated Rewards</p>
                            <motion.p
                              className="text-2xl font-bold font-orbitron"
                              animate={{ scale: [1, 1.03, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {Number(estimatedRewards).toLocaleString()} <span className="text-cosmic">AETHER</span>
                            </motion.p>
                          </div>
                          <div className="text-right bg-cosmic/10 px-4 py-2 rounded-lg">
                            <p className="text-sm text-gray-300 font-space">APY</p>
                            <p className="text-xl font-bold text-cosmic font-orbitron">{data?.stakeLock?.apyRate}%</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unstake-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <motion.div
                        className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20"
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-400 mb-1 font-space">Currently Staked</p>
                            <motion.p
                              className="text-2xl font-bold font-orbitron"
                              animate={{ scale: [1, 1.03, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {data?.userData?.amountStaked || 0} <span className="text-cosmic">AETHER</span>
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20"
                        whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", boxShadow: "0 0 10px rgba(108, 92, 231, 0.2)" }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-400 mb-1 font-space">Available Rewards</p>
                            <motion.p
                              className="text-2xl font-bold font-orbitron"
                              animate={{ scale: [1, 1.03, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {data?.userData?.rewards || 0} <span className="text-cosmic">AETHER</span>
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>

                      <div className="bg-cosmic/10 p-4 rounded-lg border border-cosmic/20">
                        <p className="text-sm text-gray-300 font-space">
                          Unstaking will remove your tokens from the staking pool and may affect your multiplier tier.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column - Action Buttons */}
              <div className="flex flex-col justify-center space-y-6">
                {!authenticated ? (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20">
                      <h3 className="text-xl font-bold mb-2 font-orbitron">Connect Your Wallet</h3>
                      <p className="text-gray-400 mb-4 font-space">Connect your wallet to start staking and earning rewards</p>
                      <motion.button
                        onClick={login}
                        className="relative overflow-hidden w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                        <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                        <motion.span
                          className="relative flex items-center justify-center gap-2 py-3 font-orbitron"
                          whileHover={{
                            textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                          }}
                        >
                          <IoWalletSharp className="text-xl text-cosmic" />
                          <span>Connect Wallet</span>
                        </motion.span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <AnimatePresence mode="wait">
                      {activeTab === 'stake' ? (
                        <motion.div
                          key="stake-action"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20"
                        >
                          <h3 className="text-xl font-bold mb-4 font-orbitron">Stake Your Tokens</h3>
                          <p className="text-gray-400 mb-6 font-space">Stake your AETHER tokens to earn rewards and increase your multiplier</p>
                          <motion.button
                            onClick={() => setOpenConfirmStaking(true)}
                            disabled={isStaking || stakeAmount <= 0}
                            className="relative overflow-hidden w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isStaking || stakeAmount <= 0 ? 1 : 1.02 }}
                            whileTap={{ scale: isStaking || stakeAmount <= 0 ? 1 : 0.98 }}
                          >
                            <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                            <motion.span
                              className="relative flex items-center justify-center gap-2 py-3 font-orbitron"
                              whileHover={{
                                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                              }}
                            >
                              {isStaking ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <span>Processing</span>
                                  <Preloader
                                    use={ThreeDots}
                                    size={24}
                                    strokeWidth={6}
                                    strokeColor="#6c5ce7"
                                    duration={2000}
                                  />
                                </div>
                              ) : (
                                <>
                                  <SiSolana className="text-cosmic" />
                                  <span>Stake AETHER</span>
                                </>
                              )}
                            </motion.span>
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="unstake-action"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-deepspace/30 p-6 rounded-lg border border-cosmic/20"
                        >
                          <h3 className="text-xl font-bold mb-4 font-orbitron">Manage Your Stake</h3>
                          <p className="text-gray-400 mb-6 font-space">Withdraw your staked tokens and claim rewards</p>
                          <motion.button
                            onClick={() => setOpenConfirmUnstaking(true)}
                            disabled={isStaking || data?.userData?.amountStaked === 0}
                            className="relative overflow-hidden w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isStaking || data?.userData?.amountStaked === 0 ? 1 : 1.02 }}
                            whileTap={{ scale: isStaking || data?.userData?.amountStaked === 0 ? 1 : 0.98 }}
                          >
                            <span className="absolute inset-0 w-full h-full bg-cosmic/70 clip-path-polygon"></span>
                            <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                            <motion.span
                              className="relative flex items-center justify-center gap-2 py-3 font-orbitron"
                              whileHover={{
                                textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                              }}
                            >
                              {isStaking ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <span>Processing</span>
                                  <Preloader
                                    use={ThreeDots}
                                    size={24}
                                    strokeWidth={6}
                                    strokeColor="#6c5ce7"
                                    duration={2000}
                                  />
                                </div>
                              ) : (
                                <>
                                  <FaArrowRight className="text-cosmic" />
                                  <span>Unstake AETHER</span>
                                </>
                              )}
                            </motion.span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Multiplier Tiers */}
      <div className="p-[40px_20px] lg:p-[60px_40px] bg-gradient-to-b from-deepspace/20 to-deepspace/10 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-12"
          >
            <motion.h2
              className="text-[28px] lg:text-[36px] font-bold font-orbitron sci-fi-text-glow mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Cosmic Tier System
            </motion.h2>

            <motion.div
              className="w-[100px] h-[2px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>

            <motion.p
              className="text-[16px] lg:text-[18px] text-gray-300 font-space max-w-3xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Stake more AETHER tokens to unlock higher multiplier tiers and maximize your rewards in the Aethereon ecosystem
            </motion.p>

            {/* Tier indicator */}
            <motion.div
              className="flex justify-center gap-2 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[1, 2, 3, 4, 5].map((tier) => (
                <motion.div
                  key={tier}
                  className={`w-3 h-3 rounded-full ${tier === 1 ? 'bg-gray-400' : tier === 2 ? 'bg-skyblue' : tier === 3 ? 'bg-blue-500' : tier === 4 ? 'bg-purple-500' : 'bg-cosmic'}`}
                  whileHover={{ scale: 1.5 }}
                  animate={{
                    boxShadow: [`0 0 5px rgba(108, 92, 231, 0.${tier})`, `0 0 10px rgba(108, 92, 231, 0.${tier + 2})`, `0 0 5px rgba(108, 92, 231, 0.${tier})`]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: tier * 0.2
                  }}
                ></motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                className="relative h-fit flex flex-col justify-between overflow-hidden group"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Card background with glow effect */}
                <div className="absolute inset-0 bg-deepspace/80 rounded-lg z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic/10 to-deepspace/80 rounded-lg z-0"></div>

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg z-0 border border-cosmic/30"
                  animate={{
                    boxShadow: ['0 0 5px rgba(108, 92, 231, 0.2)', '0 0 15px rgba(108, 92, 231, 0.4)', '0 0 5px rgba(108, 92, 231, 0.2)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>

                {/* Card content */}
                <div className="relative p-[30px] text-white z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {badge.icon}
                    </motion.div>
                    <motion.div
                      className="bg-cosmic/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      Tier {index + 1}
                    </motion.div>
                  </div>

                  <h3 className="text-[24px] font-[600] sci-fi-text-glow mb-2 font-orbitron">{badge.title}</h3>

                  <p className="text-[16px] mt-[10px] text-skyblue font-space">
                    Stake {badge.range}
                  </p>

                  <div className="mt-4 space-y-2">
                    <p className="text-[18px] font-[700] text-cosmic flex items-center font-orbitron">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="inline-block mr-2"
                      >
                        ⚡
                      </motion.span>
                      Pool Weight: {badge.multiplier}
                    </p>
                  </div>
                </div>

                {/* Button with improved angled design */}
                <div className="relative mt-6 z-10">
                  <motion.div
                    className="absolute inset-0 bg-cosmic clip-path-polygon"
                    whileHover={{
                      opacity: [0.8, 1],
                      scale: 1.01
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>

                  <motion.button
                    onClick={() => {
                      handleMultiplierSelect(badge.multiplier);
                      setActiveTab('stake');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="relative block w-full"
                  >
                    <div className="relative py-[12px] text-center overflow-hidden">
                      <div className="absolute inset-0 bg-deepspace clip-path-polygon transform translate-x-[1px] translate-y-[1px] scale-[0.995]"></div>
                      <motion.span
                        className="relative text-white font-medium flex items-center justify-center font-orbitron"
                        whileHover={{
                          textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                        }}
                      >
                        <SiSolana className="mr-2 text-skyblue" /> Stake Now
                      </motion.span>
                    </div>
                  </motion.button>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg z-10"></div>
                <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg z-10"></div>

                {/* Decorative diagonal line */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-[150%] h-[1px] bg-cosmic/20 transform rotate-[15deg] translate-y-[20px] translate-x-[-20px]"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      {openConfirmStaking && (
        <ConfirmStakingModal
          onClose={() => setOpenConfirmStaking(false)}
          onConfirm={handleStake}
          stakeAmount={stakeAmount}
          loading={isStaking}
          APY={data.stakeLock.apyRate}
          tokenSymbol="AETHER"
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
  );
}

export default DynamicNew;