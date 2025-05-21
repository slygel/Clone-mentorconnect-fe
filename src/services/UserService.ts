import type { AxiosInstance } from "axios";

export const getCurrentUser = async (authAxios: AxiosInstance) => {
  const response = await authAxios.get("/auth/current-user");
  return response.data;
};

export const updateUserDetails = async (
  authAxios: AxiosInstance,
  userId: string,
  formData: FormData
) => {
  const response = await authAxios.patch(`/users/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllUsers = async (
  authAxios: AxiosInstance,
  options?: {
    name?: string;
    email?: string;
    status?: string;
    role?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    search?: string;
  }
) => {
  const params = new URLSearchParams();

  if (options?.name) params.append("name", options.name.trim());
  if (options?.email) params.append("email", options.email.trim());

  if (options?.status) params.append("status", options.status);
  if (options?.role) params.append("role", options.role);
  params.append("pageIndex", (options?.pageIndex ?? 0).toString());
  params.append("pageSize", (options?.pageSize ?? 10).toString());
  if (options?.sortBy) params.append("sortBy", options.sortBy);
  if (options?.sortDirection)
    params.append("sortDirection", options.sortDirection);

  const response = await authAxios.get(`/users?${params.toString()}`);
  return response.data;
};

export const getUserById = async (authAxios: AxiosInstance, userId: string) => {
  const response = await authAxios.get(`/users/${userId}`);
  return response.data;
};

export const deleteUser = async (authAxios: AxiosInstance, userId: string) => {
  const response = await authAxios.delete(`/users/${userId}`);
  return response.data;
};

export const updateUserStatus = async (
  authAxios: AxiosInstance,
  userId: string,
  accountStatus: string
) => {
  const response = await authAxios.patch(`/users/status/${userId}`, {
    accountStatus,
  });
  return response.data;
};
