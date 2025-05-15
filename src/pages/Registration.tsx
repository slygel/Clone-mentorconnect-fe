import {useState} from 'react';
import CompleteProfile from "../components/CompleteProfile.tsx";
import SetPreferences from "../components/SetPreferences.tsx";
import {convertUserDataToApiFormat, type UserData} from "../interfaces/UserData.ts";
import CreateAccount from "../components/CreateAccount.tsx";
import {useNavigate} from "react-router-dom";
import {register} from "../services/AuthService.ts";
import {useAuth} from "../contexts/AuthProvider.tsx";
import {toast} from "react-toastify";
import axios from "axios";

const initialUserData: UserData = {
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    fullName: '',
    bio: '',
    role: "learner",
    areasOfExpertise: [],
    professionalSkills: '',
    industryExperience: '',
    availability: [],
    communicationMethod: null,
    learningObjectives: '',
    interestedTopics: [],
    sessionFrequency: 'Weekly',
    sessionDuration: '1 hour',
    learningStyle: 'visual',
    privateProfile: false,
    allowMessages: true,
    receiveNotifications: true,
    accountStatus: 0
};

const Registration = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const navigate = useNavigate();
    const { authAxios } = useAuth();

    const updateUserData = (data: Partial<UserData>) => {
        setUserData(prev => ({...prev, ...data}));
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 4));
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

            // Show success message and redirect
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
        <div className="min-h-screen bg-[#EFEEEA] flex items-center justify-center p-4">
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
                    />
                )}
                {currentStep === 3 && (
                    <SetPreferences
                        userData={userData}
                        updateUserData={updateUserData}
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default Registration;