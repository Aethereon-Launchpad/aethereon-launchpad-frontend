import { useEffect, useState } from "react";
import { Preloader, Oval } from 'react-preloader-icon';
import { getStakingPoolDataByAddress } from "../../../utils/web3/actions";
import { usePrivy } from "@privy-io/react-auth";
import { baseSepolia } from "../../../config/chain";
import { publicClient } from "../../../config";
import { createWalletClient, custom } from "viem";
import stakingPoolAbi from "../../../abis/StakingPool.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { getTokenBalance } from "../../../utils/web3/actions";

interface ManageStakingProps {
    stakingPoolAddress: `0x${string}`;
    onClose: () => void;
    userAddress: `0x${string}`;
    refetch: () => void;
}

const createViemWalletClient = () => {
    return createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum)
    });
};

export default function ManageStaking({ stakingPoolAddress, onClose, userAddress, refetch }: ManageStakingProps) {
    const [loading, setLoading] = useState(true);
    const [poolData, setPoolData] = useState<any>(null);
    const [input, setInput] = useState<string | number>(0.00);
    const [option, setOption] = useState<string>("");
    const [process, setProcessing] = useState<boolean>(false)
    const [rewardAmount, setRewardAmount] = useState<string>("0");
    const [newFeeReceiver, setNewFeeReceiver] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    const { user } = usePrivy();

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


    const handleAddReward = async () => {
        setIsProcessing(true);
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            const tokenBalance = await getTokenBalance(poolData.stakingPool.rewardToken.id, userAddress);

            const amount = ethers.parseUnits(rewardAmount, poolData.stakingPool.rewardToken.decimals);

            console.log(Number(rewardAmount), Number(tokenBalance));
            if (Number(rewardAmount) > Number(tokenBalance)) {
                toast("Not enough balance")
                setIsProcessing(false)
                return;
            }

            const { request } = await publicClient.simulateContract({
                address: stakingPoolAddress,
                abi: stakingPoolAbi,
                account,
                functionName: "addReward",
                args: [amount]
            });

            const hash = await walletClient.writeContract(request);
            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("Rewards added successfully!");
            await refetch();
        } catch (error) {
            console.error("Error adding rewards:", error);
            toast.error("Failed to add rewards");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDrainRewards = async () => {
        setIsProcessing(true);
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            const { request } = await publicClient.simulateContract({
                address: stakingPoolAddress,
                abi: stakingPoolAbi,
                account,
                functionName: "totalRewardDrain",
                args: [userAddress]
            });

            const hash = await walletClient.writeContract(request);
            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("Rewards drained successfully!");
            await refetch();
        } catch (error) {
            console.error("Error draining rewards:", error);
            toast.error("Failed to drain rewards");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpdateFeeReceiver = async () => {
        setIsProcessing(true);
        try {
            const walletClient = createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            const { request } = await publicClient.simulateContract({
                address: stakingPoolAddress,
                abi: stakingPoolAbi,
                account,
                functionName: "setTaxRecipient",
                args: [newFeeReceiver]
            });

            const hash = await walletClient.writeContract(request);
            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("Fee receiver updated successfully!");
        } catch (error) {
            console.error("Error updating fee receiver:", error);
            toast.error("Failed to update fee receiver");
        } finally {
            setIsProcessing(false);
        }
    };

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
            <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">Staking Pool Management</h2>

                    {/* Pool Details Section */}
                    <div className="space-y-4 mb-8">
                        <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                            <p className="text-[#C4C4C4] text-sm mb-1">Staking Token:</p>
                            <p className="text-white text-xl font-bold">
                                {poolData.stakingPool.stakeToken.name} ({poolData.stakingPool.stakeToken.symbol})
                            </p>
                        </div>

                        <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                            <p className="text-[#C4C4C4] text-sm mb-1">Reward Token:</p>
                            <p className="text-white text-xl font-bold">
                                {poolData.stakingPool.rewardToken.name} ({poolData.stakingPool.rewardToken.symbol})
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white bg-[#291254]/50 p-4 rounded-xl border border-primary/10">
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
                                <p className="font-medium truncate">{poolData.stakingPool.feeReceiver}</p>
                            </div>
                            <div>
                                <p className="text-[#C4C4C4] text-sm">Total Reward Tokens</p>
                                <p className="font-medium truncate">{poolData.stakingPool.totalRewardable}</p>
                            </div>
                        </div>
                    </div>

                    {/* Management Actions Section */}
                    <div className="space-y-6">
                        <div className="bg-[#291254]/50 p-4 rounded-xl border border-primary/10">
                            <label className="text-[#C4C4C4] text-sm mb-2 block">Add Rewards Amount</label>
                            <input
                                type="text"
                                value={rewardAmount}
                                onChange={(e) => setRewardAmount(e.target.value)}
                                className="bg-[#1A0835] text-white w-full p-3 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
                                placeholder="Enter reward amount"
                            />
                        </div>

                        <div className="bg-[#291254]/50 p-4 rounded-xl border border-primary/10">
                            <label className="text-[#C4C4C4] text-sm mb-2 block">New Fee Receiver Address</label>
                            <input
                                type="text"
                                value={newFeeReceiver}
                                onChange={(e) => setNewFeeReceiver(e.target.value)}
                                className="bg-[#1A0835] text-white w-full p-3 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
                                placeholder="Enter new fee receiver address"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={handleAddReward}
                                disabled={isProcessing}
                                className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isProcessing ? (
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
                                onClick={handleDrainRewards}
                                disabled={isProcessing}
                                className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isProcessing ? (
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
                            onClick={handleUpdateFeeReceiver}
                            disabled={isProcessing}
                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isProcessing ? (
                                <Preloader
                                    use={Oval}
                                    size={24}
                                    strokeWidth={8}
                                    strokeColor="#FFF"
                                    duration={800}
                                />
                            ) : (
                                'Update Fee Receiver'
                            )}
                        </button>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 text-[#C4C4C4] hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200 mt-6"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}