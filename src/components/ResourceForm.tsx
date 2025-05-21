import React, {useRef} from "react"
import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import {InputField} from "./layouts/InputField.tsx";
import {TextareaField} from "./layouts/TextareaField.tsx";

interface Resource {
    id?: number
    title: string
    course: string
    type: "PDF" | "VIDEO" | "AUDIO" | "LINK"
    category: string
    description: string
    file?: File | null
    fileUrl?: string
}

interface Course {
    id: number
    title: string
}

interface Category {
    id: number
    name: string
}

interface ResourceFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (resource: Resource) => void
    resource?: Resource
    isEditing?: boolean
    courses: Course[]
    categories: Category[]
}

const ResourceForm: React.FC<ResourceFormProps> = ({
    isOpen, onClose, onSubmit, resource, isEditing = false, courses, categories,
    }) => {
    const [formData, setFormData] = useState<Resource>({
        title: "",
        course: "",
        type: "PDF",
        category: "",
        description: "",
        file: null,
        fileUrl: "",
    })

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [filePreview, setFilePreview] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (resource && isEditing) {
            setFormData({
                id: resource.id,
                title: resource.title,
                course: resource.course,
                type: resource.type,
                category: resource.category,
                description: resource.description,
                fileUrl: resource.fileUrl,
            })

            if (resource.fileUrl) {
                setFilePreview(resource.fileUrl)
            }
        } else {
            setFormData({
                title: "",
                course: "",
                type: "PDF",
                category: "",
                description: "",
                file: null,
                fileUrl: "",
            })
            setSelectedFile(null)
            setFilePreview("")
        }
    }, [resource, isEditing])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)
            setFormData((prev) => ({ ...prev, file }))

            // Create a preview URL for the file
            const reader = new FileReader()
            reader.onloadend = () => {
                setFilePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const getFileTypeIcon = () => {
        switch (formData.type) {
            case "PDF":
                return "📄"
            case "VIDEO":
                return "🎬"
            case "AUDIO":
                return "🎵"
            case "LINK":
                return "🔗"
            default:
                return "📄"
        }
    }

    // Function to trigger file input click
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">{isEditing ? "Edit Resource" : "Add New Resource"}</h2>
                    <button onClick={onClose} className="text-gray-400 cursor-pointer">
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
                            <label htmlFor="course" className="block mb-2">
                                Course
                            </label>
                            <select
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black text-md focus:outline-none hover:border-[#537D5D]"
                                required
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.title}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="type" className="block mb-2">
                                Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black text-md focus:outline-none hover:border-[#537D5D]"
                            >
                                <option value="PDF">PDF</option>
                                <option value="VIDEO">Video</option>
                                <option value="AUDIO">Audio</option>
                                <option value="LINK">Link</option>
                            </select>
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

                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2">
                            Description
                        </label>
                        <TextareaField
                            label=""
                            id="description"
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            placeholder="Describe your resoures..."
                            rows={4}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2">Resource File</label>
                        <div className="flex items-center">
                            <div className="flex-1">
                                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                                    {filePreview ? (
                                        <div className="text-center">
                                            <div className="text-4xl mb-2">{getFileTypeIcon()}</div>
                                            <p className="text-sm text-gray-300 mb-2 truncate max-w-xs">
                                                {selectedFile ? selectedFile.name : "Current file"}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ""}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-300">Click to upload or drag and drop</p>
                                            <p className="text-xs text-gray-400">PDF, Video, Audio, or provide a link</p>
                                        </div>
                                    )}
                                    {/* Button to trigger file input */}
                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="mt-4 px-4 py-2 cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white rounded-md"
                                    >
                                        {filePreview ? "Change File" : "Upload File"}
                                    </button>
                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        ref={fileInputRef} // Attach ref
                                        onChange={handleFileChange}
                                        className="hidden" // Hide the input
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="cursor-pointer text-white px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white rounded-md">
                            {isEditing ? "Update Resource" : "Add Resource"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResourceForm
