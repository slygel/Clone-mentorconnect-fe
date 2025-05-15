import React, {useState} from "react";
import {InputField} from "../components/layouts/InputField.tsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../contexts/AuthProvider.tsx";
import {login} from "../services/AuthService.ts";
import {toast} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const {authAxios} = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const validate = () => {
        const newErrors: Record<string, string> = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

        if(!formData.email || formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        }else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = "Please enter a valid email";
        }

        if(formData.email.length > 255){
            newErrors.email = 'The length of Email address should be 254 characters';
        }

        if(!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters, include a number and a capital letter and a special character';
        }

        if(!formData.password || formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        if(formData.password.length > 128){
            newErrors.password = 'The password must not exceed 128 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(validate()){
            setIsSubmitting(true);

            try {
                await login(authAxios, {
                    email: formData.email,
                    password: formData.password
                });
                // Handle successful login
                toast.success("Login successfully");
                navigate("/");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const errorData = error.response?.data;
                    if (errorData) {
                        // Handle validation errors
                        if (errorData.detail) {
                            toast.error(errorData.detail);
                        } else {
                            // Handle other API errors
                            const errorMessage = errorData.title || errorData.detail || 'Login failed';
                            toast.error(errorMessage);
                        }
                    } else {
                        toast.error('Registration failed. Please try again.');
                    }
                } else {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    toast.error(`Registration failed: ${errorMessage}`);
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#EFEEEA] flex items-center justify-center p-4">
            <div className="p-8 w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-[#000000]">Sign In Your Account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Email Address"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(value) => setFormData({...formData, email: value})}
                        error={errors.email}
                        clearError={() => clearError("email")}
                        placeholder={"Enter your email here"}
                    />

                    <InputField
                        label="Password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(value) => setFormData({...formData, password: value})}
                        error={errors.password}
                        clearError={() => clearError("password")}
                        showToggle
                        showPassword={showPassword}
                        toggleVisibility={togglePasswordVisibility}
                        placeholder={"Enter your password"}
                    />

                    <div className="flex items-center justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-orange-500 hover:underline text-sm"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`cursor-pointer w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-200 ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-orange-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
