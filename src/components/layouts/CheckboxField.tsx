type CheckboxFieldProps = {
    label: React.ReactNode;
    value: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
    clearError: (field: string) => void;
};

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, value, onChange, error, clearError }) => (
    <div className="">
        <label className="flex items-start">
            <input
                type="checkbox"
                className="mt-1 h-5 w-5 text-[#1D63ED] rounded"
                checked={value}
                onChange={(e) => {
                    onChange(e.target.checked);
                    clearError('agreeToTerms');
                }}
            />
            <span className="ml-2 text-gray-700">
        {label}
      </span>
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);