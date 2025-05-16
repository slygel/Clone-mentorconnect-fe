import React, {useEffect} from 'react';
import {BarChart3, ChevronDown, FileText, MessageSquare, Wrench} from 'lucide-react';
import type {SetPreferencesProps} from "../interfaces/SetPreferencesProps.ts";
import {NavigationButtonGroup} from "./layouts/NavigationButtonGroup.tsx";
import {masterDataService} from "../services/MasterDataService.ts";
import {useAuth} from "../contexts/AuthProvider.tsx";

const SetPreferences: React.FC<SetPreferencesProps> = (
    {userData, updateUserData, prevStep, handleSubmit}) => {

    const {authAxios} = useAuth();
    const [topicOptions, setTopicOptions] = React.useState<string[]>([]);

    const learningStyles = ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'];

    useEffect(() => {
        fetchMasterData();
    }, []);

    const fetchMasterData = async () => {
        try {
            const response = await masterDataService(authAxios);
            setTopicOptions(response.appSettings.preferences || []);
        }catch{
            setTopicOptions([
                'Career Development', 'Technical Skills', 'Leadership', 'Communication',
                'Work-Life Balance', 'Industry Insights', 'Networking', 'Entrepreneurship'
            ]);
        }
    }

    const toggleTopic = (topic: string) => {
        const updatedTopics = (userData.interestedTopics || []).includes(topic)
            ? userData.interestedTopics?.filter(t => t !== topic)
            : [...(userData.interestedTopics || []), topic];

        updateUserData({ interestedTopics: updatedTopics });
    };


    const toggleTeachingApproach = (approach: string) => {
        const updatedApproaches = userData.teachingApproaches?.includes(approach)
            ? userData.teachingApproaches.filter((a) => a !== approach)
            : [...(userData.teachingApproaches || []), approach]

        updateUserData({ teachingApproaches: updatedApproaches })
    }

    const isMentor = userData.role === 'mentor';
    const isLearner = userData.role === 'learner';

    return (
        <div className="p-8">
            <div className="mb-8 flex justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Set Your Preferences</h1>
                <div className="text-right">
                    <span className="text-orange-500 font-bold">Step 3</span>
                    <span className="text-gray-600"> of 3</span>
                </div>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                {/* Topics - show for learners only */}
                {isLearner && (
                    <div className="mb-8">
                        <label className="block text-gray-700 mb-2">Topics you're interested in learning about</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {topicOptions.map(topic => (
                                <button
                                    key={topic}
                                    type="button"
                                    className={`p-3 rounded-lg border ${
                                        userData.interestedTopics?.includes(topic)
                                            ? 'bg-orange-100 border-orange-500 text-orange-700'
                                            : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                                    }`}
                                    onClick={() => toggleTopic(topic)}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label htmlFor="sessionFrequency" className="block text-gray-700 mb-2">Preferred session frequency</label>
                        <div className="relative">
                            <select
                                id="sessionFrequency"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none"
                                value={userData.sessionFrequency}
                                onChange={(e) => updateUserData({sessionFrequency: e.target.value})}
                            >
                                <option value="Weekly">Weekly</option>
                                <option value="Bi-weekly">Bi-weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="As needed">As needed</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDown className="h-5 w-5 text-gray-400"/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="sessionDuration" className="block text-gray-700 mb-2">Preferred session
                            duration</label>
                        <div className="relative">
                            <select
                                id="sessionDuration"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none"
                                value={userData.sessionDuration}
                                onChange={(e) => updateUserData({sessionDuration: e.target.value})}
                            >
                                <option value="30 minutes">30 minutes</option>
                                <option value="1 hour">1 hour</option>
                                <option value="1.5 hours">1.5 hours</option>
                                <option value="2 hours">2 hours</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDown className="h-5 w-5 text-gray-400"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Learning style - show for learners only */}
                {isLearner && (
                    <div className="mb-8">
                        <label className="block text-gray-700 mb-2">Your preferred learning style</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {learningStyles.map(style => (
                                <button
                                    key={style}
                                    type="button"
                                    className={`p-3 rounded-lg ${
                                        userData.learningStyle === style.toLowerCase()
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => updateUserData({learningStyle: style.toLowerCase()})}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isMentor && (
                    <div className="mb-8">
                        <label className="block text-gray-700 mb-2">Your teaching approach (select all that
                            apply)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                type="button"
                                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                                    userData.teachingApproaches?.includes("hands-on")
                                        ? "bg-orange-100 border-orange-500 text-orange-700"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-300"
                                }`}
                                onClick={() => toggleTeachingApproach("hands-on")}
                            >
                                <Wrench className="h-5 w-5"/>
                                <span>Hands-on Practice</span>
                            </button>

                            <button
                                type="button"
                                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                                    userData.teachingApproaches?.includes("discussion")
                                        ? "bg-orange-100 border-orange-500 text-orange-700"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-300"
                                }`}
                                onClick={() => toggleTeachingApproach("discussion")}
                            >
                                <MessageSquare className="h-5 w-5"/>
                                <span>Discussion Based</span>
                            </button>

                            <button
                                type="button"
                                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                                    userData.teachingApproaches?.includes("project")
                                        ? "bg-orange-100 border-orange-500 text-orange-700"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-300"
                                }`}
                                onClick={() => toggleTeachingApproach("project")}
                            >
                                <BarChart3 className="h-5 w-5"/>
                                <span>Project Based</span>
                            </button>

                            <button
                                type="button"
                                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                                    userData.teachingApproaches?.includes("lecture")
                                        ? "bg-orange-100 border-orange-500 text-orange-700"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-orange-300"
                                }`}
                                onClick={() => toggleTeachingApproach("lecture")}
                            >
                                <FileText className="h-5 w-5"/>
                                <span>Lecture Style</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-200 my-8 pt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Privacy settings</h2>

                    <div className="space-y-4">
                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 text-orange-500 rounded"
                                checked={userData.privateProfile}
                                onChange={(e) => updateUserData({privateProfile: e.target.checked})}
                            />
                            <div className="ml-2">
                                <div className="text-gray-700 font-medium">Private profile</div>
                                <div className="text-gray-500 text-sm">Only approved connections can view your full
                                    profile details
                                </div>
                            </div>
                        </label>

                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 text-orange-500 rounded"
                                checked={userData.allowMessages}
                                onChange={(e) => updateUserData({allowMessages: e.target.checked})}
                            />
                            <div className="ml-2">
                                <div className="text-gray-700 font-medium">Allow messages</div>
                                <div className="text-gray-500 text-sm">Let others initiate contact with you through
                                    messages
                                </div>
                            </div>
                        </label>

                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 text-orange-500 rounded"
                                checked={userData.receiveNotifications}
                                onChange={(e) => updateUserData({receiveNotifications: e.target.checked})}
                            />
                            <div className="ml-2">
                                <div className="text-gray-700 font-medium">Receive notifications</div>
                                <div className="text-gray-500 text-sm">
                                    Get email and in-app notifications for messages, session requests, and updates
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <NavigationButtonGroup
                    onBack={prevStep}
                    // onSubmit={handleSubmit}
                    submitLabel="Complete Registration"
                />
            </form>
        </div>
    );
};

export default SetPreferences;