import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle} from 'lucide-react';
import Layout from "../Layout.tsx";

const Availability: React.FC = () => {
    const [selectedDay] = useState('Sunday, May 18');

    // Mock time slots
    const timeSlots = [
        { id: 1, time: '09:00 - 10:00', available: false },
        { id: 2, time: '10:15 - 11:15', available: false },
        { id: 3, time: '11:30 - 12:30', available: false },
        { id: 4, time: '12:45 - 13:45', available: false },
        { id: 5, time: '14:00 - 15:00', available: false },
        { id: 6, time: '15:15 - 16:15', available: false },
    ];

    // Mock week days
    const weekDays = [
        { day: 'Sun', date: 'May 18', active: true },
        { day: 'Mon', date: 'May 19', active: false },
        { day: 'Tue', date: 'May 20', active: false },
        { day: 'Wed', date: 'May 21', active: true },
        { day: 'Thu', date: 'May 22', active: false },
        { day: 'Fri', date: 'May 23', active: false },
        { day: 'Sat', date: 'May 24', active: false },
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Manage Your Availability</h1>
                    <button className="cursor-pointer bg-[#3D8D7A] hover:bg-[#578E7E] text-white px-4 py-2 rounded-md">
                        Save Changes
                    </button>
                </div>

                <div className="bg-amber-600 text-white p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>
                        <div>
                            <p className="font-medium">Some of your time slots are already booked.</p>
                            <p className="text-sm">You cannot modify work hours, session duration, or buffer time until
                                these bookings are completed or canceled.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <div className="bg-[#1e293b] text-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">Work hours</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Start time</label>
                                    <select
                                        className="w-full bg-[#2d3a4f] border border-gray-600 rounded-md p-2 text-white">
                                        <option>05:00</option>
                                        <option>06:00</option>
                                        <option>07:00</option>
                                        <option>08:00</option>
                                        <option>09:00</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">End time</label>
                                    <select
                                        className="w-full bg-[#2d3a4f] border border-gray-600 rounded-md p-2 text-white">
                                        <option>17:00</option>
                                        <option>18:00</option>
                                        <option>19:00</option>
                                        <option>20:00</option>
                                        <option>21:00</option>
                                    </select>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">Cannot change work hours while you have booked
                                sessions.</p>
                        </div>

                        <div className="bg-[#1e293b] text-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">Session settings</h2>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-400 mb-1">Session duration</label>
                                <select
                                    className="w-full bg-[#2d3a4f] border border-gray-600 rounded-md p-2 text-white">
                                    <option>30 minutes</option>
                                    <option>45 minutes</option>
                                    <option>60 minutes</option>
                                    <option>90 minutes</option>
                                    <option>120 minutes</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Buffer time between sessions</label>
                                <select
                                    className="w-full bg-[#2d3a4f] border border-gray-600 rounded-md p-2 text-white">
                                    <option>5 minutes</option>
                                    <option>10 minutes</option>
                                    <option>15 minutes</option>
                                    <option>20 minutes</option>
                                    <option>30 minutes</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-[#1e293b] text-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">Calendar Navigation</h2>
                            <div className="flex items-center justify-between mb-4">
                                <button className="text-gray-300 hover:text-white">
                                    <ChevronLeft className="h-5 w-5"/>
                                </button>
                                <span>May 18 - May 24</span>
                                <button className="text-gray-300 hover:text-white">
                                    <ChevronRight className="h-5 w-5"/>
                                </button>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                                Go to current week
                            </button>
                        </div>

                        <div className="bg-[#1e293b] text-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Bulk actions</h2>
                            <div className="space-y-3">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                                    Select all slots for Sun May 18
                                </button>
                                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md">
                                    Clear all slots for Sun May 18
                                </button>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
                                    Copy schedule to all days
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-[#1e293b] text-white rounded-lg shadow-md p-6 mb-6">
                            <div className="grid grid-cols-7 gap-2 mb-6">
                                {weekDays.map((day, index) => (
                                    <div key={index}
                                         className={`text-center p-2 rounded-lg ${day.active ? 'bg-blue-600' : ''}`}>
                                        <div className="text-sm font-medium">{day.day}</div>
                                        <div className="text-xs">{day.date}</div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-lg font-semibold mb-4">Set your availability for {selectedDay}</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {timeSlots.map((slot) => (
                                    <div
                                        key={slot.id}
                                        className="p-3 border border-gray-600 rounded-lg text-center cursor-pointer hover:bg-gray-700"
                                    >
                                        <div className="text-sm font-medium">{slot.time}</div>
                                        <div className="text-xs text-gray-400">Unavailable</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1e293b] text-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Availability preview</h2>
                            <p className="text-sm text-gray-400 mb-4">This is how your availability will appear to
                                learners:</p>

                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {weekDays.map((day, index) => (
                                    <div key={index} className="text-center p-2">
                                        <div className="text-sm font-medium">{day.day}</div>
                                        <div className="text-xs">{day.date}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                <div className="text-center">
                                    <div className="bg-blue-600 text-white text-xs p-1 rounded mb-1">10:15 (booked)
                                    </div>
                                    <div className="bg-blue-600 text-white text-xs p-1 rounded">14:00 (booked)</div>
                                </div>
                                <div className="text-center"></div>
                                <div className="text-center">
                                    <div className="bg-blue-600 text-white text-xs p-1 rounded mb-1">09:00 (booked)
                                    </div>
                                    <div className="bg-blue-600 text-white text-xs p-1 rounded">11:30 (booked)</div>
                                </div>
                                <div className="text-center"></div>
                                <div className="text-center"></div>
                                <div className="text-center"></div>
                                <div className="text-center"></div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                                    <span className="text-xs">Available</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                                    <span className="text-xs">Booked</span>
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-gray-400">
                                <p>Working hours: 09:00 - 17:00 • Session duration: 60 min • Buffer: 15 min</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Availability;