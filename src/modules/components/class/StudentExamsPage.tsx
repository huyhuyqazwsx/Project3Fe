import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { examApi } from '../../api/exam/examApi';
import type { GetListExamForStudentDto } from '../../types/exam';
import { useNavigate } from 'react-router-dom';

export default function StudentExamsPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [exams, setExams] = useState<GetListExamForStudentDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        let cancelled = false;

        (async () => {
            setLoading(true);

            const data = await examApi.getExamsForStudent(user.id);
            if (cancelled) return;

            setExams(data);
            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [user]);

    return (
        <div style={{ padding: 24 }}>
            <h2>📝 Bài thi của tôi</h2>

            {loading ? (
                <p>Đang tải...</p>
            ) : exams.length === 0 ? (
                <p>📭 Hiện tại chưa có bài thi</p>
            ) : (
                <table border={1} cellPadding={8} width="100%">
                    <thead>
                    <tr>
                        <th>Tên bài thi</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Thời lượng (phút)</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.map(e => (
                        <tr key={e.examId}>
                            <td>{e.examName}</td>
                            <td>{new Date(e.startTime).toLocaleString()}</td>
                            <td>{new Date(e.endTime).toLocaleString()}</td>
                            <td>{e.durationMinutes}</td>
                            <td>{e.status ?? 'CHƯA LÀM'}</td>
                            <td>
                                {e.status === 'COMPLETED' ? (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/student/results?examId=${e.examId}`
                                            )
                                        }
                                    >
                                        📊 Xem kết quả
                                    </button>
                                ) : (
                                    <span>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
