import {useEffect, useState} from 'react';
import CompleteProfile from "../components/CompleteProfile.tsx";
import SetPreferences from "../components/SetPreferences.tsx";
import {convertUserDataToApiFormat, type UserData} from "../interfaces/UserData.ts";
import CreateAccount from "../components/CreateAccount.tsx";
import {useNavigate} from "react-router-dom";
import {register} from "../services/AuthService.ts";
import {useAuth} from "../contexts/AuthProvider.tsx";
import {toast} from "react-toastify";
import axios from "axios";
import {masterDataService} from "../services/MasterDataService.ts";

const initialUserData: UserData = {
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    fullName: '',
    role: 'learner',
    bio: '',
    areasOfExpertise: [],
    professionalSkills: '',
    industryExperience: '',
    availability: [],
    communicationMethod: 'video',
    learningObjectives: '',
    interestedTopics: [],
    sessionFrequency: 'Weekly',
    sessionDuration: '1 hour',
    learningStyle: 'visual',
    privateProfile: false,
    allowMessages: true,
    receiveNotifications: true,
    accountStatus: 1,
    teachingApproaches: [],
    avatarFile: undefined,
};

const Registration = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [userData, setUserData] = useState<UserData>(initialUserData);

    const [availabilityOptions, setAvailabilityOptions] = useState<string[]>([]);
    const [expertiseOptions, setExpertiseOptions] = useState<string[]>([]);
    const [topicOptions, setTopicOptions] = useState<string[]>([]);

    const navigate = useNavigate();
    const { authAxios } = useAuth();

    useEffect(() => {
        fetchMasterData();
    }, [authAxios]);

    const fetchMasterData = async () => {
        try {
            const response = await masterDataService(authAxios);
            setAvailabilityOptions(response.appSettings.availabilities || []);
            setExpertiseOptions(response.appSettings.expertises || []);
            setTopicOptions(response.appSettings.preferences || []);
        } catch {
            setAvailabilityOptions(['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings']);
            setExpertiseOptions([
                'Leadership', 'Programming', 'Design', 'Marketing',
                'Data Science', 'Business', 'Project Management', 'Communication'
            ]);
            setTopicOptions([
                'Career Development', 'Technical Skills', 'Leadership', 'Communication',
                'Work-Life Balance', 'Industry Insights', 'Networking', 'Entrepreneurship'
            ]);
        }
    };
    const updateUserData = (data: Partial<UserData>) => {
        setUserData(prev => ({...prev, ...data}));
    };

    const nextStep = () => {
        console.log("Moving to next step", userData.avatarFile);
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        try {
            // Convert userData to API format
            const apiData = convertUserDataToApiFormat(userData);
            console.log('Form submitted:', apiData);

            // Call the registration API
            const response = await register(authAxios,apiData);
            console.log('Registration successful:', response);

            // Handle profile image upload if needed
            // This would go here

            // Show success message and redirect and remove state
            toast.success('Registration completed successfully!');
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data;
                if (errorData) {
                    // Handle validation errors
                    if (errorData.detail) {
                        toast.error(errorData.detail);
                    } else {
                        // Handle other API errors
                        const errorMessage = errorData.title || errorData.detail || 'Registration failed';
                        toast.error(errorMessage);
                    }
                } else {
                    toast.error('Registration failed. Please try again.');
                }
            } else {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                toast.error(`Registration failed: ${errorMessage}`);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#ECFAE5] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {currentStep === 1 && (
                    <CreateAccount
                        userData={userData}
                        updateUserData={updateUserData}
                        nextStep={nextStep}
                    />
                )}
                {currentStep === 2 && (
                    <CompleteProfile
                        userData={userData}
                        updateUserData={updateUserData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        availabilityOptions={availabilityOptions}
                        expertiseOptions={expertiseOptions}
                    />
                )}
                {currentStep === 3 && (
                    <SetPreferences
                        userData={userData}
                        updateUserData={updateUserData}
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                        topicOptions={topicOptions}
                    />
                )}
            </div>
        </div>
    );
};

export default Registration;