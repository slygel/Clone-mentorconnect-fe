import type { UserData } from "../interfaces/UserData";

export const convertDtoToUserData = (dto: any): UserData => {
    // Convert communication method to string
    let commMethod: 'video' | 'audio' | 'text' = 'video';
    if (dto.userDetailsToReturnDTO.prefferedComm === 'AudioCall') {
        commMethod = 'audio';
    } else if (dto.userDetailsToReturnDTO.prefferedComm === 'TextChat') {
        commMethod = 'text';
    }

    // Convert session frequency to string
    let sessionFreq = 'Weekly';
    if (dto.userDetailsToReturnDTO.sessionFreq === 'BiWeekly') {
        sessionFreq = 'Bi-weekly';
    } else if (dto.userDetailsToReturnDTO.sessionFreq === 'Monthly') {
        sessionFreq = 'Monthly';
    } else if (dto.userDetailsToReturnDTO.sessionFreq === 'AsNeeded') {
        sessionFreq = 'As needed';
    }

    // Convert session duration to string
    let sessionDur = '1 hour';
    if (dto.userDetailsToReturnDTO.sessionDur === 0.5) {
        sessionDur = '30 minutes';
    } else if (dto.userDetailsToReturnDTO.sessionDur === 1.5) {
        sessionDur = '1.5 hours';
    } else if (dto.userDetailsToReturnDTO.sessionDur === 2) {
        sessionDur = '2 hours';
    }

    // Convert learning style to string
    let prefferedStyle = 'visual';
    if (dto.userDetailsToReturnDTO.prefferedStyle === 'Auditory') {
        prefferedStyle = 'auditory';
    } else if (dto.userDetailsToReturnDTO.prefferedStyle === 'ReadingWriting') {
        prefferedStyle = 'reading/writing';
    } else if (dto.userDetailsToReturnDTO.prefferedStyle === 'Kinesthetic') {
        prefferedStyle = 'kinesthetic';
    }

    return {
        email: dto.email,
        password: '',
        confirmPassword: '',
        agreeToTerms: true,
        fullName: dto.userDetailsToReturnDTO.fullName ?? '',
        role: dto.role.toLowerCase(),
        bio: dto.userDetailsToReturnDTO.bio,
        areasOfExpertise: dto.userDetailsToReturnDTO.expertise
            ? dto.userDetailsToReturnDTO.expertise.split(';')
            : [],
        professionalSkills: dto.userDetailsToReturnDTO.skills,
        industryExperience: dto.userDetailsToReturnDTO.experience,
        communicationMethod: commMethod,
        learningObjectives: dto.userDetailsToReturnDTO.learningGoal,
        availability: dto.userDetailsToReturnDTO.availability
            ? dto.userDetailsToReturnDTO.availability.split(';')
            : [],
        interestedTopics: dto.userDetailsToReturnDTO.preference
            ? dto.userDetailsToReturnDTO.preference.split(';')
            : [],
        sessionFrequency: sessionFreq,
        sessionDuration: sessionDur,
        learningStyle: prefferedStyle,
        privateProfile: dto.userDetailsToReturnDTO.isPrivate,
        allowMessages: dto.userDetailsToReturnDTO.messageAllowed,
        receiveNotifications: dto.userDetailsToReturnDTO.notiAllowed,
        accountStatus: dto.accountStatus === 'Pending' ? 1 : 0,
        teachingApproaches: dto.userDetailsToReturnDTO.teachingApproach
            ? dto.userDetailsToReturnDTO.teachingApproach.split(';')
            : [],
        avatarFile: undefined
    };
};