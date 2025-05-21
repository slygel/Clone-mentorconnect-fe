import React, {useState} from 'react';
import {Eye} from 'lucide-react';
import Layout from "../Layout.tsx";

interface Course {
    id: number;
    title: string;
    category: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    tags: string[];
}

const ManageCourses: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Published');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');

    const courses: Course[] = [
        {
            id: 1,
            title: 'Introduction to Leadership',
            category: 'Leadership Coaching',
            description: 'Learn fundamental leadership principles and develop your leadership style',
            level: 'Beginner',
            duration: '6 weeks',
            tags: ['leadership', 'beginner']
        },
        {
            id: 2,
            title: 'Advanced Leadership Strategies',
            category: 'Leadership Coaching',
            description: 'Master advanced leadership techniques for managing complex teams',
            level: 'Advanced',
            duration: '8 weeks',
            tags: ['leadership', 'advanced']
        },
        {
            id: 3,
            title: 'Resume Building Workshop',
            category: 'Career Development',
            description: 'Create a standout resume that gets you noticed by employers',
            level: 'Beginner',
            duration: '3 weeks',
            tags: ['resume', 'career']
        },
        {
            id: 4,
            title: 'Agile Project Management',
            category: 'Project Management',
            description: 'Learn to implement Agile methodologies in your projects',
            level: 'Intermediate',
            duration: '10 weeks',
            tags: ['agile', 'project management']
        },
        {
            id: 5,
            title: 'Effective Public Speaking',
            category: 'Public Speaking',
            description: 'Overcome fear and deliver compelling presentations',
            level: 'Beginner',
            duration: '4 weeks',
            tags: ['public speaking', 'beginner']
        }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All Categories' || course.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Course Library</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by title or description"
                            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Archived</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option>All Categories</option>
                            <option>Leadership Coaching</option>
                            <option>Career Development</option>
                            <option>Project Management</option>
                            <option>Public Speaking</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="bg-[#1e293b] text-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="mb-2">
                                <span
                                    className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full">Published</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                                <p className="text-gray-300 text-sm mb-3">{course.category}</p>
                                <p className="text-gray-300 mb-4">{course.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.tags.map((tag, index) => (
                                        <span key={index}
                                              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                                        {tag}
                                    </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                                    <span>{course.duration}</span>
                                    <span className={`${
                                        course.level === 'Beginner' ? 'text-green-400' :
                                            course.level === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                                    }`}>
                                    {course.level}
                                </span>
                                </div>

                                <button
                                    className="w-full cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white py-2 rounded-md flex items-center justify-center">
                                    <Eye className="h-4 w-4 mr-2"/>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ManageCourses;