import { isAxiosError } from "axios";
import api from "@/config/axios";
import type { LoginFormData, RegisterFormData, User } from "@/types/auth";

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