import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import { format } from 'date-fns';

interface ConfirmUnstakingProps {
    tokenSymbol: string;
    onConfirm: (unstake: boolean) => void;
    onClose: () => void;
    loading?: boolean;
    APY: string;
    rewardsTokenSymbol: string;
    nextRewardTime: number;
    lockAmount: number;
    rewardAmount: number | string;
    lastStakeTime: number
}

function ConfirmUnstaking({
    tokenSymbol,
    onConfirm,
    onClose,
    loading = false,
    APY,
    rewardsTokenSymbol,
    nextRewardTime,
    lockAmount,
    rewardAmount,
    lastStakeTime
}: ConfirmUnstakingProps) {
    const { authenticated, login } = usePrivy();
    const [unstake, setUnstake] = useState<boolean>(false)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Confirm Withdraw</h2>

                <div className="space-y-4">
                    <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20 space-y-2">
                        <div className="flex justify-between flex-wrap">
                            <div>
                                <p className="text-[#C4C4C4] text-sm mb-1" title="This is when your rewards have reached full maturity">Last Stake Date:</p>
                                <p className="text-white text-3xl font-bold">
                                    {format(new Date(Number(lastStakeTime) * 1000), 'dd/MM/yyyy')}
                                </p>
                            </div>
                            <div>
                                <p className="text-[#C4C4C4] text-sm mb-1" title="This is when your rewards have reached full maturity">Next Withdraw Date:</p>
                                <p className="text-white text-3xl font-bold">
                                    {format(new Date(Number(nextRewardTime) * 1000), 'dd/MM/yyyy')}
                                </p>
                            </div>
                        </div>
                        <p className="text-[#C4C4C4] text-sm mb-1">Rewards:</p>
                        <p className="text-white text-3xl font-bold">
                            {Number(rewardAmount).toFixed(3)} <span className="text-primary">{rewardsTokenSymbol}</span>
                        </p>
                    </div>

                    <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                        <p className="text-[#C4C4C4] text-sm mb-1">Amount Staked:</p>
                        <p className="text-white text-3xl font-bold">
                            {lockAmount} <span className="text-primary">{tokenSymbol}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-white bg-[#291254]/50 p-4 rounded-xl border border-primary/10">
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Network</p>
                            <p className="font-medium">Sonic</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] text-sm">Est. Annual Rewards</p>
                            <p className="font-medium">{APY}% APY</p>
                        </div>
                    </div>
                </div>

                <div className="space-x-2 flex items-center my-3">
                    <label htmlFor="unstake" className="text-xl">Unstake</label>
                    <input
                        type="checkbox"
                        id="unstake"
                        checked={unstake}
                        className="h-5 w-5 accent-primary rounded border-2 border-primary/50 focus:ring-primary focus:ring-offset-2 focus:ring-2 transition-all duration-200 cursor-pointer"
                        onChange={(e) => setUnstake(e.target.checked)}
                    />
                </div>

                <div className="mt-8 space-y-3">
                    {!authenticated ? (
                        <button
                            onClick={login}
                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-xl text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                        >
                            <IoWalletSharp className="w-5 h-5" />
                            <span>Connect Wallet</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => onConfirm(unstake)}
                                disabled={loading}
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
                                            `${unstake ? "Unstake" : "Withdraw Rewards"}`
                                )}
                            </button>
                        </>
                    )}

                    <button
                        onClick={onClose}
                        className="w-full py-2.5 text-[#C4C4C4] hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmUnstaking;
