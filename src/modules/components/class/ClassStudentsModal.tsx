import { useEffect, useState } from 'react';
import type {
    StudentInClass,
    StudentsInClassResponse,
} from '../../types/class.ts';

interface Props {
    classId: number;
    onClose: () => void;
    getStudents: (classId: number) => Promise<StudentsInClassResponse>;
}

export function ClassStudentsModal({
                                       classId,
                                       onClose,
                                       getStudents,
                                   }: Props) {
    const [students, setStudents] = useState<StudentInClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStudents(classId).then(res => {
            setStudents(res.students);
            setLoading(false);
        });
    }, [classId]);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ background: '#fff', padding: 20, width: 600 }}>
                <h3>👥 Danh sách sinh viên</h3>

                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    <table width="100%" border={1} cellPadding={6}>
                        <thead>
                        <tr>
                            <th>MSSV</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map(s => (
                            <tr key={s.studentId}>
                                <td>{s.mssv}</td>
                                <td>{s.fullName}</td>
                                <td>{s.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <button onClick={onClose} style={{ marginTop: 12 }}>
                    ❌ Đóng
                </button>
            </div>
        </div>
    );
}
