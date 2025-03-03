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
            <div className="bg-[#17043B] border border-primary/50 rounded-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
                <div className="p-6 border-b border-primary/20">
                    <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 flex-col">
                        <span className="font-medium text-white">Transaction Hash:</span>
                        <div className="flex items-center gap-2 bg-[#291254]/80 p-2 rounded-lg">
                            <code className="text-white">
                                {truncatedHash}
                            </code>
                            <button
                                onClick={handleCopy}
                                className="p-1 text-primary hover:text-primary/80 transition-colors"
                            >
                                <FaCopy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-primary/20 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TxReceipt;
