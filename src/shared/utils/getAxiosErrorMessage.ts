import { AxiosError } from 'axios';

export function getAxiosErrorMessage(
    error: unknown,
    fallback = 'Có lỗi xảy ra'
): string {
    if (error instanceof AxiosError) {
        const data = error.response?.data;

        if (typeof data === 'string') return data;
        if (typeof data === 'object' && data !== null && 'message' in data) {
            return String((data as { message?: string }).message ?? fallback);
        }
    }
    return fallback;
}
