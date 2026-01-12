import {useEffect, useState} from "react";
import type {CreateExamRequest, Exam, UpdateExamRequest} from "../../types/exam.ts";
import {examApi} from "../../api/exam/examApi.ts";
import {getAxiosErrorMessage} from "../../../shared/utils/getAxiosErrorMessage.ts";

export function useExams() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        examApi.getAll()
            .then(setExams)
            .finally(() => setLoading(false));
    }, []);

    const createExam = async (data: CreateExamRequest) => {
        try {
            const exam = await examApi.create(data);
            setExams(prev => [...prev, exam]);

            return {
                success: true,
                message: 'Tạo bài thi thành công',
            };
        } catch (error: unknown) {
            return {
                success: false,
                message: getAxiosErrorMessage(error, 'Tạo bài thi thất bại'),
            };
        }
    };

    const updateExam = async (id: number, data: UpdateExamRequest) => {
        try {
            const res = await examApi.update(id, data);

            setExams(prev =>
                prev.map(e => (e.id === id ? res.exam : e))
            );

            return {
                success: true,
                message: res.message,
            };
        } catch (error: unknown) {
            return {
                success: false,
                message: getAxiosErrorMessage(error, 'Cập nhật thất bại'),
            };
        }
    };

    const deleteExam = async (id: number) => {
        try {
            const res = await examApi.delete(id);
            setExams(prev => prev.filter(e => e.id !== id));

            return {
                success: true,
                message: res.message,
            };
        } catch (error: unknown) {
            return {
                success: false,
                message: getAxiosErrorMessage(error, 'Xóa thất bại'),
            };
        }
    };

    return {
        exams,
        loading,
        createExam,
        updateExam,
        deleteExam,
    };
}