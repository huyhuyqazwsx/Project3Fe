import { useEffect, useState } from 'react';
import {authApi} from "../../api/auth/authApi.ts";
import type {User, LoginRequest, UserWithToken, RegisterRequest} from "../../types/auth.ts"

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
        }
        setLoading(false);
    }, []);

    const login = async (data: LoginRequest) => {
        console.log('CALL useAuth.login', data);
        const response = await authApi.login(data);

        saveAuth(response.user);
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            if (refreshToken) {
                await authApi.logout(refreshToken);
            }
        } catch {
            console.warn('Logout API failed');
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const refresh = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;

        const userWithToken = await authApi.refreshToken(refreshToken);
        saveAuth(userWithToken);
    }

    const register = async (data: RegisterRequest) => {
        const response = await authApi.register(data);
        saveAuth(response.user);
    };

    const saveAuth = (userWithToken: UserWithToken) => {
        const { token, refreshToken, ...safeUser } = userWithToken;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(safeUser));

        setUser(safeUser);
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refresh,
        register,
    };
}
