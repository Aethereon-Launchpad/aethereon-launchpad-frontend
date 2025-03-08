import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, Oval } from 'react-preloader-icon';
interface ConfirmVoteOption {
    voteTitle: string;
    voteSelection: string;
    onConfirm: () => void;
    onClose: () => void;
    loading?: boolean;
}

function ConfirmVoteModal({
    voteTitle,
    voteSelection,
    onConfirm,
    onClose,
    loading = false,
}: ConfirmVoteOption) {
    const { authenticated, login } = usePrivy();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Confirm Your Vote</h2>

                <div className="space-y-4">
                    <p className="text-white text-center">You are about to submit your vote for <span className="capitalize text-primary font-semibold">{voteTitle}</span>.<br />Your selection: <span className="capitalize text-primary font-semibold">{voteSelection}</span>
                        <br /> Once submitted, your vote cannot be changed</p>
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
                                'Confirm Vote'
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

export default ConfirmVoteModal;
