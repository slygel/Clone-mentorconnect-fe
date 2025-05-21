import {Plus} from "lucide-react";

type AddButtonProps = {
    text: string;
    onClick: () => void;
};

const AddButton = ({ text, onClick }: AddButtonProps) => (
    <button
        className={`cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white px-4 py-2 rounded-md flex items-center`}
        onClick={onClick}
    >
        <Plus className="h-5 w-5 mr-1" />
        {text}
    </button>
);

export default AddButton;