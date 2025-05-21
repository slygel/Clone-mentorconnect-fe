"use client"

import type React from "react"
import { AlertTriangle, X } from "lucide-react"

interface DeleteConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    itemType: "category" | "course" | "resource"
    itemName: string
}

const DeleteConfirmation: React.FC<DeleteConfirmationModalProps> = ({
        isOpen,onClose,onConfirm,itemType,itemName
    }) => {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1e293b] rounded-lg shadow-xl w-full max-w-md p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-red-500">Confirm Deletion</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex items-start mb-6">
                    <AlertTriangle className="text-red-500 mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                        <p className="mb-2">Are you sure you want to delete this {itemType}?</p>
                        <p className="font-semibold">{itemName}</p>
                        <p className="text-sm text-gray-400 mt-2">
                            This action cannot be undone. All associated data will be permanently removed.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation
