import axios, {type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from "axios";

interface FailedRequest {
    resolve: (value: AxiosResponse) => void;
    reject: (error: AxiosError) => void;
}

let isRefreshing = false;
const failedRequestsQueue: FailedRequest[] = [];

// Helper function to process the queue of failed requests
const processQueue = (error: AxiosError | null = null) => {
    failedRequestsQueue.forEach(request => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve({} as AxiosResponse);
        }
    });

    // Clear the queue after processing
    failedRequestsQueue.length = 0;
};

const axiosInstance = (
    handleLogout: (message?: string) => Promise<void>,
    displayToast: (message: string) => void
): AxiosInstance => {
    const authAxios = axios.create({
        baseURL: "https://40ee-14-232-74-239.ngrok-free.app",
        withCredentials: true,
    });

    authAxios.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
            const errorResponse = error.response?.data as { title?: string; detail?: string };

            if (
                error.response?.status === 401 &&
                !originalRequest.url?.includes("/Auth/") &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    return new Promise<AxiosResponse>((resolve, reject) => {
                        failedRequestsQueue.push({resolve, reject});
                    })
                        .then(() => authAxios(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    // Use authAxios for consistency
                    await authAxios.post("/Auth/RefreshToken", {});

                    // Process all the requests in the queue
                    processQueue();

                    // Retry the original request
                    return authAxios(originalRequest);
                } catch (refreshError) {
                    const axiosError = refreshError as AxiosError;

                    // Process the queue with an error
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
