import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
import { useChain } from "../../../context/ChainContext";

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
    const { chainName } = useChain();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="relative bg-[#17043B] border border-primary/50 w-full max-w-md p-6 overflow-hidden group">
                {/* Angled Bracket Background */}
                {/* <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-[2px] bg-[#17043B] clip-path-polygon transition-all duration-300 border border-primary/50"></span> */}

                <div className="relative">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">Confirm Staking</h2>

                    <div className="space-y-4">
                        {/* Staking Amount Card */}
                        <div className="relative p-4 overflow-hidden group-card clip-path-polygon">
                            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-card-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute inset-[2px] bg-[#291254] clip-path-polygon transition-all duration-300 border border-primary/20"></span>
                            <div className="relative">
                                <p className="text-[#C4C4C4] text-sm mb-1">You are about to stake:</p>
                                <p className="text-white text-3xl font-bold">
                                    {stakeAmount} <span className="text-primary">{tokenSymbol}</span>
                                </p>
                            </div>
                        </div>

                        {/* Network & APY Card */}
                        <div className="relative p-4 overflow-hidden group-card clip-path-polygon">
                            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-card-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute inset-[2px] bg-[#291254] clip-path-polygon transition-all duration-300 border border-primary/10"></span>
                            <div className="relative grid grid-cols-2 gap-4 text-white">
                                <div>
                                    <p className="text-[#C4C4C4] text-sm">Network</p>
                                    <p className="font-medium">{chainName}</p>
                                </div>
                                <div>
                                    <p className="text-[#C4C4C4] text-sm">Est. Annual Rewards</p>
                                    <p className="font-medium">{APY}% APY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 space-y-3">
                        {/* Primary Button - Connect Wallet or Confirm Stake */}
                        {!authenticated ? (
                            <button
                                onClick={login}
                                className="relative w-full py-3 text-white font-medium overflow-hidden group-button"
                            >
                                <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                                <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
                                <span className="relative flex items-center justify-center space-x-2">
                                    <IoWalletSharp className="w-5 h-5" />
                                    <span>Connect Wallet</span>
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                className="relative w-full py-3 text-white font-medium overflow-hidden group-button disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                                <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
                                <span className="relative flex justify-center">
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
                                </span>
                            </button>
                        )}

                        {/* Tertiary Button - Cancel */}
                        <button
                            onClick={onClose}
                            className="relative w-full py-2.5 text-[#C4C4C4] hover:text-white overflow-hidden group-button"
                        >
                            <span className="relative">Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmStakingModal;
