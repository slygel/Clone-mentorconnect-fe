import React, { useEffect, useState, useRef } from 'react';
import { Monitor, Headphones, MessageSquare, User } from 'lucide-react';
import type { CompleteProfileProps } from "../interfaces/CompleteProfileProps.ts";
import { InputField } from "./layouts/InputField.tsx";
import { TextareaField } from "./layouts/TextareaField.tsx";
import { MultiSelectButtonGroup } from "./layouts/MultiSelectButtonGroup.tsx";
import { NavigationButtonGroup } from "./layouts/NavigationButtonGroup.tsx";
import { validateProfile } from "../utils/validateProfile.ts";
import {masterDataService} from "../services/MasterDataService.ts";
import {useAuth} from "../contexts/AuthProvider.tsx";

const CompleteProfile: React.FC<CompleteProfileProps> = (
    { userData, updateUserData, nextStep, prevStep }) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const {authAxios} = useAuth();

    const [availabilityOptions, setAvailabilityOptions] = useState<string[]>([]);
    const [expertiseOptions, setExpertiseOptions] = useState<string[]>([]);

    // Create refs for fields to scroll to on error
    const refs = {
        fullName: useRef<HTMLDivElement>(null),
        role: useRef<HTMLDivElement>(null),
        bio: useRef<HTMLDivElement>(null),
        areasOfExpertise: useRef<HTMLDivElement>(null),
        professionalSkills: useRef<HTMLDivElement>(null),
        industryExperience: useRef<HTMLDivElement>(null),
        availability: useRef<HTMLDivElement>(null),
        communicationMethod: useRef<HTMLDivElement>(null),
        learningObjectives: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        if (!userData.role) {
            updateUserData({ role: 'learner', accountStatus: 1 });
        }
        fetchMasterData();
    }, []);

    const fetchMasterData = async () => {
        try {
            const response = await masterDataService(authAxios);
            setAvailabilityOptions(response.appSettings.availabilities || []);
            setExpertiseOptions(response.appSettings.expertises || []);
        }catch{
            setAvailabilityOptions(['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings']);
            setExpertiseOptions([
                'Leadership', 'Programming', 'Design', 'Marketing',
                'Data Science', 'Business', 'Project Management', 'Communication'
            ]);
        }
    }

    const toggleAvailability = (time: string) => {
        const updatedTimes = userData.availability.includes(time)
            ? userData.availability.filter(t => t !== time)
            : [...userData.availability, time];

        updateUserData({ availability: updatedTimes });
    };

    const toggleExpertise = (area: string) => {
        const updatedAreas = userData.areasOfExpertise.includes(area)
            ? userData.areasOfExpertise.filter(a => a !== area)
            : [...userData.areasOfExpertise, area];

        updateUserData({ areasOfExpertise: updatedAreas });
    };

    const clearError = (field: string) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validate = () => {
        const validationErrors = validateProfile(userData);
        setErrors(validationErrors);
        return validationErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();

        const errorKeys = Object.keys(validationErrors);
        if (errorKeys.length > 0) {
            const firstErrorField = errorKeys[0];
            const fieldRef = refs[firstErrorField as keyof typeof refs];
            if (fieldRef && fieldRef.current) {
                fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Optionally focus input inside container
                const input = fieldRef.current.querySelector('input, textarea, select, button') as HTMLElement | null;
                input?.focus();
            }
            return; // do not proceed
        }

        nextStep();
    };

    const isMentor = userData.role === 'mentor';
    const isLearner = userData.role === 'learner';

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Complete Your Profile</h1>
                <div className="text-right">
                    <span className="text-orange-500 font-bold">Step 2</span>
                    <span className="text-gray-600"> of 3</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div
                                className="w-25 h-25 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                <User className="w-10 h-10 text-gray-400" />
                            </div>
                            <label
                                className="absolute -bottom-0 -right-0 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-full cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <input type="file" className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div ref={refs.fullName} className="flex-1">
                        <InputField
                            label="Full Name"
                            id="fullName"
                            type="text"
                            value={userData.fullName}
                            onChange={(value) => updateUserData({ fullName: value })}
                            error={errors.fullName}
                            clearError={() => clearError('fullName')}
                            placeholder={"Enter your full name"}
                        />
                    </div>
                </div>

                <div ref={refs.role} className={"mb-6"}>
                    <label className="block text-gray-700 mb-2">I am joining as:</label>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${errors.role ? 'border-red-500' : ''}`}>
                        <button
                            type="button"
                            className={`p-6 rounded-lg border-2 flex flex-col items-center ${
                                userData.role === 'learner'
                                    ? 'bg-orange-200 border-orange-500'
                                    : 'bg-white border-gray-300 hover:border-orange-300'
                            }`}
                            onClick={() => updateUserData({ role: 'learner', accountStatus: 1 })}
                        >
                            <span className="text-2xl mb-2">👨‍🎓</span>
                            <h3 className="font-semibold text-lg">Learner</h3>
                            <p className="text-sm text-gray-600">I want to find mentors</p>
                        </button>

                        <button
                            type="button"
                            className={`p-6 rounded-lg border-2 flex flex-col items-center ${
                                userData.role === 'mentor'
                                    ? 'bg-orange-200 border-orange-500'
                                    : 'bg-white border-gray-300 hover:border-orange-300'
                            }`}
                            onClick={() => updateUserData({ role: 'mentor', accountStatus: 0 })}
                        >
                            <span className="text-2xl mb-2">👨‍🏫</span>
                            <h3 className="font-semibold text-lg">Mentor</h3>
                            <p className="text-sm text-gray-600">I want to mentor others</p>
                        </button>
                    </div>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>

                <div ref={refs.bio}>
                    <TextareaField
                        label="Bio"
                        id="bio"
                        value={userData.bio}
                        onChange={(value) => updateUserData({ bio: value })}
                        placeholder="Write a short bio about yourself..."
                        error={errors.bio}
                        clearError={() => clearError('bio')}
                        rows={4}
                    />
                </div>

                {/* Areas of expertise - only show for mentors */}
                {isMentor && (
                    <div ref={refs.areasOfExpertise}>
                        <MultiSelectButtonGroup
                            label="Areas of expertise"
                            options={expertiseOptions}
                            selected={userData.areasOfExpertise}
                            onToggle={toggleExpertise}
                            error={errors.areasOfExpertise}
                        />
                    </div>
                )}

                {isMentor && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div ref={refs.professionalSkills}>
                            <InputField
                                label="Professional skills"
                                id="professionalSkills"
                                type="text"
                                value={userData.professionalSkills}
                                onChange={(value) => updateUserData({ professionalSkills: value })}
                                clearError={() => clearError('professionalSkills')}
                                placeholder={"e.g. JavaScript, Project Management"}
                                error={errors.professionalSkills}
                            />
                        </div>

                        <div ref={refs.industryExperience}>
                            <InputField
                                label="Industry experience"
                                id="industryExperience"
                                type="text"
                                value={userData.industryExperience}
                                onChange={(value) => updateUserData({ industryExperience: value })}
                                clearError={() => clearError('industryExperience')}
                                placeholder={"e.g. 5 years in Tech, 3 years in Finance"}
                                error={errors.industryExperience}
                            />
                        </div>
                    </div>
                )}

                {isLearner && (
                    <div ref={refs.availability}>
                        <MultiSelectButtonGroup
                            label="Your availability"
                            options={availabilityOptions}
                            selected={userData.availability}
                            onToggle={toggleAvailability}
                            gridCols="flex justify-between"
                        />
                    </div>
                )}

                <div ref={refs.communicationMethod} className="mb-8">
                    <label className="block text-gray-700 mb-2">Preferred communication method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                            type="button"
                            className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                                userData.communicationMethod === 'video'
                                    ? 'bg-orange-200 border-orange-500 text-orange-700'
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                            }`}
                            onClick={() => updateUserData({ communicationMethod: 'video' })}
                        >
                            <Monitor size={20} />
                            <span>Video Call</span>
                        </button>

                        <button
                            type="button"
                            className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                                userData.communicationMethod === 'audio'
                                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                            }`}
                            onClick={() => updateUserData({ communicationMethod: 'audio' })}
                        >
                            <Headphones size={20} />
                            <span>Audio Call</span>
                        </button>

                        <button
                            type="button"
                            className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                                userData.communicationMethod === 'text'
                                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                            }`}
                            onClick={() => updateUserData({ communicationMethod: 'text' })}
                        >
                            <MessageSquare size={20} />
                            <span>Text Chat</span>
                        </button>
                    </div>
                </div>

                {/* Learning Objectives - show for learners */}
                {isLearner && (
                    <div ref={refs.learningObjectives}>
                        <TextareaField
                            label="What do you hope to learn?"
                            id="learningObjectives"
                            value={userData.learningObjectives}
                            onChange={(value) => updateUserData({ learningObjectives: value })}
                            placeholder="Describe your learning objectives and what you hope to achieve..."
                            rows={4}
                            error={errors.learningObjectives}
                            clearError={() => clearError('learningObjectives')}
                        />
                    </div>
                )}

                <NavigationButtonGroup
                    onBack={prevStep}
                    onSubmit={() => handleSubmit({ preventDefault: () => { } } as React.FormEvent)}
                    submitLabel="Continue to Final Step"
                />
            </form>
        </div>
    );
};

export default CompleteProfile;
