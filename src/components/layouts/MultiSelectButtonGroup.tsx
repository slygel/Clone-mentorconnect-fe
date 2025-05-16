import React from 'react';

type MultiSelectButtonGroupProps = {
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
    label: string;
    gridCols?: string;
    error?: string;
    clearError?: (id: string) => void;
    required?: boolean;
};

export const MultiSelectButtonGroup: React.FC<MultiSelectButtonGroupProps> = ({
                                                                                  options,
                                                                                  selected,
                                                                                  onToggle,
                                                                                  label,
                                                                                  error,
                                                                                  gridCols = 'grid grid-cols-2 md:grid-cols-4 gap-3',
                                                                              }) => (
    <div className="mb-8">
        <label className="block text-gray-700 mb-2">{label}</label>
        <div className={gridCols}>
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={`p-3 rounded-lg border ${
                        selected.includes(option)
                            ? 'bg-[#E5F2FC] border-[#1D63ED] text-[#1D63ED]'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#1D63ED]'
                    } ${gridCols.includes('flex') ? 'px-6 py-3 text-sm' : ''}`}
                    onClick={() => onToggle(option)}
                >
                    {option}
                </button>
            ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

    </div>
);