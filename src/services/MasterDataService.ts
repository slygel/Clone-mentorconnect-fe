import type { AxiosInstance } from "axios";

export const masterDataService = async (authAxios: AxiosInstance) => {
    // Assuming your API endpoint is "/MasterData"
    const response = await authAxios.get("/master-data");
    return response.data;
};