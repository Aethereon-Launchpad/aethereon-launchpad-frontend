import React from 'react';
import { Input } from '../../../components/Form';

interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function CreateGiveawayStep3({ formData, setFormData }: Props) {
    return (
        <div className="w-full space-y-[20px]">
            <div>
                <p className="text-[24px] font-[500]">Additional Settings</p>
                <p className="text-[14px] text-gray-400">
                    Configure additional parameters for your giveaway
                </p>
            </div>
            <div className="space-y-[20px]">
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        id="isPrivate"
                        checked={formData.isPrivate}
                        onChange={(e) =>
                            setFormData({ ...formData, isPrivate: e.target.checked })
                        }
                        className="w-4 h-4"
                    />
                    <label htmlFor="isPrivate" className="text-white">
                        Make this a private giveaway
                    </label>
                </div>
            </div>
        </div>
    );
} 