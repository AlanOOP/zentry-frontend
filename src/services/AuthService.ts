import { isAxiosError } from "axios";
import api from "@/config/axios";
import type { LoginFormData, ProfileRequest, RegisterFormData, User } from "@/types/auth";
import type { UpdateAvatarResponse, UpdateProfileResponse } from "@/types/response";

export const authRegister = async (payload: RegisterFormData) => {
    try {
        const response = await api.post("/auth/register", payload);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error.toString() || "Error desconocido");
        } else {
            throw new Error("Error desconocido");
        }
    }
}

export async function authLogin(payload: LoginFormData) {
    try {
        const response = await api.post("/auth/login", payload);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Error en la solicitud:", error.response?.data.error || "Error desconocido");
            throw new Error(error.response?.data.error.toString() || "Error desconocido");
        } else {
            console.error("Error desconocido:", error);
            throw new Error("Error desconocido");
        }
    }
}

export async function getUser() {
    console.log("Fetching user data...");
    try {
        const token = localStorage.getItem("token");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get<User>("/auth/profile");

        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Error en la solicitud:", error.response?.data.error || "Error desconocido");
            throw new Error(error.response?.data.error.toString() || "Error desconocido");
        } else {
            console.error("Error desconocido:", error);
            throw new Error("Error desconocido");
        }
    }
}

export async function updateProfile(payload: ProfileRequest): Promise<UpdateProfileResponse> {
    try {
        const response = await api.put<UpdateProfileResponse>("/auth/profile", payload);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error.toString() || "Error desconocido");
        } else {
            throw new Error("Error desconocido");
        }
    }
}

export async function updateAvatar(file: File): Promise<UpdateAvatarResponse> {
    try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await api.patch<UpdateAvatarResponse>("/auth/profile/image", formData);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error.toString() || "Error desconocido");
        } else {
            throw new Error("Error desconocido");
        }
    }
}