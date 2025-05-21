import React from 'react';
import {Users, BookOpen, Calendar, FileCheck} from 'lucide-react';
import Layout from "../Layout.tsx";

const AdminDashboard: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6 bg-white">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600">Platform metrics and statistics overview</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Total Users Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-[#F2F2F2]">
                        <div className="flex items-center text-[#096B68] mb-4">
                            <Users className="h-6 w-6 mr-2"/>
                            <h2 className="text-lg font-semibold">Total Users</h2>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800">330</span>
                            <div className="flex justify-between mt-2">
                                <span className="text-gray-600">76 Mentors</span>
                                <span className="text-[#1B4D3E]">254 Learners</span>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <span className="text-[#1B4D3E] text-sm">+15% this month</span>
                            </div>
                        </div>
                    </div>

                    {/* Resources Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-[#F2F2F2]">
                        <div className="flex items-center text-[#096B68] mb-4">
                            <BookOpen className="h-6 w-6 mr-2"/>
                            <h2 className="text-lg font-semibold">Resources</h2>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800">128</span>
                            <span className="text-gray-600 mt-2">14 added this week</span>
                            <div className="mt-4 flex justify-end">
                                <span className="text-[#1B4D3E] text-sm">+8% this month</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Sessions Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-[#F2F2F2]">
                        <div className="flex items-center text-[#096B68] mb-4">
                            <Calendar className="h-6 w-6 mr-2"/>
                            <h2 className="text-lg font-semibold">Sessions</h2>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800">538</span>
                            <span className="text-gray-600 mt-2">32 sessions this week</span>
                            <div className="mt-4 flex justify-end">
                                <span className="text-[#1B4D3E] text-sm">+12% this month</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Approvals Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-[#F2F2F2]">
                        <div className="flex items-center text-[#096B68] mb-4">
                            <FileCheck className="h-6 w-6 mr-2"/>
                            <h2 className="text-lg font-semibold">Pending Approvals</h2>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800">12</span>
                            <div className="mt-4">
                                <a href="/mentor-approvals" className="text-[#1B4D3E] hover:underline">Review Approvals →</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Platform Performance</h2>
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-[#F2F2F2]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <h3 className="text-gray-600 mb-2">Avg. Session Rating</h3>
                                <p className="text-2xl font-bold text-gray-800">4.8/5</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-gray-600 mb-2">Mentor Retention</h3>
                                <p className="text-2xl font-bold text-gray-800">92%</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-gray-600 mb-2">Resource Downloads</h3>
                                <p className="text-2xl font-bold text-gray-800">3.2K</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-gray-600 mb-2">New Users (30d)</h3>
                                <p className="text-2xl font-bold text-gray-800">+48</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;