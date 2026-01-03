export interface LoginRequest {
    email: string;
    password: string;
}

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
    id: number;
    mssv: string;
    fullName: string;
    dateOfBirth: string;
    email: string;
    role: UserRole;
}

export interface UserWithToken extends User {
    token: string;
    refreshToken: string;
}

export interface LoginResponse {
    message: string;
    user: UserWithToken;
}

export type RefreshTokenResponse = UserWithToken;

export interface RegisterResponse {
    message: string;
    user: UserWithToken;
}

export interface RegisterRequest {
    mssv: string;
    fullName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    role: UserRole;
}