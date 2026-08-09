import api from "../api/axios";
import type { LoginRequest, LoginResponse, LogoutRequest, RegisterRequest, RegisterResponse, ResetPasswordRequest } from "../types/auth.types";
export const authService = {
    login:async(credentials:LoginRequest) : Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/auth/signin",credentials);
        return response.data;
    },
    register:async(credentials:RegisterRequest) : Promise<RegisterResponse> => {
        const response = await api.post<RegisterResponse>("/auth/signup",credentials);
        return response.data;
    },
    logout: async (credentials:LogoutRequest)=> {
        const response = await api.post("/auth/logout",credentials)
        return response.data;
    },
    resetPassword: async(credentials:ResetPasswordRequest)=> {
        const response =await api.post("/auth/forgot-password",credentials)
        return response.data;
    }
}