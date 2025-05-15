import type {UserData} from "./UserData.ts";

export interface CreateAccountProps {
    userData: UserData;
    updateUserData: (data: Partial<UserData>) => void;
    nextStep: () => void;
}