export type User = {
    handle: string;
    name: string;
    email: string;
    password: string;
}

export type RegisterFormData = Pick<User, "name" | "handle" | "email" | "password"> & {
    repetir_password: string;
}

export type LoginFormData = Pick<User, "email" | "password">;