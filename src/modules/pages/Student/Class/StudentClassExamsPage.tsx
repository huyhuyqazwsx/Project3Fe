import { useNavigate, useParams } from 'react-router-dom';
import {
    getExamUIStatus,
    getExamStatusLabel,
} from '../../../../shared/utils/examStatus.ts';
import {useStudentClassExams} from "../../../hooks/class/useStudentClassExams.ts";

export default function StudentClassExamsPage() {
    const { classId } = useParams<{ classId: string }>();
    const navigate = useNavigate();

    const { exams, loading } = useStudentClassExams(
        classId ? Number(classId) : undefined
    );

    return (
        <div style={{ padding: 24 }}>
            <button onClick={() => navigate(-1)}>⬅ Quay lại lớp</button>

            <h2 style={{ marginTop: 16 }}>
                📝 Danh sách đề thi của lớp
            </h2>

            {loading ? (
                <p>Đang tải...</p>
            ) : exams.length === 0 ? (
                <p>📭 Lớp này chưa có đề thi</p>
            ) : (
                <table
                    border={1}
                    cellPadding={8}
                    width="100%"
                    style={{ marginTop: 16 }}
                >
                    <thead>
                    <tr>
                        <th>Tên đề</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.map(exam => {
                        const uiStatus = getExamUIStatus(exam);

                        return (
                            <tr key={exam.examId}>
                                <td>{exam.examName}</td>

                                <td>
                                    {new Date(
                                        exam.startTime
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    {new Date(
                                        exam.endTime
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    {getExamStatusLabel(uiStatus)}
                                </td>

                                <td>
                                    {uiStatus === 'COMPLETED' && (
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/student/results?examId=${exam.examId}`
                                                )
                                            }
                                        >
                                            📊 Xem kết quả
                                        </button>
                                    )}

                                    {(uiStatus === 'AVAILABLE' ||
                                        uiStatus === 'IN_PROGRESS') && (
                                        <button
                                            onClick={() =>
                                                navigate(`/student/exams/${exam.examId}/take`)
                                            }
                                        >
                                            ▶️{' '}
                                            {uiStatus === 'IN_PROGRESS'
                                                ? 'Tiếp tục'
                                                : 'Vào thi'}
                                        </button>
                                    )}

                                    {(uiStatus === 'NOT_STARTED' ||
                                        uiStatus === 'EXPIRED') && (
                                        <span>—</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
