// import React from 'react'
import { useEffect, useState } from "react";
import { GET_STAKING_POOLS } from "../../graphql/queries"
import { useQuery } from "@apollo/client"
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { usePrivy } from "@privy-io/react-auth";
import { getStakingPower, getTotalRewards, getAllStakingPoolData } from "../../utils/web3/actions";
import { toast } from "react-hot-toast";
import { useLockStake } from "../../hooks/web3/useLockStake";

function Reward() {
  const { user, authenticated } = usePrivy()
  const [loading, setLoading] = useState<boolean>(true);
  const [stakingPower, setStakingPower] = useState<number | string>("N/A");
  const [totalRewards, setTotalRewards] = useState<number | string>("N/A");



  useEffect(() => {
    async function loadData() {
      if (!user?.wallet?.address) {
        return;
      }

      try {
        const stakingPools = await getAllStakingPoolData();
        const totalAmountStaked = await getStakingPower(stakingPools, user.wallet.address as `0x${string}`);
        const totalAmountRewards = await getTotalRewards(stakingPools, user.wallet.address as `0x${string}`)
        setStakingPower(totalAmountStaked);
        setTotalRewards(Number(totalAmountRewards).toFixed(5));
      } catch (error) {
        toast('Failed to Retrieve dashboard data... Please try again later')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [authenticated])





  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px]">
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




  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space text-white flex items-center justify-center">
      <div className="w-full xl:w-[70%] grid lg:grid-cols-2 gap-[40px]">
        <div className="p-[20px] border rounded-[10px] border-primary">
          <div className="flex items-center justify-between">
            <div className="h-[50px] w-[50px] border rounded-full">
              <img src="./avatar.svg" alt="" />
            </div>
            <img src="./layer.svg" alt="" />
          </div>
          <p className="font-[500] text-[32px] mt-[20px]">Total Rewards</p>
          <p>The "Total Rewards" metric provides users with a clear view of the amount of available rewards from staking pools</p>
          <p className="text-[40px] font-[600]]">{Number(totalRewards).toFixed(3)}</p>
        </div>
        <div className="p-[20px] border rounded-[10px] border-primary">
          <div className="flex items-center justify-between">
            <div className="h-[50px] w-[50px] border rounded-full">
              <img src="./avatar.svg" alt="" />
            </div>
            <img src="./layer.svg" alt="" />
          </div>
          <p className="font-[500] mt-[20px] text-[32px]">Staking Power</p>
          <p>The "Total Staked" metric provides users with a clear view of the amount they've currently invested in staking pools</p>
          <p className="text-[40px] font-[600]]">{Number(stakingPower).toFixed(3)}</p>
        </div>

      </div>

    </div>
  )
}

export default Reward