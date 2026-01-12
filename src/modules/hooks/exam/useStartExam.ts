import {useState} from 'react';
import axios from 'axios';
import {examApi} from '../../api/exam/examApi';
import type {StartExamError, StartExamResponse,} from '../../types/exam';
import {getAxiosErrorMessage} from '../../../shared/utils/getAxiosErrorMessage';

export function useStartExam() {
    const [loading, setLoading] = useState(false);

    const startExam = async (
        examId: number,
        studentId: number
    ): Promise<StartExamResponse | null> => {
        setLoading(true);

        try {
            return await examApi.startExam(examId, studentId);
        } catch (error: unknown) {
            if (axios.isAxiosError<StartExamError>(error)) {
                const data = error.response?.data;

                if (data?.status === 'expired') {
                    alert('⛔ Bài thi đã hết hạn');
                    return null;
                }

                if (data?.status === 'not_started') {
                    alert('🕒 Bài thi chưa mở');
                    return null;
                }
            }

            // fallback chung toàn project
            alert(getAxiosErrorMessage(error));
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        startExam,
        loading,
    };
}
