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
                            ? 'bg-orange-100 border-orange-500 text-orange-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
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