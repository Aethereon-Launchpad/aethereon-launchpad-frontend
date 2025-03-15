// import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { toast } from 'react-hot-toast';
import { getParticipatedStakingPool, getAllStakingPoolData } from "../../utils/web3/actions";
import { noOfDays } from "../../utils/tools";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JoinedPool() {
  const { user } = usePrivy();
  const [stakingPools, setStakingPools] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied staking pool address!');
      })
      .catch(() => {
        toast.error('Failed to copy address');
      });
  };

  // Filter staking pools based on search term
  const filteredPools = stakingPools.filter((pool: any) =>
    pool.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function loadData() {
      if (!user?.wallet?.address) {
        return;
      }

      try {
        const allPools = await getAllStakingPoolData();
        const participatingPools = await getParticipatedStakingPool(allPools, user.wallet.address as `0x${string}`)
        console.log(participatingPools)
        setStakingPools(participatingPools);
      } catch (error) {
        toast('Failed to retreive data... Please try again later')
      } finally {
        setLoading(false)
      }

    }

    loadData()

  }, [])

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
    <div className="mt-[20px] p-[40px_20px] flex items-center justify-center lg:p-[40px] font-space text-white">
      <div className="w-full lg:w-[85%]">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <p className="font-[700] text-[28px] lg:text-[40px] leading-[35px] lg:leading-[45px]">
              {" "}
              Staking Pools you have joined
            </p>
            <p>
              View pools of projects that you have successful joined and funded
            </p>
          </div>
          <input
            type="text"
            className="mt-[20px] lg:mt-0 px-[10px] text-white h-[50px] border-white border bg-[#0E1216] w-full lg:w-[200px] rounded-[10px]"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPools.length === 0 ? (<div className="bg-[#291254] h-[200px] p-[10px] rounded-[10px] flex items-center justify-center mt-[30px]">
          <div className="flex flex-col items-center justify-center space-y-[5px]">
            <IoIosInformationCircleOutline className="text-[30px]" />
            <p>You have not Joined any Project yet.</p>
          </div>
        </div>) : (
          <div className="w-full mt-[30px]">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-white">
                <thead className="text-[12px] lg:text-[16px] text-white   bg-transparent">
                  <tr>
                    <th scope="col" className="px-6 py-3 min-w-[210px]">
                      Staking Pool
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[210px]">
                      APY
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[210px]">
                      Pool Reward Period
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[210px]">
                      Next Reward
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[210px]">
                      Token Fees
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[210px]">
                      Reward Type
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-[20px]">
                  {filteredPools.map((item: any, index: number) => (
                    <tr
                      className={`${index % 2 === 0 ? "bg-[#190E3080]" : "bg-transparent"
                        } cursor-pointer`}
                      key={item.id}
                      onClick={() => navigate(`/stake-farm/${item.id}`)}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-[700] text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <span className="flex items-center gap-x-3">
                          <span className="truncate max-w-[100px]">{item.id}</span>
                          <FaRegCopy
                            color="#fff"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(item.id);
                            }}
                            className="cursor-pointer hover:opacity-80"
                          />
                        </span>
                      </th>
                      <td className="px-6 py-4 min-w-[210px]">{item.apyRate}% APY</td>
                      <td className="px-6 py-4 min-w-[210px]">
                        {`${noOfDays(item.withdrawalIntervals)} Days`}
                      </td>
                      <td className="px-6 py-4 min-w-[210px]">Recurring Rewards</td>
                      <td className="px-6 py-4 min-w-[210px]">
                        <div>
                          Entry Fee: {item.stakeFeePercentage}% | <br /> Exit Fee: {item.withdrawalFeePercentage}%
                        </div>
                      </td>
                      <td className="px-6 py-4 min-w-[210px]">
                        <div>
                          Primary Reward: {item.stakeToken.symbol}  | <br /> Bonus Reward: {item.rewardToken.symbol}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoinedPool;
