import React, {useState} from 'react';
import {Search, Edit, Check} from 'lucide-react';
import Layout from "../Layout.tsx";
import SearchInput from "../../components/layouts/SearchInput.tsx";
import AddButton from "../../components/layouts/AddButton.tsx";
import CategoryForm from "../../components/CategoryForm.tsx";
import DeleteConfirmation from "../../components/DeleteConfirmation.tsx";

export interface Category {
    id: number
    name: string
    description: string
    isActive: boolean
    courses: number
}

const Categories: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Statuses")
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined)
    const [categoryToDelete, setCategoryToDelete] = useState<Category | undefined>(undefined)

    // Mock data for categories
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 1,
            name: "Leadership Coaching",
            description: "Courses related to developing leadership skills and strategies",
            isActive: true,
            courses: 23,
        },
        {
            id: 2,
            name: "Communication Skills",
            description: "Improve verbal and written communication abilities",
            isActive: true,
            courses: 17,
        },
        {
            id: 3,
            name: "Public Speaking",
            description: "Learn to speak confidently in front of audiences",
            isActive: true,
            courses: 8,
        },
        {
            id: 4,
            name: "Time Management",
            description: "Strategies for better time management and productivity",
            isActive: false,
            courses: 12,
        },
        {
            id: 5,
            name: "Career Development",
            description: "Resources for career advancement and job hunting",
            isActive: false,
            courses: 15,
        },
    ])

    const handleAddCategory = () => {
        setCurrentCategory(undefined)
        setIsEditing(false)
        setIsCategoryFormOpen(true)
    }

    const handleEditCategory = (category: Category) => {
        setCurrentCategory(category)
        setIsEditing(true)
        setIsCategoryFormOpen(true)
    }

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category)
        setIsDeleteModalOpen(true)
    }

    const handleCategorySubmit = (categoryData: Omit<Category, 'id' | 'courses'>) => {
        if (isEditing && currentCategory) {
            // Update existing category
            setCategories(
                categories.map((cat) =>
                    cat.id === currentCategory.id ? {...categoryData, id: cat.id, courses: cat.courses} : cat,
                ),
            )
        } else {
            // Add new category
            const newCategory = {
                ...categoryData,
                id: Math.max(0, ...categories.map((c) => c.id)) + 1,
                courses: 0,
            }
            setCategories([...categories, newCategory])
        }
        setIsCategoryFormOpen(false)
    }

    const handleDeleteConfirm = () => {
        if (categoryToDelete) {
            setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id))
        }
        setIsDeleteModalOpen(false)
    }

    const filteredCategories = categories.filter((category) => {
        const matchesSearch =
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus =
            statusFilter === "All Statuses" ||
            (statusFilter === "Active" && category.isActive) ||
            (statusFilter === "Inactive" && !category.isActive)

        return matchesSearch && matchesStatus
    })

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
                    <AddButton text="Add Category" onClick={handleAddCategory}/>
                </div>

                <div className="flex justify-between mb-6">
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400"/>
                        </div>
                        <SearchInput placeholder={"Search categories..."} value={searchTerm} onSearchChange={setSearchTerm}/>
                    </div>

                    <div className="relative">
                        <select
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none">
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <div
                            className="cursor-pointer pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{category.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                        {category.courses}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                          {category.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditCategory(category)}
                                                className="cursor-pointer text-blue-600 hover:text-blue-900">
                                                <Edit className="h-5 w-5"/>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(category)}
                                                className={`${category.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}>
                                                <Check className="h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Showing 1-{filteredCategories.length} of {filteredCategories.length} categories
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Items per page:</span>
                        <select className="border border-gray-300 rounded-md text-sm py-1 px-2">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <div className="flex space-x-1">
                            <button
                                className="cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white w-8 h-8 rounded-md flex items-center justify-center">
                                1
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Form Modal */}
                <CategoryForm
                    isOpen={isCategoryFormOpen}
                    onClose={() => setIsCategoryFormOpen(false)}
                    onSubmit={handleCategorySubmit}
                    category={currentCategory}
                    isEditing={isEditing}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmation
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    itemType="category"
                    itemName={categoryToDelete?.name || ""}
                />
            </div>
        </Layout>
    );
};

export default Categories;