import { QuestionDifficulty, type QuestionType } from "./question.ts";

export interface Exam {
    id: number;
    name: string;
    classId: number;
    blueprintId?: number | null;
    durationMinutes: number;
    startTime: string;
    endTime: string;
}

export interface CreateExamRequest {
    name: string;
    classId: number;
    blueprintId: number;
    durationMinutes: number;
    startTime: string;
    endTime: string;
}

export interface CreateExamResponse {
    id: number;
    name: string;
    classId: number;
    blueprintId?: number | null;
    durationMinutes: number;
    startTime: string;
    endTime: string;
}

export interface UpdateExamRequest {
    name: string;
    classId: number;
    blueprintId: number;
    durationMinutes: number;
    startTime: string;
    endTime: string;
}

export interface ApiUpdateExamResponse {
    message: string;
    exam: Exam;
}

export interface ExamForStudent {
    examId: number;
    examName: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    status?: string | null;
    studentStartTime?: string | null;
    studentEndTime?: string | null;
}

export interface GetListExamForStudentDto {
    examId: number;
    examName: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    status?: string | null;
    studentStartTime?: string | null;
    studentEndTime?: string | null;
}

export interface ExamResultSummaryDto {
    examId: number;
    studentId: number;
    totalQuestions: number;
    correctCount: number;
    totalQuestionPoint: number;
    studentEarnedPoint: number;
    finalScore: number;
}

export interface ExamQuestionResultDto {
    questionId: number;
    order: number;
    content: string;
    studentAnswer: string;
    correctAnswer: string;
    cleanAnswer: string[];
    isCorrect: boolean;
    questionPoint: number;
    studentPoint: number;
}

export interface ExamResultPreviewDto {
    examId: number;
    examName: string;
    studentId: number;
    startTimeStudent: string;
    endTimeStudent: string;
    startTimeExam: string;
    endTimeExam: string;
    durationMinutes: number;
    totalPoint: number;
    totalQuestions: number;
    correctCount: number;
    details: ExamQuestionResultDto[];
}

// 🎯 Response từ start-exam API
export type StartExamResponse =
    | {
    status: 'create';
    wsUrl: string;
    data: ExamGenerateResultDto;
}
    | {
    status: 'in_progress';
    wsUrl: string;
}
    | {
    status: 'completed';
    data: ResponseResultExamDto;
}
    | {
    status: 'expired';
}
    | {
    status: 'not_started';
};

// 🎯 Đề thi được generate
export interface ExamGenerateResultDto {
    examId: number;
    name: string;
    totalQuestions: number;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    classId: number;
    blueprintId?: number | null;
    questions: GeneratedQuestionDto[];
}

export interface GeneratedQuestionDto {
    id: number;
    type: QuestionType;
    difficulty: QuestionDifficulty;
    order: number;
    content: string;
    imageUrl?: string;
    point: number;
    chapter: number;
    cleanAnswer: string[];
}

// 🎯 Kết quả khi hoàn thành
export interface ResponseResultExamDto {
    examId: number;
    studentId: number;
    startTime: string;
    endTime: string;
    points?: number | null;
    status: 'COMPLETED';
}

// 🎯 Enum ExamStatus từ BE
export type ExamStatus = 'IN_PROGRESS' | 'COMPLETED';

// 🎯 Tổng quan điểm sinh viên
export interface ExamStudentStatusDto {
    studentId: number;
    studentName: string;
    mssv: string;
    status: ExamStatus | null;
    score: number | null;
    submittedAt: string | null;
}

export interface ExamStudentsStatusResponse {
    examId: number;
    examName: string;
    students: ExamStudentStatusDto[];
}