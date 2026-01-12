import type { GetListExamForStudentDto } from '../../modules/types/exam';

export type ExamUIStatus =
    | 'NOT_STARTED'
    | 'AVAILABLE'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'EXPIRED';

export function getExamUIStatus(
    exam: GetListExamForStudentDto
): ExamUIStatus {
    const now = new Date();
    const start = new Date(exam.startTime);
    const end = new Date(exam.endTime);

    // 1️⃣ Ưu tiên status từ BE
    if (exam.status === 'COMPLETED') return 'COMPLETED';
    if (exam.status === 'IN_PROGRESS') return 'IN_PROGRESS';

    // 2️⃣ So thời gian
    if (now < start) return 'NOT_STARTED';
    if (now > end) return 'EXPIRED';

    // 3️⃣ Trong thời gian thi nhưng chưa có status
    return 'AVAILABLE';
}

export function getExamStatusLabel(status: ExamUIStatus) {
    switch (status) {
        case 'NOT_STARTED':
            return '🕒 Chưa mở';
        case 'AVAILABLE':
            return '▶️ Chưa làm';
        case 'IN_PROGRESS':
            return '⏳ Đang làm';
        case 'COMPLETED':
            return '📊 Đã nộp';
        case 'EXPIRED':
            return '⛔ Hết hạn';
        default:
            return '';
    }
}