import React, {useState} from "react";
import type {CreateAccountProps} from "../interfaces/CreateAccountProps.ts";
import {InputField} from "./layouts/InputField.tsx";
import {CheckboxField} from "./layouts/CheckboxField.tsx";
import {Link} from "react-router-dom";

const CreateAccount: React.FC<CreateAccountProps> = ({
        userData, updateUserData, nextStep,
 }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = async () => {
        const newErrors: Record<string, string> = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

        if(!userData.email || userData.email.trim() === '') {
            newErrors.email = 'Please enter in your email';
        }else if (!emailRegex.test(userData.email.trim())) {
            newErrors.email = "Please enter a valid email";
        }

        if(userData.email.length > 254){
            newErrors.email = 'The length of Email address should be 254 characters';
        }

        if(!passwordRegex.test(userData.password)) {
            newErrors.password = 'Password must be at least 8 characters, include a number and a capital letter and a special character';
        }

        if(!userData.confirmPassword || userData.confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Please confirm your password';
        }else if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if(!userData.password || userData.password.trim() === '') {
            newErrors.password = 'Please enter in your password';
        }else if(userData.password.length > 128){
            newErrors.password = 'The password must not exceed 128 characters';
        }

        if (!userData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validate();
        if (isValid) {
            updateUserData(userData);
            nextStep();
        }
    };

    const clearError = (field: string) => {
        setErrors((prevErrors) => {
            const newErrors = {...prevErrors};
            delete newErrors[field];
            return newErrors;
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#000000]">
                    Create Your Account
                </h1>
                <div className="text-right">
                    <span className="text-[#1B4D3E] font-bold">Step 1</span>
                    <span className="text-gray-600"> of 3</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block mb-2">
                    Email address <span className="text-red-500">*</span>
                </label>
                <InputField
                    id="email"
                    type="text"
                    value={userData.email}
                    onChange={(value) => updateUserData({email: value})}
                    placeholder={"Enter your email here"}
                    error={errors.email}
                    clearError={() => clearError('email')}
                />

                <label className="block mb-2">
                    Password <span className="text-red-500">*</span>
                </label>
                <InputField
                    id="password"
                    type="password"
                    value={userData.password}
                    onChange={(value) => updateUserData({password: value})}
                    error={errors.password}
                    clearError={() => clearError('password')}
                    showToggle
                    showPassword={showPassword}
                    toggleVisibility={togglePasswordVisibility}
                    placeholder={"Enter your password"}
                />

                <label className="block mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <InputField
                    id="confirmPassword"
                    type="password"
                    value={userData.confirmPassword}
                    onChange={(value) => updateUserData({confirmPassword: value})}
                    error={errors.confirmPassword}
                    clearError={() => clearError('confirmPassword')}
                    showToggle
                    showPassword={showConfirmPassword}
                    toggleVisibility={toggleConfirmPasswordVisibility}
                    placeholder={"Enter your password"}
                />

                <CheckboxField
                    label={
                        <>
                            I agree to the{" "}
                            <a href="#" className="text-[#1B4D3E] hover:underline font-semibold">
                                Terms of Service
                            </a>{" "}
                            and
                            <a href="#" className="text-[#1B4D3E] hover:underline font-semibold">
                                {" "}
                                Privacy Policy
                            </a>
                        </>
                    }
                    value={userData.agreeToTerms}
                    onChange={(checked) => updateUserData({agreeToTerms: checked})}
                    error={errors.agreeToTerms}
                    clearError={() => clearError('agreeToTerms')}
                />

                <button
                    type="submit"
                    className={`w-full py-4 bg-[#5F8B4C] hover:bg-[#658147] text-white font-semibold rounded-lg transition duration-200 ${
                        userData.agreeToTerms
                            ? "cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                    }`}
                    disabled={!userData.agreeToTerms}
                >
                    Continue to Profile Setup
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#1B4D3E] hover:underline font-semibold">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CreateAccount;