import type {UserData} from "./UserData.ts";

export interface SetPreferencesProps {
    userData: UserData;
    updateUserData: (data: Partial<UserData>) => void;
    prevStep: () => void;
    handleSubmit: () => void;
    topicOptions: string[];
}