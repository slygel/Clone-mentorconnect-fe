import type {UserData} from "../interfaces/UserData.ts";

export interface ValidationErrors {
    [key: string]: string;
}

export const validateProfile = (userData: UserData) => {
    const errors: ValidationErrors = {};
    const regexFullName = /^[\p{L}\s]+$/u;

    // Full name validation
    if (!userData.fullName || userData.fullName.trim() === '') {
        errors.fullName = 'Full name is required';
    } else if (userData.fullName.trim().length > 100) {
        errors.fullName = 'Full name cannot exceed 100 characters';
    } else if(userData.fullName.trim().length < 2){
        errors.fullName = 'Full name must be at least 2 characters';
    }else if (!regexFullName.test(userData.fullName.trim())) {
        errors.fullName = 'Full name can only contain letters and spaces';
    }

    // Role validation
    if (!userData.role) {
        errors.role = 'Please select a role';
    } else if (!['mentor', 'learner'].includes(userData.role)) {
        errors.role = 'Invalid role selected';
    }

    // Bio validation
    if (userData.bio && userData.bio.trim() !== '') {
        const bioTrim = userData.bio.trim();
        if (bioTrim.length < 10) {
            errors.bio = 'Bio must be at least 10 characters';
        } else if (bioTrim.length > 1000) {
            errors.bio = 'Bio must not exceed 1000 characters';
        }
    }

    // Areas of expertise
    if (userData.areasOfExpertise && userData.areasOfExpertise.length > 8) {
        errors.areasOfExpertise = 'You can select up to 8 areas of expertise';
    }

    // Professional skills
    if (userData.professionalSkills && userData.professionalSkills.trim() !== '') {
        const profSkillsTrim = userData.professionalSkills.trim();
        if (profSkillsTrim.length < 3) {
            errors.professionalSkills = 'Professional skills must be at least 3 characters';
        } else if (profSkillsTrim.length > 300) {
            errors.professionalSkills = 'Too many characters in professional skills';
        }
    }

    // Industry experience
    if (userData.industryExperience && userData.industryExperience.trim() !== '') {
        const industryTrim = userData.industryExperience.trim();
        if (industryTrim.length < 3) {
            errors.industryExperience = 'Industry experience must be at least 3 characters';
        } else if (industryTrim.length > 200) {
            errors.industryExperience = 'Industry experience must not exceed 200 characters';
        }
    }

    // Availability
    if (userData.availability && userData.availability.length > 0) {
        const combinedLength = userData.availability.join(' ').length;
        if (combinedLength < 4) {
            errors.availability = 'Availability input is too short';
        } else if (combinedLength > 50) {
            errors.availability = 'Availability input is too long';
        }
    }

    // Communication method
    if (userData.communicationMethod) {
        const validMethods = ['video', 'audio', 'text'];
        if (!validMethods.includes(userData.communicationMethod)) {
            errors.communicationMethod = 'Invalid communication method selected';
        }
    }

    // Learning objectives
    if (userData.learningObjectives && userData.learningObjectives.trim() !== '') {
        const learnTrim = userData.learningObjectives.trim();
        if (learnTrim.length < 10) {
            errors.learningObjectives = 'Learning objectives must be at least 10 characters';
        } else if (learnTrim.length > 1000) {
            errors.learningObjectives = 'Input exceeds the allowed 1000 characters';
        }
    }

    return errors;
}