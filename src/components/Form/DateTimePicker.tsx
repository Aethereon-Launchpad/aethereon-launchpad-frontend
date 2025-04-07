import React from 'react';

interface DateTimePickerProps {
    label?: string;
    value: number;
    onChange: (value: number) => void;
    error?: string;
}

export default function DateTimePicker({ label, value, onChange, error }: DateTimePickerProps) {
    const handleDateChange = (dateString: string) => {
        const date = new Date(value * 1000);
        const [year, month, day] = dateString.split('-').map(Number);
        const newDate = new Date(Date.UTC(
            year,
            month - 1,
            day,
            date.getUTCHours(),
            date.getUTCMinutes()
        ));
        onChange(Math.floor(newDate.getTime() / 1000));
    };

    const handleTimeChange = (timeString: string) => {
        const date = new Date(value * 1000);
        if (timeString.length === 5) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const newDate = new Date(Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                hours,
                minutes
            ));
            onChange(Math.floor(newDate.getTime() / 1000));
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-white">
                    {label}
                </label>
            )}
            <div className="flex gap-3">
                <input
                    type="date"
                    value={value ? new Date(value * 1000).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`
                        w-full px-3 py-2 bg-[#0B0118] border border-gray-600 rounded-lg
                        text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? 'border-red-500' : ''}
                    `}
                />
                <input
                    type="time"
                    value={value ? new Date(value * 1000).toISOString().split('T')[1].substring(0, 5) : ''}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    onBlur={(e) => handleTimeChange(e.target.value)}
                    className={`
                        w-full px-3 py-2 bg-[#0B0118] border border-gray-600 rounded-lg
                        text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? 'border-red-500' : ''}
                    `}
                />
            </div>
            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
} 