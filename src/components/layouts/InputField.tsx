import { Eye, EyeOff } from "lucide-react";

type InputFieldProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  clearError: (id: string) => void;
  required?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  toggleVisibility?: () => void;
  hint?: string;
  placeholder?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
  clearError,
  required = false,
  showToggle = false,
  showPassword = false,
  toggleVisibility,
  hint,
  placeholder,
}) => (
  <div className="">
    <label htmlFor={id} className="text-md block text-black mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={showToggle && showPassword ? "text" : type}
        id={id}
        className={`pr-9 pl-3 w-full p-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg bg-white text-black text-md focus:outline-none hover:border-[#1D63ED]`}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          clearError(id);
        }}
        required={required}
        placeholder={placeholder}
      />
      {showToggle && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? (
            <Eye className="cursor-pointer h-5 w-5" />
          ) : (
            <EyeOff className="cursor-pointer h-5 w-5" />
          )}
        </button>
      )}
    </div>
    {hint && <p className="text-gray-600 text-sm mt-1">{hint}</p>}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
