import React from 'react';
import { Calendar, Clock, Video, MessageSquare, User, FileText, CalendarIcon } from 'lucide-react';
import Layout from "../Layout.tsx";

const MentorDashboard: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
                    <p className="text-gray-600">Welcome to your mentor dashboard. Navigate using the sidebar.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-6 mb-6 rounded-lg shadow-lg border border-[#F2F2F2]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Upcoming Sessions</h2>
                                <a href="#" className="text-[#ff6b35] hover:underline">Manage Schedule →</a>
                            </div>

                            {/* Session 1 */}
                            <div className="bg-[#1e293b] text-white rounded-lg p-4 mb-4">
                                <div className="flex items-center mb-2">
                                    <Calendar className="h-5 w-5 mr-2 text-[#ff6b35]"/>
                                    <h3 className="text-lg font-medium">JavaScript Fundamentals</h3>
                                    <span
                                        className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded">Today</span>
                                </div>
                                <div className="flex items-center text-gray-300 mb-3">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    <span>10:30 AM - 11:30 AM</span>
                                    <span className="mx-2">•</span>
                                    <User className="h-4 w-4 mr-2"/>
                                    <span>Alex Johnson</span>
                                    <span className="mx-2">•</span>
                                    <Video className="h-4 w-4 mr-2"/>
                                    <span>Video Call</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                                        Join Now
                                    </button>
                                    <button
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
                                        Session Materials
                                    </button>
                                </div>
                                <div className="mt-2 text-right text-orange-300">
                                    Starts in: 1h 42m
                                </div>
                            </div>

                            {/* Session 2 */}
                            <div className="bg-[#1e293b] text-white rounded-lg p-4 mb-4">
                                <div className="flex items-center mb-2">
                                    <Calendar className="h-5 w-5 mr-2 text-[#ff6b35]"/>
                                    <h3 className="text-lg font-medium">Career Guidance Session</h3>
                                </div>
                                <div className="flex items-center text-gray-300 mb-3">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    <span>May 7 • 1:00 PM - 2:00 PM</span>
                                    <span className="mx-2">•</span>
                                    <User className="h-4 w-4 mr-2"/>
                                    <span>Sophia Chen</span>
                                    <span className="mx-2">•</span>
                                    <MessageSquare className="h-4 w-4 mr-2"/>
                                    <span>Chat Session</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
                                        Prepare Materials
                                    </button>
                                    <button
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
                                        Message Learner
                                    </button>
                                </div>
                                <div className="mt-2 text-right text-gray-400">
                                    In 2 days
                                </div>
                            </div>

                            {/* Session 3 */}
                            <div className="bg-[#1e293b] text-white rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <Calendar className="h-5 w-5 mr-2 text-[#ff6b35]"/>
                                    <h3 className="text-lg font-medium">Project Review</h3>
                                </div>
                                <div className="flex items-center text-gray-300 mb-3">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    <span>May 9 • 3:30 PM - 4:30 PM</span>
                                    <span className="mx-2">•</span>
                                    <User className="h-4 w-4 mr-2"/>
                                    <span>James Wilson</span>
                                    <span className="mx-2">•</span>
                                    <span>In-Person</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
                                        View Details
                                    </button>
                                </div>
                                <div className="mt-2 text-right text-gray-400">
                                    In 4 days
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg border border-[#F2F2F2] p-6 mb-6 ">
                            <div className="flex items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                                <span className="ml-2 text-yellow-500">⚡</span>
                            </div>

                            <div className="space-y-3">
                                <button
                                    className="w-full bg-[#ff6b35] hover:bg-[#e85d2c] text-white py-3 px-4 rounded-lg flex items-center">
                                    <CalendarIcon className="h-5 w-5 mr-3"/>
                                    Set/Update Availability
                                </button>

                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center">
                                    <User className="h-5 w-5 mr-3"/>
                                    Edit Profile Information
                                </button>

                                <button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center">
                                    <FileText className="h-5 w-5 mr-3"/>
                                    Upload New Resources
                                </button>

                                <button
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg flex items-center">
                                    <MessageSquare className="h-5 w-5 mr-3"/>
                                    Message Learners
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg border border-[#F2F2F2] p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Mentor Stats</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Sessions This Month:</span>
                                    <span className="font-semibold text-gray-800">12</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Average Rating:</span>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-gray-800 mr-1">5.0</span>
                                        <div className="flex text-yellow-400">
                                            <span>★★★★★</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Resources Shared:</span>
                                    <span className="font-semibold text-gray-800">23</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Active Learners:</span>
                                    <span className="font-semibold text-gray-800">8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MentorDashboard;