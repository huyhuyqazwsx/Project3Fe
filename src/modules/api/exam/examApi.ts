import axiosInstance from "../../../shared/utils/axiosConfig.ts";
import type {
    ApiUpdateExamResponse,
    CreateExamRequest,
    CreateExamResponse,
    Exam,
    ExamForStudent,
    ExamResultPreviewDto,
    ExamResultSummaryDto,
    GetListExamForStudentDto,
    StartExamResponse,
    UpdateExamRequest,
    ExamStudentsStatusResponse,
    ExamGenerateResultDto
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
            { params: { studentId } }
        );
        return res.data;
    },

    startExam: async (
        examId: number,
        studentId: number
    ): Promise<StartExamResponse> => {
        const res = await axiosInstance.post<StartExamResponse>(
            '/Exam/start-exam',
            { examId, studentId }
        );
        return res.data;
    },

    // 🆕 Lấy tổng quan điểm các sinh viên trong 1 bài kiểm tra
    getPreviewScoreStudents: async (
        examId: number
    ): Promise<ExamStudentsStatusResponse> => {
        const res = await axiosInstance.get<ExamStudentsStatusResponse>(
            `/Exam/preview-score-students/${examId}`
        );
        return res.data;
    },

    // 🆕 Lấy câu hỏi hiện tại của sinh viên (dùng khi reload trang)
    getCurrentQuestion: async (
        examId: number,
        studentId: number
    ): Promise<ExamGenerateResultDto> => {
        const res = await axiosInstance.get<ExamGenerateResultDto>(
            `/Exam/exams/${examId}/current-question`,
            { params: { studentId } }
        );
        return res.data;
    },
};