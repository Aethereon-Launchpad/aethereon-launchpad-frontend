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
        {[
          {
            icon: "./avatar.svg",
            layer: "./layer.svg",
            title: "Total Rewards",
            description: "The 'Total Rewards' metric provides users with a clear view of the amount of available rewards from staking pools",
            value: totalRewards
          },
          {
            icon: "./avatar.svg",
            layer: "./layer.svg",
            title: "Staking Power",
            description: "The 'Total Staked' metric provides users with a clear view of the amount they've currently invested in staking pools",
            value: stakingPower
          }
        ].map((card, index) => (
          <div key={index} className="relative p-[20px] overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-[2px] bg-[#000027] clip-path-polygon transition-all duration-300"></span>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="h-[50px] w-[50px] border rounded-full">
                  <img src={card.icon} alt="" />
                </div>
                <img src={card.layer} alt="" />
              </div>
              <p className="font-[500] text-[32px] mt-[20px]">{card.title}</p>
              <p>{card.description}</p>
              <p className="text-[40px] font-[600]">{Number(card.value).toFixed(3)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reward