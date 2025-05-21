import { type AxiosInstance } from 'axios';
import type { UserDataToApi } from '../interfaces/UserData';

interface LoginRequest {
    email: string;
    password: string;
}

export const login = async (authAxios: AxiosInstance, data: LoginRequest) => {
    const response = await authAxios.post("/auth/login", data);
    return response.data;
};

export const register = async (authAxios: AxiosInstance, data: UserDataToApi) => {
    // Create FormData object for multipart/form-data
    const formData = new FormData();

    // Append top-level fields
    formData.append('Email', data.email);
    formData.append('Password', data.password);
    formData.append('Role', data.role.toString());

    // Append UserDetailsToAddDTO fields
    formData.append('UserDetailsToAddDTO.FullName', data.userDetailsToAddDTO.fullName);
    if (data.userDetailsToAddDTO.bio) {
        formData.append('UserDetailsToAddDTO.Bio', data.userDetailsToAddDTO.bio);
    }
    if (data.userDetailsToAddDTO.skills) {
        formData.append('UserDetailsToAddDTO.Skills', data.userDetailsToAddDTO.skills);
    }
    if (data.userDetailsToAddDTO.experience) {
        formData.append('UserDetailsToAddDTO.Experience', data.userDetailsToAddDTO.experience);
    }
    formData.append('UserDetailsToAddDTO.PrefferedComm', data.userDetailsToAddDTO.prefferedComm.toString());
    if (data.userDetailsToAddDTO.learningGoal) {
        formData.append('UserDetailsToAddDTO.LearningGoal', data.userDetailsToAddDTO.learningGoal);
    }
    formData.append('UserDetailsToAddDTO.SessionFreq', data.userDetailsToAddDTO.sessionFreq.toString());
    formData.append('UserDetailsToAddDTO.SessionDur', data.userDetailsToAddDTO.sessionDur.toString());
    formData.append('UserDetailsToAddDTO.PrefferedStyle', data.userDetailsToAddDTO.prefferedStyle.toString());
    // Only append Availability if non-empty
    if (data.userDetailsToAddDTO.availability) {
        formData.append('UserDetailsToAddDTO.Availability', data.userDetailsToAddDTO.availability);
    }
    // Only append Expertise if non-empty
    if (data.userDetailsToAddDTO.expertise) {
        formData.append('UserDetailsToAddDTO.Expertise', data.userDetailsToAddDTO.expertise);
    }
    // Only append Preference if non-empty
    if (data.userDetailsToAddDTO.preference) {
        formData.append('UserDetailsToAddDTO.Preference', data.userDetailsToAddDTO.preference);
    }

    formData.append('UserDetailsToAddDTO.IsPrivate', data.userDetailsToAddDTO.isPrivate.toString());
    formData.append('UserDetailsToAddDTO.MessageAllowed', data.userDetailsToAddDTO.messageAllowed.toString());
    formData.append('UserDetailsToAddDTO.NotiAllowed', data.userDetailsToAddDTO.notiAllowed.toString());

    // Only append TeachingApproach if non-empty
    if (data.userDetailsToAddDTO.teachingApproaches) {
        formData.append('UserDetailsToAddDTO.TeachingApproach', data.userDetailsToAddDTO.teachingApproaches);
    }

    // Append avatar file if it exists
    if (data.userDetailsToAddDTO.avatarFile) {
        formData.append('UserDetailsToAddDTO.Avatar', data.userDetailsToAddDTO.avatarFile);
    }

    // Send the request with FormData
    const response = await authAxios.post('/auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Optional: browser sets this automatically
        },
    });

    return response.data;
};

export const getEmailExisted = async (authAxios: AxiosInstance, email: string) => {
    const response = await authAxios.get("/auth/existing-email?email=" + email);
    return response.data;
}