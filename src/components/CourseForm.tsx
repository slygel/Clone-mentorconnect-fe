import type React from "react"
import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import {InputField} from "./layouts/InputField.tsx";
import {TextareaField} from "./layouts/TextareaField.tsx";

interface Course {
    id?: number
    title: string
    category: string
    status: "Draft" | "Published" | "Archived"
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    duration: string
    tags: string[]
    description: string
}

interface Category {
    id: number
    name: string
}

interface CourseFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (course: Course) => void
    course?: Course
    isEditing?: boolean
    categories: Category[]
}

const CourseForm: React.FC<CourseFormProps> = ({
     isOpen, onClose, onSubmit, course, isEditing = false, categories,
 }) => {
    const [formData, setFormData] = useState<Course>({
        title: "",
        category: "",
        status: "Draft",
        difficulty: "Beginner",
        duration: "",
        tags: [],
        description: "",
    })

    const [tagInput, setTagInput] = useState("")

    useEffect(() => {
        if (course && isEditing) {
            setFormData({
                id: course.id,
                title: course.title,
                category: course.category,
                status: course.status,
                difficulty: course.difficulty,
                duration: course.duration,
                tags: course.tags,
                description: course.description,
            })
        } else {
            setFormData({
                title: "",
                category: "",
                status: "Draft",
                difficulty: "Beginner",
                duration: "",
                tags: [],
                description: "",
            })
        }
    }, [course, isEditing])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }))
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const handleTagKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">{isEditing ? "Edit Course" : "Add New Course"}</h2>
                    <button onClick={onClose} className="text-gray-400">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="title" className="block mb-2">
                                Title
                            </label>
                            <InputField
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(value) => setFormData({ ...formData, title: value })}
                                placeholder={"Enter title here"}
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black text-md focus:outline-none hover:border-[#537D5D]"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="status" className="block mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black text-md focus:outline-none hover:border-[#537D5D]"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block mb-2">
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black text-md focus:outline-none hover:border-[#537D5D]"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="duration" className="block mb-2">
                                Duration
                            </label>
                            <InputField
                                id="duration"
                                type="text"
                                value={formData.duration}
                                onChange={(value) => setFormData({ ...formData, duration: value })}
                                placeholder={"e.g. 6 weeks"}
                            />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block mb-2">
                                Tags
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="tags"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={handleTagKeyPress}
                                    placeholder="Add a tag"
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg bg-white text-black text-md focus:outline-none hover:border-[#537D5D]"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] p-3 rounded-r-lg"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map((tag, index) => (
                                    <div key={index} className="bg-[#2d3a4f] text-white px-3 py-1 rounded-full flex items-center">
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-gray-400 hover:text-white"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
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

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="cursor-pointer px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white rounded-md">
                            {isEditing ? "Update Course" : "Add Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseForm
