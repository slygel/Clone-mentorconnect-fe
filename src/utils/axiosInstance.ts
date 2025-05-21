import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

interface FailedRequest {
    resolve: (value: AxiosResponse) => void;
    reject: (reason?: unknown) => void;
}

const failedRequestsQueue: FailedRequest[] = [];
let isRefreshing = false;

const API_URL = import.meta.env.VITE_API_URL as string;

// Helper function to process the queue of failed requests
const processQueue = (error: AxiosError | null = null, response?: AxiosResponse) => {
    while (failedRequestsQueue.length > 0) {
        const { resolve, reject } = failedRequestsQueue.shift()!;

        if (error) {
            reject(error);
        } else if (response) {
            resolve(response);
        } else {
            reject(new Error("Unknown error occurred during queue processing."));
        }
    }
};

const axiosInstance = (
    handleLogout: (message?: string) => Promise<void>,
    displayToast: (message: string) => void
): AxiosInstance => {
    const authAxios = axios.create({
        baseURL: API_URL,
        withCredentials: true,
    });

    authAxios.interceptors.response.use(
        (response) => {
            // Process successful responses
            processQueue(null, response);
            return response;
        },
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
            const errorResponse = error.response?.data as { title?: string; detail?: string };

            if (
                error.response?.status === 401 &&
                !originalRequest.url?.includes("/auth/") &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    return new Promise<AxiosResponse>((resolve, reject) => {
                        failedRequestsQueue.push({ resolve, reject });
                    })
                        .then(() => authAxios(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshResponse = await authAxios.post("/auth/refresh-token");
                    processQueue(null, refreshResponse);
                    return authAxios(originalRequest);
                } catch (refreshError) {
                    const axiosError = refreshError as AxiosError;
                    processQueue(axiosError);
                    await handleLogout(
                        (axiosError.response?.data as { title?: string })?.title || "Session expired"
                    );
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            if (errorResponse) {
                const errorMessage = errorResponse.title || "An error occurred";
                const errorDetail = errorResponse.detail;
                displayToast(`${errorMessage}${errorDetail ? `: ${errorDetail}` : ""}`);
            }

            return Promise.reject(error);
        }
    );

    return authAxios;
};

export default axiosInstance;
