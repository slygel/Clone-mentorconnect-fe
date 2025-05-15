import React from 'react';

type TextareaFieldProps = {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    error?: string;
    clearError?: (id: string) => void;
    required?: boolean;
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
                                                                label,
                                                                id,
                                                                value,
                                                                onChange,
                                                                placeholder,
                                                                rows = 4, // Default to 4 rows, matching original
                                                                error,
                                                                clearError,
                                                                required = false,
                                                            }) => (
    <div className="mb-8">
        <label htmlFor={id} className="block text-gray-700 mb-2">{label}</label>
        <textarea
            id={id}
            rows={rows}
            className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-800 focus:outline-none`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
                if (clearError) clearError(id);
            }}
            required={required}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);