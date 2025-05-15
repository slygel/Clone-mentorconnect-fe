import axios, { type AxiosInstance } from 'axios';
import type { UserDataToApi } from '../interfaces/UserData';

interface LoginRequest {
    email: string;
    password: string;
}

export const login = async (authAxios: AxiosInstance, data: LoginRequest) => {
    const response = await authAxios.post("/Auth/Login", data);
    return response.data;
};

export const register = async (authAxios: AxiosInstance, data: UserDataToApi) => {
    const response = await authAxios.post("/Auth/Register", data);
    return response.data;
}

export const uploadProfileImage = async (authAxios: AxiosInstance, file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await authAxios.post(`/Auth/UploadProfileImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.title ||
                error.response?.data?.message ||
                'Image upload failed';
            throw new Error(errorMessage);
        }
        throw error;
    }
}