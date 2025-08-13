import { isAxiosError } from "axios";
import api from "../config/axios";
import type { LoginFormData } from "@/types/auth";

export async function authLogin(payload: LoginFormData) {
    try {
        const response = await api.post<string>("/auth/login", payload);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error en la solicitud:", error.response?.data.error || "Error desconocido");
        } else {
            console.error("Error desconocido:", error);
        }
    }
}