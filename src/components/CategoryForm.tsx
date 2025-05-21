import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import {InputField} from "./layouts/InputField.tsx";
import {TextareaField} from "./layouts/TextareaField.tsx";

interface Category {
    id?: number
    name: string
    description: string
    isActive: boolean
    courses?: number
}

interface CategoryFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (category: Category) => void
    category?: Category
    isEditing?: boolean
}

const CategoryForm: React.FC<CategoryFormProps> = ({ isOpen, onClose, onSubmit, category, isEditing = false }) => {
    const [formData, setFormData] = useState<Category>({
        name: "",
        description: "",
        isActive: true,
    })

    useEffect(() => {
        if (category && isEditing) {
            setFormData({
                id: category.id,
                name: category.name,
                description: category.description,
                isActive: category.isActive,
                courses: category.courses,
            })
        } else {
            setFormData({
                name: "",
                description: "",
                isActive: true,
            })
        }
    }, [category, isEditing])

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">{isEditing ? "Edit Category" : "Add Category"}</h2>
                    <button onClick={onClose} className="cursor-pointer text-gray-400">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">
                            Name
                        </label>
                        <InputField
                            id="title"
                            type="text"
                            value={formData.name}
                            onChange={(value) => setFormData({ ...formData, name: value })}
                            placeholder={"Enter name here"}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2">
                            Description
                        </label>
                        <TextareaField
                            label=""
                            id="description"
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            placeholder="Describe your courses..."
                            rows={4}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleCheckboxChange}
                                className="mr-2 h-5 w-5"
                            />
                            <span>Active</span>
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="cursor-pointer text-white px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white rounded-md">
                            {isEditing ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm
