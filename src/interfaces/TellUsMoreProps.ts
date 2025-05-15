import type {UserData} from "./UserData.ts";

export interface TellUsMoreProps {
    userData: UserData;
    updateUserData: (data: Partial<UserData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}