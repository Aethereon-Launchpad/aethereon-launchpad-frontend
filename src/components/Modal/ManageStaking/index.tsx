import { useEffect, useState } from "react";
import { Preloader, Oval } from 'react-preloader-icon';
import { getStakingPoolDataByAddress } from "../../../utils/web3/actions";
import { usePrivy } from "@privy-io/react-auth";
import { sonicTestnet } from "../../../config/chain";
import { publicClient } from "../../../config";
import { createWalletClient, custom } from "viem";
import stakingPoolAbi from "../../../abis/StakingPool.json";
import { ethers } from "ethers";

interface ManageStakingProps {
    stakingPoolAddress: `0x${string}`;
    onClose: () => void;
}

export default function ManageStaking({ stakingPoolAddress, onClose }: ManageStakingProps) {
    const [loading, setLoading] = useState(true);
    const [poolData, setPoolData] = useState<any>(null);
    const [input, setInput] = useState<string | number>(0.00);
    const [option, setOption] = useState<string>("");
    const [process, setProcessing] = useState<boolean>(false)


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getStakingPoolDataByAddress(stakingPoolAddress);
                setPoolData(data);
            } catch (error) {
                console.error("Failed to fetch staking pool data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [stakingPoolAddress]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <Preloader
                    use={Oval}
                    size={60}
                    strokeWidth={8}
                    strokeColor="#FFF"
                    duration={800}
                />
            </div>
        );
    }

    if (!poolData) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-md p-6">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">Error Loading Data</h2>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 text-[#C4C4C4] hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-2xl p-6">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Staking Pool Details</h2>

                <div className="space-y-4">
                    <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                        <p className="text-[#C4C4C4] text-sm mb-1">Staking Token:</p>
                        <p className="text-white text-3xl font-bold">
                            {poolData.stakingPool.stakeToken.name} ({poolData.stakingPool.stakeToken.symbol})
                        </p>
                    </div>

                    <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                        <p className="text-[#C4C4C4] text-sm mb-1">Reward Token:</p>
                        <p className="text-white text-3xl font-bold">
                            {poolData.stakingPool.rewardToken.name} ({poolData.stakingPool.rewardToken.symbol})
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-white bg-[#291254]/50 p-4 rounded-xl border border-primary/10">
                        <div>
                            <p className="text-[#C4C4C4] text-sm">APY Rate</p>
                            <p className="font-medium">{poolData.stakingPool.apyRate}%</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Total Staked</p>
                            <p className="font-medium">{poolData.stakingPool.totalStaked}</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Stake Fee</p>
                            <p className="font-medium">{poolData.stakingPool.stakeFeePercentage}%</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Withdrawal Fee</p>
                            <p className="font-medium">{poolData.stakingPool.withdrawalFeePercentage}%</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Fee Receiver</p>
                            <p className="font-medium truncate">{poolData.stakingPool.feeReceiver}%</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Total Reward Tokens</p>
                            <p className="font-medium truncate">{poolData.stakingPool.totalRewardable}</p>
                        </div>
                    </div>
                </div>

                {option && (
                    <form>
                        <label htmlFor={option}>{option}</label>
                    </form>)
                }

                <div className="space-y-5 mt-5">
                    {!process ? (
                        <>
                            <div className="flex items-center gap-x-3">
                                <button
                                    // onClick={onConfirm}
                                    // disabled={loading}
                                    className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <Preloader
                                            use={Oval}
                                            size={24}
                                            strokeWidth={8}
                                            strokeColor="#FFF"
                                            duration={800}
                                        />
                                    ) : (
                                        'Add Rewards'
                                    )}
                                </button>
                                <button
                                    // onClick={onConfirm}
                                    // disabled={loading}
                                    className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <Preloader
                                            use={Oval}
                                            size={24}
                                            strokeWidth={8}
                                            strokeColor="#FFF"
                                            duration={800}
                                        />
                                    ) : (
                                        'Drain Rewards'
                                    )}
                                </button>
                            </div>
                            <button
                                // onClick={onConfirm}
                                // disabled={loading}
                                className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Update Fee Receiver
                            </button>
                        </>) :
                        <button className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
                            <Preloader
                                use={Oval}
                                size={24}
                                strokeWidth={8}
                                strokeColor="#FFF"
                                duration={800}
                            />
                        </button>
                    }



                    <button
                        onClick={onClose}
                        className="w-full py-2.5 text-[#C4C4C4] hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}