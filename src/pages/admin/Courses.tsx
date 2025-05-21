import React, { useState } from 'react';
import { Search, Eye, Edit, Trash2} from 'lucide-react';
import Layout from "../Layout.tsx";
import SearchInput from "../../components/layouts/SearchInput.tsx";
import AddButton from "../../components/layouts/AddButton.tsx";
import CourseForm from "../../components/CourseForm.tsx";
import DeleteConfirmation from "../../components/DeleteConfirmation.tsx";

interface Course {
    id: number
    title: string
    category: string
    status: "Draft" | "Published" | "Archived"
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    duration: string
    tags: string[]
    description: string
    completion?: number
    students?: number
}

interface Category {
    id: number
    name: string
}

const Courses: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCourseFormOpen, setIsCourseFormOpen] = useState(false)
    const [currentCourse, setCurrentCourse] = useState<Course | undefined>(undefined)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [courseToDelete, setCourseToDelete] = useState<Course | undefined>(undefined)

    // Mock data for categories
    const categories: Category[] = [
        { id: 1, name: "Leadership Coaching" },
        { id: 2, name: "Communication Skills" },
        { id: 3, name: "Public Speaking" },
        { id: 4, name: "Time Management" },
        { id: 5, name: "Career Development" },
    ]

    // Mock data for courses
    const [courses, setCourses] = useState<Course[]>([
        {
            id: 1,
            title: "Introduction to Leadership",
            category: "Leadership Coaching",
            status: "Published",
            difficulty: "Beginner",
            duration: "6 weeks",
            tags: ["leadership", "beginner"],
            description: "Learn fundamental leadership principles and develop your leadership style",
            completion: 85,
            students: 24,
        },
        {
            id: 2,
            title: "Advanced Leadership Strategies",
            category: "Leadership Coaching",
            status: "Published",
            difficulty: "Advanced",
            duration: "8 weeks",
            tags: ["leadership", "advanced"],
            description: "Master advanced leadership techniques for managing complex teams",
            completion: 92,
            students: 18,
        },
        {
            id: 3,
            title: "Resume Building Workshop",
            category: "Career Development",
            status: "Published",
            difficulty: "Beginner",
            duration: "3 weeks",
            tags: ["resume", "career"],
            description: "Create a standout resume that gets you noticed by employers",
            completion: 78,
            students: 35,
        },
        {
            id: 4,
            title: "Agile Project Management",
            category: "Time Management",
            status: "Published",
            difficulty: "Intermediate",
            duration: "10 weeks",
            tags: ["agile", "project management"],
            description: "Learn to implement Agile methodologies in your projects",
            completion: 65,
            students: 29,
        },
        {
            id: 5,
            title: "Effective Public Speaking",
            category: "Public Speaking",
            status: "Published",
            difficulty: "Beginner",
            duration: "4 weeks",
            tags: ["public speaking", "beginner"],
            description: "Overcome fear and deliver compelling presentations",
            completion: 90,
            students: 41,
        },
    ]);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewCourse = (course: Course) => {
        setCurrentCourse(course)
    }

    const handleAddCourse = () => {
        setCurrentCourse(undefined)
        setIsEditing(false)
        setIsCourseFormOpen(true)
    }

    const handleEditCourse = (course: Course) => {
        setCurrentCourse(course)
        setIsEditing(true)
        setIsCourseFormOpen(true)
    }

    const handleDeleteClick = (course: Course) => {
        setCourseToDelete(course)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (courseToDelete) {
            setCourses(courses.filter((course) => course.id !== courseToDelete.id))
        }
        setIsDeleteModalOpen(false)
    }

    const handleCourseSubmit = (courseData: Omit<Course, 'id'>) => {
        if (isEditing && currentCourse) {
            // Update existing course
            setCourses(
                courses.map((course) =>
                    course.id === currentCourse.id ? { ...courseData, id: course.id, completion: course.completion } : course,
                ),
            )
        } else {
            // Add new course
            const newCourse = {
                ...courseData,
                id: Math.max(0, ...courses.map((c) => c.id)) + 1,
                completion: 0,
            }
            setCourses([...courses, newCourse])
        }
        setIsCourseFormOpen(false)
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Course Management (Admin)</h1>
                    <AddButton text="Add New Course" onClick={handleAddCourse} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400"/>
                        </div>
                        <SearchInput placeholder={"Search by title or description..."} value={searchTerm} onSearchChange={setSearchTerm}/>
                    </div>

                    <div className="relative">
                        <select
                            className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none">
                            <option>All Statuses</option>
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Archived</option>
                        </select>
                        <div
                            className="cursor-pointer pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            className="cursor-pointer appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none">
                            <option>All Categories</option>
                            <option>Leadership Coaching</option>
                            <option>Communication Skills</option>
                            <option>Public Speaking</option>
                            <option>Career Development</option>
                            <option>Project Management</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                        <div className="text-xs text-gray-500">{course.duration} • {course.difficulty}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{course.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            course.status === 'Published' ? 'bg-green-100 text-green-800' :
                                                course.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                        {course.students}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-green-600 h-2.5 rounded-full"
                                                    style={{width: `${course.completion}%`}}
                                                ></div>
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">{course.completion}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewCourse(course)}
                                                className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                                <Eye className="h-4 w-4"/>
                                            </button>
                                            <button
                                                onClick={() => handleEditCourse(course)}
                                                className="cursor-pointer px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                                                <Edit className="h-4 w-4"/>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(course)}
                                                className="cursor-pointer px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                                                <Trash2 className="h-4 w-4"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Course Form Modal */}
                <CourseForm
                    isOpen={isCourseFormOpen}
                    onClose={() => setIsCourseFormOpen(false)}
                    onSubmit={handleCourseSubmit}
                    course={currentCourse}
                    isEditing={isEditing}
                    categories={categories}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmation
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    itemType="course"
                    itemName={courseToDelete?.title || ""}
                />
            </div>
        </Layout>
    );
};

export default Courses;