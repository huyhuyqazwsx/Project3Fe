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