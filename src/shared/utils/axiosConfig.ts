import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://localhost:7100/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const isLoginRequest = error.config?.url?.includes('/User/login-user');

        if (status === 401 && !isLoginRequest) {
            localStorage.clear();
            window.location.href = '/login';
        }

        if (status === 403) {
            window.location.href = '/403';
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;