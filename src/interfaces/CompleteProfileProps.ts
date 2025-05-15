import type {UserData} from "./UserData.ts";

export interface CompleteProfileProps {
    userData: UserData;
    updateUserData: (data: Partial<UserData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}