import React from 'react';
import { Input } from '../../../components/Form';
import DateTimePicker from '../../../components/Form/DateTimePicker';

interface Props {
    formData: {
        whitelistStartTime: number;
        whitelistEndTime: number;
        withdrawDelay: number;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function CreateGiveawayStep2({ formData, setFormData }: Props) {
    return (
        <div className="w-full space-y-[20px]">
            <div>
                <p className="text-[24px] font-[500]">Time Settings</p>
                <p className="text-[14px] text-gray-400">
                    Configure the timing parameters for your giveaway
                </p>
            </div>
            <div className="space-y-[20px]">
                <DateTimePicker
                    label="Whitelist Start Time"
                    value={formData.whitelistStartTime}
                    onChange={(value) =>
                        setFormData({ ...formData, whitelistStartTime: value })
                    }
                />
                <DateTimePicker
                    label="Whitelist End Time"
                    value={formData.whitelistEndTime}
                    onChange={(value) =>
                        setFormData({ ...formData, whitelistEndTime: value })
                    }
                />
                <Input
                    label="Withdraw Delay (in seconds)"
                    type="number"
                    placeholder="1200"
                    value={formData.withdrawDelay}
                    onChange={(e) =>
                        setFormData({ ...formData, withdrawDelay: Number(e.target.value) })
                    }
                />
            </div>
        </div>
    );
} 