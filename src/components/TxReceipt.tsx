import React from 'react';
import { Dialog } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface TxReceiptProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    txHash: `0x${string}`;
}

export default function TxReceipt({ visible, onClose, title, txHash }: TxReceiptProps) {
    return (
        <Dialog open={visible} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-[#17043B] p-6">
                    <div className="flex flex-col items-center gap-4">
                        <CheckCircleIcon className="h-12 w-12 text-green-500" />

                        <Dialog.Title className="text-xl font-medium text-white">
                            {title}
                        </Dialog.Title>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">Transaction Hash</p>
                            <a
                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 break-all"
                            >
                                {txHash}
                            </a>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-4 w-full rounded-lg bg-primary py-2 text-white hover:bg-primary/80"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
} 