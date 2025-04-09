import React from 'react';
import { Input } from '../../../components/Form';

interface Props {
    formData: {
        metadataURI: string;
        funder: string;
        airdropToken: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function CreateGiveawayStep1({ formData, setFormData }: Props) {
    return (
        <div className="w-full space-y-[20px]">
            <div>
                <p className="text-[24px] font-[500]">Basic Information</p>
                <p className="text-[14px] text-gray-400">
                    Fill in the basic information about your giveaway
                </p>
            </div>
            <div className="space-y-[20px]">
                <Input
                    label="Metadata URI"
                    placeholder="https://"
                    value={formData.metadataURI}
                    onChange={(e) =>
                        setFormData({ ...formData, metadataURI: e.target.value })
                    }
                />
                <Input
                    label="Funder Address"
                    placeholder="0x"
                    value={formData.funder}
                    onChange={(e) =>
                        setFormData({ ...formData, funder: e.target.value })
                    }
                />
                <Input
                    label="Airdrop Token Address"
                    placeholder="0x"
                    value={formData.airdropToken}
                    onChange={(e) =>
                        setFormData({ ...formData, airdropToken: e.target.value })
                    }
                />
            </div>
        </div>
    );
} 