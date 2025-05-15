export interface UserData {
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
    fullName: string;
    role: 'learner' | 'mentor' | null;
    bio: string;
    areasOfExpertise: string[];
    professionalSkills: string;
    industryExperience: string;
    communicationMethod: 'video' | 'audio' | 'text' | null;
    learningObjectives: string;
    availability: string[];
    interestedTopics: string[];
    sessionFrequency: string;
    sessionDuration: string;
    learningStyle: string;
    privateProfile: boolean;
    allowMessages: boolean;
    receiveNotifications: boolean;
    accountStatus: number;
}

export interface UserDataToApi {
    email: string;
    password: string;
    role: number;
    userDetailsToAddDTO: {
        bio: string,
        imageUrl: string,
        skills: string,
        experience: string,
        prefferedComm: number,
        learningGoal: string,
        sessionFreq: number,
        sessionDur: number,
        prefferedStyle: number,
        availability: string,
        expertise: string,
        preference: string,
        isPrivate: boolean,
        messageAllowed: boolean,
        notiAllowed: boolean,
        accountStatus: number,
        fullName: string
    }
}

export const convertUserDataToApiFormat = (userData: UserData): UserDataToApi => {
    // Convert role to number
    const roleNumber = userData.role === 'mentor' ? 1 : 2;

    // Convert communication method to number
    let commMethod = 0;
    if (userData.communicationMethod === 'audio') commMethod = 1;
    if (userData.communicationMethod === 'text') commMethod = 2;

    // Convert session frequency to number
    let sessionFreq = 0;
    if (userData.sessionFrequency === 'Bi-weekly') sessionFreq = 1;
    if (userData.sessionFrequency === 'Monthly') sessionFreq = 2;
    if (userData.sessionFrequency === 'As needed') sessionFreq = 3;

    // Convert session duration to number
    let sessionDur = 0.5;
    if (userData.sessionDuration === '1 hour') sessionDur = 1;
    if (userData.sessionDuration === '1.5 hours') sessionDur = 1.5;
    if (userData.sessionDuration === '2 hours') sessionDur = 2;

    // Convert learning style to number
    let prefferedStyle = 0;
    if (userData.learningStyle === 'auditory') prefferedStyle = 1;
    if (userData.learningStyle === 'reading/writing') prefferedStyle = 2;
    if (userData.learningStyle === 'kinesthetic') prefferedStyle = 3;

    return {
        email: userData.email,
        password: userData.password,
        role: roleNumber,
        userDetailsToAddDTO: {
            bio: userData.bio || '',
            imageUrl: '', // Default empty as it's handled separately
            skills: userData.professionalSkills || '',
            experience: userData.industryExperience || '',
            prefferedComm: commMethod,
            learningGoal: userData.learningObjectives || '',
            sessionFreq: sessionFreq,
            sessionDur: sessionDur,
            prefferedStyle: prefferedStyle,
            availability: userData.availability.join(';'),
            expertise: userData.areasOfExpertise.join(';'),
            preference: userData.interestedTopics.join(';'),
            isPrivate: userData.privateProfile,
            messageAllowed: userData.allowMessages,
            notiAllowed: userData.receiveNotifications,
            accountStatus: userData.accountStatus,
            fullName: userData.fullName
        }
    };
};