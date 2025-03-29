import React from 'react';
import { FaCopy } from "react-icons/fa";
import { toast } from 'react-hot-toast'

interface TxReceiptProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    txHash: string;
}

const TxReceipt: React.FC<TxReceiptProps> = ({
    visible,
    onClose,
    title,
    txHash,
}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(txHash);
        toast('Copied to clipboard!');
    };

    const truncatedHash = `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="relative bg-[#17043B] border border-primary/50 w-full max-w-md overflow-hidden group transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Angled Bracket Background */}
                {/* <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-[2px] bg-[#17043B] clip-path-polygon transition-all duration-300 border border-primary/50"></span> */}

                <div className="relative">
                    {/* Header */}
                    <div className="p-6 border-b border-primary/20">
                        <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
                    </div>

                    {/* Transaction Hash Section */}
                    <div className="p-6">
                        <div className="flex items-center gap-4 flex-col">
                            <span className="font-medium text-white">Transaction Hash:</span>
                            <div className="relative flex items-center gap-2 p-2 overflow-hidden group-hash">
                                <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hash-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="absolute inset-[2px] bg-[#291254] clip-path-polygon transition-all duration-300"></span>
                                <code className="text-white relative">
                                    {truncatedHash}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="p-1 text-primary hover:text-primary/80 transition-colors relative"
                                >
                                    <FaCopy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="p-4 border-t border-primary/20 flex justify-end">
                        <button
                            onClick={onClose}
                            className="relative px-6 py-2 text-white font-medium overflow-hidden group-button"
                        >
                            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                            <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
                            <span className="relative">Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TxReceipt;
