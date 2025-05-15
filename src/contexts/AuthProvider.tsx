// src/contexts/AuthProvider.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type {AxiosInstance} from "axios";
import axiosInstance from "../utils/axiosInstance.ts";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User | null) => void;
  logout: (message?: string) => Promise<void>;
  authAxios: AxiosInstance;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const displayToast = (message: string) => {
    console.log(message); // Replace with actual toast/toastify
  };

  const handleLogout = async (message: string = "You have been logged out") => {
    try {
      await authAxios.post("/Auth/Logout");
    } finally {
      setUser(null);
      displayToast(message);
      navigate("/login");
    }
  };

  const authAxios = axiosInstance(handleLogout, displayToast);

  const verifyAuth = async () => {
    try {
      const response = await authAxios.get<User>("/Auth/GetCurrentUser");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
      <AuthContext.Provider
          value={{
            user,
            loading,
            updateUser,
            logout: handleLogout,
            authAxios,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
