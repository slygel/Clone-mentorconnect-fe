import React, {useState} from 'react';
import {CheckCircle, XCircle, Clipboard} from 'lucide-react';
import Layout from "../Layout.tsx";

interface MentorApplication {
    id: number;
    name: string;
    skills: string[];
    submitted: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    avatar: string;
}

const MentorApprovals: React.FC = () => {
    const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const applications: MentorApplication[] = [
        {
            id: 1,
            name: 'Sarah Johnson',
            skills: ['Data Science', 'Machine Learning', 'Python'],
            submitted: '9/10/2023',
            status: 'Pending',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            id: 2,
            name: 'Michael Chen',
            skills: ['UX Design', 'UI Prototyping', 'User Research'],
            submitted: '9/12/2023',
            status: 'Pending',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 3,
            name: 'Alex Rodriguez',
            skills: ['Leadership', 'Business Strategy', 'Marketing'],
            submitted: '9/14/2023',
            status: 'Pending',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
        }
    ];

    const filteredApplications = applications.filter(app => {
        if (activeTab === 'pending') return app.status === 'Pending';
        if (activeTab === 'approved') return app.status === 'Approved';
        if (activeTab === 'rejected') return app.status === 'Rejected';
        return true;
    });

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Mentor Applications</h1>
                </div>

                <div className="flex space-x-2 mb-6">
                    <button
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === 'pending' ? 'bg-[#3D8D7A] text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending (3)
                    </button>
                    <button
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === 'approved' ? 'bg-[#3D8D7A] text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('approved')}
                    >
                        Approved (2)
                    </button>
                    <button
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === 'rejected' ? 'bg-[#3D8D7A] text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('rejected')}
                    >
                        Rejected (1)
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Applications Awaiting Review</h2>
                        </div>
                        <div className="overflow-y-auto max-h-[600px]">
                            {filteredApplications.map((application) => (
                                <div
                                    key={application.id}
                                    className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${selectedApplication === application.id ? 'bg-gray-100' : ''}`}
                                    onClick={() => setSelectedApplication(application.id)}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={application.avatar || "/placeholder.svg"}
                                            alt={application.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{application.name}</div>
                                            <div className="text-sm text-gray-500">{application.skills.join(', ')}</div>
                                            <div className="flex items-center mt-1">
                                                <div
                                                    className={`h-2 w-2 rounded-full ${application.status === 'Pending' ? 'bg-yellow-400' : application.status === 'Approved' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                                <span className="ml-1 text-xs text-gray-500">{application.status} • Submitted: {application.submitted}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                        {selectedApplication ? (
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={applications.find(a => a.id === selectedApplication)?.avatar || "/placeholder.svg"}
                                                    alt="Applicant"
                                                    className="h-16 w-16 rounded-full object-cover"
                                                />
                                                <div className="ml-4">
                                                    <div
                                                        className="text-lg font-medium text-gray-900">{applications.find(a => a.id === selectedApplication)?.name}</div>
                                                    <div className="text-sm text-gray-500">john.doe@example.com</div>
                                                    <div className="text-sm text-gray-500">Applied
                                                        on {applications.find(a => a.id === selectedApplication)?.submitted}</div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-1">Areas of
                                                    Expertise</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {applications.find(a => a.id === selectedApplication)?.skills.map((skill, index) => (
                                                        <span key={index}
                                                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-1">Experience</h4>
                                                <p className="text-sm text-gray-600">
                                                    8+ years of professional experience in the field with a proven track
                                                    record of success.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Application
                                            Statement</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600">
                                                I am passionate about sharing my knowledge and experience with others. I
                                                believe in a hands-on approach to teaching that emphasizes practical
                                                skills
                                                and real-world applications. My goal is to help learners develop the
                                                confidence and competence they need to succeed in their careers.
                                            </p>
                                            <p className="text-sm text-gray-600 mt-4">
                                                I have previously mentored junior team members at my company and have
                                                received positive feedback on my teaching style and patience. I'm
                                                excited
                                                about the opportunity to reach a wider audience through this platform.
                                            </p>
                                        </div>

                                        <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Availability</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Days:</span> Weekdays, Evenings
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Hours per week:</span> 5-10
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Time zone:</span> UTC-5 (Eastern)
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Start date:</span> Immediate
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                        <Clipboard className="h-4 w-4 inline mr-1"/>
                                        Request More Info
                                    </button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                        <XCircle className="h-4 w-4 inline mr-1"/>
                                        Reject
                                    </button>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                        <CheckCircle className="h-4 w-4 inline mr-1"/>
                                        Approve
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                <Clipboard className="h-16 w-16 text-gray-300 mb-4"/>
                                <h3 className="text-lg font-medium text-gray-700">Select an application to view
                                    details</h3>
                                <p className="text-gray-500 mt-2">Click on an application from the list to review it</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MentorApprovals;