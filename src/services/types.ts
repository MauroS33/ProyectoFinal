export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    role?: string;
}