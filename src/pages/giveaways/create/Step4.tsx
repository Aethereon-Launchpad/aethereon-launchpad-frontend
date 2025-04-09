import React from 'react';

interface Props {
    formData: {
        metadataURI: string;
        funder: string;
        airdropToken: string;
        whitelistStartTime: number;
        whitelistEndTime: number;
        withdrawDelay: number;
        isPrivate?: boolean;
    };
}

export default function CreateGiveawayStep4({ formData }: Props) {
    return (
        <div className="w-full space-y-[20px]">
            <div>
                <p className="text-[24px] font-[500]">Review Information</p>
                <p className="text-[14px] text-gray-400">
                    Review your giveaway details before creation
                </p>
            </div>
            <div className="space-y-[20px] bg-[#0B0118] p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-400">Metadata URI</p>
                        <p className="text-white break-all">{formData.metadataURI}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Funder Address</p>
                        <p className="text-white break-all">{formData.funder}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Airdrop Token</p>
                        <p className="text-white break-all">{formData.airdropToken}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Whitelist Start</p>
                        <p className="text-white">
                            {new Date(formData.whitelistStartTime * 1000).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Whitelist End</p>
                        <p className="text-white">
                            {new Date(formData.whitelistEndTime * 1000).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Withdraw Delay</p>
                        <p className="text-white">{formData.withdrawDelay} seconds</p>
                    </div>
                    {/* <div>
                        <p className="text-gray-400">Private Giveaway</p>
                        <p className="text-white">{formData.isPrivate ? "Yes" : "No"}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
} 