import React, { useState } from 'react';
import {FileText, Video, Download, Edit, Trash2} from 'lucide-react';
import Layout from "../Layout.tsx";
import AddButton from "../../components/layouts/AddButton.tsx";
import {useAuth} from "../../contexts/AuthProvider.tsx";
import ResourceForm from "../../components/ResourceForm.tsx";
import DeleteConfirmation from "../../components/DeleteConfirmation.tsx";

interface Resource {
    id: number;
    title: string;
    description: string;
    type: 'PDF' | 'VIDEO' | 'AUDIO' | 'LINK';
    course: string;
    category: string
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

const Resources: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All Resources');
    const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentResource, setCurrentResource] = useState<Resource | undefined>(undefined)
    const [resourceToDelete, setResourceToDelete] = useState<Resource | undefined>(undefined)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const { user } = useAuth();

    const [resources, setResources] = useState<Resource[]>([
        {
            id: 1,
            title: "Time Management Guide",
            description: "A comprehensive guide to improve your time management skills.",
            type: "PDF",
            course: "Introduction to Programming",
            category: "Productivity",
        },
        {
            id: 2,
            title: "Feedback Analysis",
            description: "Learn how to effectively analyze and implement feedback.",
            type: "PDF",
            course: "Web Development Fundamentals",
            category: "Communication",
        },
        {
            id: 3,
            title: "Presentation Skills Mastery",
            description: "Become confident in your presentation abilities.",
            type: "VIDEO",
            course: "Introduction to Programming",
            category: "Communication",
        },
        {
            id: 4,
            title: "Leadership Fundamentals",
            description: "Core principles of effective leadership.",
            type: "PDF",
            course: "Web Development Fundamentals",
            category: "Leadership",
        }
    ])

    const categories: Category[] = [
        { id: 1, name: "Productivity" },
        { id: 2, name: "Communication" },
        { id: 3, name: "Teamwork" },
        { id: 4, name: "Leadership" },
    ]

    const courses: Course[] = [
        { id: 1, title: "Introduction to Programming" },
        { id: 2, title: "Web Development Fundamentals" },
        { id: 3, title: "Team Management" },
        { id: 4, title: "Leadership Coaching" },
    ]

    const filteredResources = resources.filter(resource => {
        if (activeCategory === 'All Resources') return true;
        // This is a simplified filter. In a real app, you'd have a category field in your resource object
        if (activeCategory === 'Productivity' && resource.title.includes('Time')) return true;
        if (activeCategory === 'Communication' && resource.title.includes('Feedback')) return true;
        if (activeCategory === 'Leadership' && resource.title.includes('Leadership')) return true;
        return false;
    });

    const handleAddResource = () => {
        setCurrentResource(undefined)
        setIsEditing(false)
        setIsResourceFormOpen(true)
    }

    const handleEditResource = (resource: Resource) => {
        setCurrentResource(resource)
        setIsEditing(true)
        setIsResourceFormOpen(true)
    }

    const handleDeleteClick = (resource: Resource) => {
        setResourceToDelete(resource)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (resourceToDelete) {
            setResources(resources.filter((resource) => resource.id !== resourceToDelete.id))
        }
        setIsDeleteModalOpen(false)
    }

    const handleResourceSubmit = (resourceData: Omit<Resource, 'id'>) => {
        if (isEditing && currentResource) {
            // Update existing resource
            setResources(
                resources.map((resource) =>
                    resource.id === currentResource.id ? { ...resourceData, id: resource.id } : resource,
                ),
            )
        } else {
            // Add new resource
            const newResource = {
                ...resourceData,
                id: Math.max(0, ...resources.map((r) => r.id)) + 1,
            }
            setResources([...resources, newResource])
        }
        setIsResourceFormOpen(false)
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Downloadable Resources</h1>
                    {user?.role == "Mentor" && (
                        <AddButton text="Add Resource" onClick={handleAddResource}/>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        className={`cursor-pointer px-4 py-2 rounded-md ${
                            activeCategory === "All Resources"
                                ? "bg-[#3D8D7A] text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setActiveCategory("All Resources")}
                    >
                        All Resources
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`cursor-pointer px-4 py-2 rounded-md ${
                                activeCategory === category.name
                                    ? "bg-[#3D8D7A] text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            onClick={() => setActiveCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <div key={resource.id} className="bg-[#1e293b] text-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div
                                        className={`p-2 rounded-md ${resource.type === 'PDF' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                        {resource.type === 'PDF' ? (
                                            <FileText className="h-6 w-6 text-white"/>
                                        ) : (
                                            <Video className="h-6 w-6 text-white"/>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                          resource.type === 'PDF' ? 'bg-blue-700 text-white' : 'bg-purple-700 text-white'
                                      }`}>
                                        {resource.type}
                                      </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                                <p className="text-gray-300 mb-4">{resource.description}</p>
                                <p className="text-sm text-gray-400 mb-4">Course: {resource.course}</p>

                                <div className="flex space-x-2">
                                    <button
                                        className="cursor-pointer w-full bg-[#3D8D7A] hover:bg-[#578E7E] text-white py-2 rounded-md flex items-center justify-center">
                                        <Download className="h-5 w-5 mr-2"/>
                                        Download
                                    </button>
                                    {user?.role === "Mentor" && (
                                        <>
                                            <button
                                                onClick={() => handleEditResource(resource)}
                                                className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md">
                                                <Edit className="h-5 w-5"/>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(resource)}
                                                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
                                                <Trash2 className="h-5 w-5"/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resource Form Modal */}
                <ResourceForm
                    isOpen={isResourceFormOpen}
                    onClose={() => setIsResourceFormOpen(false)}
                    onSubmit={handleResourceSubmit}
                    resource={currentResource}
                    isEditing={isEditing}
                    courses={courses}
                    categories={categories}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmation
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    itemType="resource"
                    itemName={resourceToDelete?.title || ""}
                />

                <div className="mt-8 text-center text-sm text-gray-600">
                    © 2023 ConnectMentor. All rights reserved.
                </div>
            </div>
        </Layout>
    );
};

export default Resources;