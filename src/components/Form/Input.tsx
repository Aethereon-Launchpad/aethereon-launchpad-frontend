import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-white">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-3 py-2 bg-[#0B0118] border border-gray-600 rounded-lg
                    text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error ? 'border-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
} 