import React from 'react';

type NavigationButtonGroupProps = {
    onBack?: () => void;
    onSubmit?: () => void;
    backLabel?: string;
    submitLabel?: string;
    submitDisabled?: boolean;
};

export const NavigationButtonGroup: React.FC<NavigationButtonGroupProps> = (
    {onBack, onSubmit, backLabel = 'Back', submitLabel = 'Continue', submitDisabled = false,}) => (

    <div className="flex flex-col md:flex-row gap-4">
        <button
            type="button"
            onClick={onBack}
            className="cursor-pointer py-4 px-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition duration-200"
        >
            {backLabel}
        </button>
        <button
            type="submit"
            onClick={onSubmit}
            className={`cursor-pointer flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-200 ${
                submitDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitDisabled}
        >
            {submitLabel}
        </button>
    </div>
);