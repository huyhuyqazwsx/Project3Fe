import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth/useAuth.ts';
import { useClasses } from '../../../hooks/class/useClasses.ts';
import type { ClassForStudentDto } from '../../../types/class.ts';

export default function StudentClassesPage() {
    const { user } = useAuth();
    const { getClassesForStudent } = useClasses();
    const navigate = useNavigate();

    const [classes, setClasses] = useState<ClassForStudentDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        (async () => {
            setLoading(true);
            const data = await getClassesForStudent(user.id);
            setClasses(data ?? []);
            setLoading(false);
        })();
    }, [user]);

    return (
        <div style={{ padding: 24 }}>
            <h2>📚 Lớp học của tôi</h2>

            {loading ? (
                <p>Đang tải...</p>
            ) : classes.length === 0 ? (
                <p>📭 Bạn chưa tham gia lớp nào</p>
            ) : (
                <table border={1} cellPadding={8} width="100%">
                    <thead>
                    <tr>
                        <th>Tên lớp</th>
                        <th>Môn học</th>
                        <th>Giảng viên</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classes.map(c => (
                        <tr
                            key={c.classId}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                navigate(`/student/classes/${c.classId}`)
                            }
                        >
                            <td>{c.className}</td>
                            <td>
                                {c.subjectCode} – {c.subjectName}
                            </td>
                            <td>{c.teacherName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
