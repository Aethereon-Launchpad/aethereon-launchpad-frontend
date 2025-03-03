import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import toast from 'react-hot-toast';

interface ConfirmStakingModalProps {
    stakeAmount: number;
    tokenSymbol: string;
    onConfirm: () => void;
    onClose: () => void;
    loading?: boolean;
    APY: string;
}

function ConfirmStakingModal({
    stakeAmount,
    tokenSymbol,
    onConfirm,
    onClose,
    loading = false,
    APY
}: ConfirmStakingModalProps) {
    const { authenticated, login } = usePrivy();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Confirm Staking</h2>

                <div className="space-y-4">
                    <div className="bg-[#291254]/80 p-4 rounded-xl border border-primary/20">
                        <p className="text-[#C4C4C4] text-sm mb-1">You are about to stake:</p>
                        <p className="text-white text-3xl font-bold">
                            {stakeAmount} <span className="text-primary">{tokenSymbol}</span>
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
                        <button
                            onClick={onConfirm}
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
                                'Confirm Stake'
                            )}
                        </button>
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

export default ConfirmStakingModal;
