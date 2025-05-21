import React from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface ToggleUserStatusProps {
  userId: string;
  currentStatus: "Active" | "Pending" | "Deactivated";
  onToggle: (userId: string, currentStatus: string) => void;
}

const ToggleUserStatus: React.FC<ToggleUserStatusProps> = ({
  userId,
  currentStatus,
  onToggle,
}) => {
  const getButtonStyle = () => {
    switch (currentStatus) {
      case "Active":
        return "bg-green-500 hover:bg-green-600";
      case "Deactivated":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-400 hover:bg-gray-500";
    }
  };

  const getIcon = () => {
    switch (currentStatus) {
      case "Active":
        return <CheckCircle className="cursor-pointer text-white w-4 h-4" />;
      case "Deactivated":
        return <XCircle className="cursor-pointer text-white w-4 h-4" />;
      default:
        return <AlertCircle className="cursor-pointer text-white w-4 h-4" />;
    }
  };

  return (
    <button
      onClick={() => onToggle(userId, currentStatus)}
      className={`p-1 rounded-full transition ${getButtonStyle()}`}
      title={`Click to toggle status (currently ${currentStatus})`}
    >
      {getIcon()}
    </button>
  );
};

export default ToggleUserStatus;
