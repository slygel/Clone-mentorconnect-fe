import React, { type ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  placeholder: string;
  onSearchChange: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onSearchChange,
  placeholder,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder={placeholder}
        maxLength={50}
        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
