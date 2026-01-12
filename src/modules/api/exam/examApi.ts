import axiosInstance from "../../../shared/utils/axiosConfig.ts";
import type {
    ApiUpdateExamResponse,
    CreateExamRequest,
    CreateExamResponse,
    Exam, ExamForStudent, ExamResultPreviewDto, ExamResultSummaryDto, GetListExamForStudentDto,
    UpdateExamRequest
} from "../../types/exam.ts";

export const examApi = {
    getAll: async (): Promise<Exam[]> => {
        const res = await axiosInstance.get<Exam[]>('/Exam/get-all');
        return res.data;
    },

    getById: async (id: number): Promise<Exam> => {
        const res = await axiosInstance.get<Exam>(`/Exam/${id}`);
        return res.data;
    },

    create: async (data: CreateExamRequest): Promise<CreateExamResponse> => {
        const res = await axiosInstance.post<CreateExamResponse>(
            '/Exam/create-exam',
            data
        );
        return res.data;
    },

    update: async (
        id: number,
        data: UpdateExamRequest
    ): Promise<ApiUpdateExamResponse> => {
        const res = await axiosInstance.put<ApiUpdateExamResponse>(
            `/Exam/update/${id}`,
            data
        );
        return res.data;
    },

    delete: async (id: number): Promise<{ message: string }> => {
        const res = await axiosInstance.delete<{ message: string }>(
            `/Exam/delete/${id}`
        );
        return res.data;
    },

    getExamsForStudent: async (
        studentId: number
    ): Promise<ExamForStudent[]> => {
        const res = await axiosInstance.get<ExamForStudent[]>(
            `/Exam/student/${studentId}/exams`
        );
        return res.data;
    },

    getResultSummary: async (
        examId: number,
        studentId: number
    ): Promise<ExamResultSummaryDto> => {
        const res = await axiosInstance.get(
            `/Exam/exams/${examId}/result-summary`,
            { params: { studentId } }
        );
        return res.data;
    },

    getResultDetail: async (
        examId: number,
        studentId: number
    ): Promise<ExamResultPreviewDto> => {
        const res = await axiosInstance.get(
            `/Exam/detail`,
            { params: { examId, studentId } }
        );
        return res.data;
    },

    getExamsForStudentByClass: async (
        classId: number,
        studentId: number
    ): Promise<GetListExamForStudentDto[]> => {
        const res = await axiosInstance.get(
            `/Exam/class/${classId}`,
            { params: { studentId } } // BE đang dùng
        );
        return res.data;
    },
};