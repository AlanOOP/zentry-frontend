export type User = {
    _id ?: string;
    handle: string;
    name: string;
    email: string;
    password: string;
    description: string;
    avatar?: string;
}

export type RegisterFormData = Pick<User, "name" | "handle" | "email" | "password"> & {
    repetir_password: string;
}


export type LoginFormData = Pick<User, "email" | "password">;

export type ProfileRequest = Pick<User, "handle" | "description" > ;