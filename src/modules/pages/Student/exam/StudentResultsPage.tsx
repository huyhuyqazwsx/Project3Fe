import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth/useAuth.ts';
import { examApi } from '../../../api/exam/examApi.ts';
import type {
    GetListExamForStudentDto,
    ExamResultSummaryDto,
    ExamResultPreviewDto,
} from '../../../types/exam.ts';

export default function StudentResultsPage() {
    const { user } = useAuth();

    const [exams, setExams] = useState<GetListExamForStudentDto[]>([]);

    const [summary, setSummary] = useState<ExamResultSummaryDto | null>(null);
    const [detail, setDetail] = useState<ExamResultPreviewDto | null>(null);

    const loadResult = async (examId: number) => {
        if (!user) return;

        setSummary(null);
        setDetail(null);

        const [summaryRes, detailRes] = await Promise.all([
            examApi.getResultSummary(examId, user.id),
            examApi.getResultDetail(examId, user.id),
        ]);

        setSummary(summaryRes);
        setDetail(detailRes);
    };


    const [loading, setLoading] = useState(true);

    /* ===== LOAD EXAMS ===== */
    useEffect(() => {
        if (!user) return;

        (async () => {
            setLoading(true);
            const data = await examApi.getExamsForStudent(user.id);

            // chỉ lấy exam đã hoàn thành
            setExams(data.filter(e => e.status === 'COMPLETED'));
            setLoading(false);
        })();
    }, [user]);

    return (
        <div style={{ padding: 24 }}>
            <h2>📊 Kết quả bài thi</h2>

            {loading ? (
                <p>Đang tải...</p>
            ) : exams.length === 0 ? (
                <p>📭 Bạn chưa có bài thi nào đã hoàn thành</p>
            ) : (
                <>
                    {/* ===== LIST EXAMS ===== */}
                    <table border={1} cellPadding={8} width="100%">
                        <thead>
                        <tr>
                            <th>Tên bài thi</th>
                            <th>Thời gian</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exams.map(e => (
                            <tr key={e.examId}>
                                <td>{e.examName}</td>
                                <td>
                                    {new Date(e.startTime).toLocaleString()}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            loadResult(e.examId)
                                        }
                                    >
                                        📊 Xem kết quả
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* ===== SUMMARY ===== */}
                    {summary && (
                        <>
                            <hr />
                            <h3>📌 Tổng kết</h3>
                            <p>
                                Đúng: {summary.correctCount}/
                                {summary.totalQuestions}
                            </p>
                            <p>
                                Điểm: {summary.finalScore} / 10
                            </p>
                        </>
                    )}

                    {/* ===== DETAIL ===== */}
                    {detail && (
                        <>
                            <hr />
                            <h3>🧠 Chi tiết bài làm</h3>

                            {detail.details.map(q => (
                                <div
                                    key={q.questionId}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: 12,
                                        marginBottom: 12,
                                        background: q.isCorrect
                                            ? '#ecfdf5'
                                            : '#fef2f2',
                                    }}
                                >
                                    <p>
                                        <strong>
                                            Câu {q.order}:
                                        </strong>{' '}
                                        {q.content}
                                    </p>
                                    <p>
                                        ❓ Đáp án của bạn:{' '}
                                        <strong>{q.studentAnswer}</strong>
                                    </p>
                                    <p>
                                        ✅ Đáp án đúng:{' '}
                                        {q.cleanAnswer.join(', ')}
                                    </p>
                                    <p>
                                        🎯 Điểm: {q.studentPoint}/
                                        {q.questionPoint}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
