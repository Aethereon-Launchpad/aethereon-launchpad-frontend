// import React from 'react'
import { useState, useEffect } from "react";
import { IoWalletSharp } from "react-icons/io5";
import { GoAlert } from "react-icons/go";
import { useParams } from 'react-router-dom';
import { getTokenData } from "../../services";
import { GET_STAKING_POOL_BY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import {
  toast
} from "react-hot-toast";
import { usePrivy } from "@privy-io/react-auth";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { noOfDays } from "../../utils/tools";
import { getTokenBalance, getStakingPoolPauseStatus, getTotalSupply, getAmountStaked, getTokenDecimals } from "../../utils/web3/actions";
import ConfirmStakingModal from "../Modal/ConfirmStaking";
import { sonic } from "viem/chains";
import { publicClient } from "../../config";
import { createWalletClient, custom } from "viem";
import stakingPoolABI from "../../abis/StakingPool.json";
import { erc20Abi } from "viem";
import { ethers } from "ethers";
import TxReceipt from "../Modal/TxReceipt";
import { BaseError, ContractFunctionRevertedError } from 'viem';



// Add this function to create wallet client
const createViemWalletClient = () => {
  return createWalletClient({
    chain: sonic,
    transport: custom(window.ethereum)
  });
};


function SingleStake() {
  const [coinGeckoData, setCoinGeckoData] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const { data, loading: loadingStakingPool, error: stakingPoolError } = useQuery(GET_STAKING_POOL_BY_ID, {
    variables: { id }
  })
  const { authenticated, login, user } = usePrivy();
  const [stakeAmount, setStakeAmount] = useState<number>(0.00)
  const [balance, setTokenBalance] = useState<string | 0>(0);
  const [paused, setPaused] = useState<boolean>(true)
  const [totalSupply, setTotalSupply] = useState<number | string>(0)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [staked, setStaked] = useState<number>(0);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

  async function getCoinGeckoTokenData() {
    try {
      if (!data?.stakingPool?.stakeToken?.id) {
        throw new Error("Staking pool data not available");
      }

      const tokenData = await getTokenData(data.stakingPool.stakeToken.id);

      if (!user?.wallet?.address) {
        throw new Error("User wallet not connected");
      }

      const tokenBalance = await getTokenBalance(data.stakingPool.stakeToken.id, user.wallet.address);
      const pauseStatus = await getStakingPoolPauseStatus(data.stakingPool.id);
      const supply = await getTotalSupply(data.stakingPool.stakeToken.id);
      const alreadyStaked = await getAmountStaked(data.stakingPool.id, user.wallet.address as `0x${string}`)


      setCoinGeckoData(tokenData);
      setTokenBalance(tokenBalance);
      setPaused(pauseStatus);
      setTotalSupply(supply);
      setStaked(Number(alreadyStaked));
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve token data");
    }
  }

  useEffect(() => {
    if (!loadingStakingPool && data?.stakingPool) {
      getCoinGeckoTokenData();
    }
  }, [data?.stakingPool]);

  // You can now use the id in your component
  console.log('Stake ID:', id);

  async function handleStake() {
    setIsStaking(true);
    const walletClient = createViemWalletClient();
    const [account] = await walletClient.getAddresses();
    const decimals = await getTokenDecimals(data.stakingPool.stakeToken.id)
    const stakeAmountArg = ethers.parseUnits(stakeAmount.toString(), decimals);

    if (stakeAmount === 0) {
      toast("Set stake amount")
      return;
    }

    if (!account) {
      toast("Connect Wallet");
      return;
    }

    try {
      //Allow Contract to Spend
      if (user?.wallet?.address) {
        const { request } = await publicClient.simulateContract({
          address: data.stakingPool.stakeToken.id,
          account,
          abi: erc20Abi,
          functionName: "approve",
          args: [user.wallet.address as `0x${string}`, data.stakingPool.id]
        })


        // Run Approval
        await walletClient.writeContract(request);
      }


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

  if (loadingStakingPool) {
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


  if (stakingPoolError) {
    return <div className="text-red-500 text-center">Error loading staking pool: {stakingPoolError.message}</div>;
  }

  function confirmStake() {
    if (stakeAmount === 0) {
      toast("Set stake amount")
      return;
    }

    setShowModal(true)
    return
  }


  return (
    <div className="text-white font-space flex items-center justify-center p-[40px_20px] lg:py-[80px]">
      <TxReceipt
        visible={showTxModal}
        onClose={() => setShowTxModal(false)}
        title="Staking Successful"
        txHash={txHash}
      />
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
      <div className="w-full lg:w-[60%] border border-primary p-[20px] lg:p-[40px] rounded-lg">
        <div className="flex items-center justify-center relative">
          <div className="items-center flex justify-center space-x-[10px]">
            {coinGeckoData ? (<img src={coinGeckoData.image.thumb} className="h-[50px] w-[50px] rounded-full border" alt="" />) :
              <div className="h-[50px] w-[50px] rounded-full border flex items-center justify-center">?</div>}
            <p className="text-[24px] font-[700]">{data.stakingPool.stakeToken.name}</p>
          </div>
          <div className="flex items-center space-x-[5px] absolute right-0 top-0">
            <p className="text-[#D4D4D4]">Status</p>
            {!paused ? (
              <p className="bg-[#02C35B]/15 text-[#23E33E] text-[14px] rounded-[5px] p-[2px_8px] text-center">
                Live
              </p>
            ) : (
              <p className="bg-red-500/15 text-red-500 text-[14px] rounded-[5px] p-[2px_8px] text-center">
                Paused
              </p>
            )}
          </div>
        </div>
        <form className="my-[20px] flex items-center w-full justify-center">
          <input className="text-primary text-[63px] text-center bg-transparent outline-none border-none" type="number" step={0.01} value={stakeAmount.toFixed(2)} onChange={(e) => setStakeAmount(Number(e.target.value))} />
        </form>
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-white text-[16px] mb-[5px]">Lock Amount: {staked}</p>
            <p className="text-white text-[14px] mb-[5px]">Balance {balance}</p>
          </div>
          <div className="bg-[#291254] mt-[20px] rounded-[8px] space-x-[10px] text-white p-[8px] flex items-center hover:cursor-pointer">
            <GoAlert className="text-[25px] lg:text-[20px]" />
            <p className="text-[12px] lg:text-[14px] leading-[16px] truncate" title={coinGeckoData ? coinGeckoData.description.en : "..."}>
              {/* <span>$HEX is the native token of DerHex, designed to facilitate
                staking, governance, and access to exclusive token sales.</span> */}
              {coinGeckoData ? coinGeckoData.description.en : "..."}
            </p>
          </div>
          <div className="mt-[40px]">
            <p className="uppercase text-[14px] text-[#A1A1AA]">Staking Summary</p>
            <div className="mt-[20px] text-[12px] lg:text-[16px] grid grid-cols-2 gap-[10px]">
              <p>Current Price</p>
              <p>Currently priced at {coinGeckoData ? `**$${coinGeckoData.market_data.current_price.usd}**` : "**$0**"}.</p>
              <p>Market Cap</p>
              <p>Market Cap {coinGeckoData ? `**$${new Intl.NumberFormat('en-US').format(coinGeckoData.market_data.market_cap.usd)}**` : "$0"} </p>
              <p>Total Supply</p>
              <p>{totalSupply ? new Intl.NumberFormat('en-US').format(Number(totalSupply)) : 0} (${data.stakingPool.stakeToken.symbol})</p>
            </div>
          </div>

          <div className="mt-[40px] text-[12px] lg:text-[16px] grid grid-cols-2 gap-[10px]">
            <p>Token Type</p>
            <p>Utility and Governance Token**</p>
            <p>APY Rates</p>
            <p>{data.stakingPool.apyRate}%**</p>
            <p>Vesting Period </p>
            <p> {noOfDays(data.stakingPool.withdrawalIntervals, data.stakingPool.blockTimestamp) + 1} days</p>
          </div>
        </div>
        {
          !authenticated ? (
            <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] mt-[40px] w-full justify-center font-[500]" onClick={login}>
              <IoWalletSharp className="text-[14px] lg:text-[16px]" />
              <p className="text-[14px] lg:text-[16px]">Connect Wallet to Join</p>
            </button>
          ) : (
            <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] mt-[40px] w-full justify-center font-[500]" onClick={confirmStake}>
              <p className="text-[14px] lg:text-[16px]">Confirm Stake</p>
            </button>
          )
        }
      </div>
    </div>
  )
}

export default SingleStake