import { useEffect, useState } from 'react';
import { useClasses } from '../../../hooks/class/useClasses.ts';
import type { StudentInClass } from '../../../types/class.ts';

interface Props {
    classId: number;
    onBack: () => void;
}

export function ClassDetailPage({ classId, onBack }: Props) {
    const {
        classes,
        getStudentsInClass,
        addStudents,
        removeStudents,
    } = useClasses();

    const classInfo = classes.find(c => c.id === classId);

    const [students, setStudents] = useState<StudentInClass[]>([]);
    const [loading, setLoading] = useState(true);

    const [studentIdsInput, setStudentIdsInput] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    /* ✅ LOAD 1 LẦN KHI VÀO TRANG */
    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);

            const res = await getStudentsInClass(classId);
            if (cancelled) return;

            // backend có thể trả []
            setStudents(res.students ?? []);
            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [classId]);

    if (!classInfo) return <p>Không tìm thấy lớp</p>;

    /* ===== ADD STUDENTS (CHỈ GỌI API) ===== */
    const handleAddStudents = async () => {
        const ids = studentIdsInput
            .split(',')
            .map(x => Number(x.trim()))
            .filter(Boolean);

        if (!ids.length) {
            alert('Vui lòng nhập ít nhất 1 studentId');
            return;
        }

        await addStudents(classId, ids);
        setStudentIdsInput('');
        alert('Đã gửi yêu cầu thêm sinh viên');
    };

    /* ===== REMOVE STUDENTS (CHỈ GỌI API) ===== */
    const handleRemoveStudents = async () => {
        if (!selectedIds.length) return;

        await removeStudents(classId, selectedIds);
        alert('Đã gửi yêu cầu xoá sinh viên');
    };

    return (
        <div>
            <button onClick={onBack}>⬅ Quay lại</button>

            <h3>🏫 {classInfo.name}</h3>
            <p>Subject ID: {classInfo.subjectId}</p>
            <p>Teacher ID: {classInfo.teacherId}</p>

            <hr />

            <h4>➕ Thêm sinh viên</h4>
            <input
                placeholder="VD: 1,2,3"
                value={studentIdsInput}
                onChange={e => setStudentIdsInput(e.target.value)}
            />
            <button onClick={handleAddStudents}>➕ Thêm</button>

            <hr />

            <h4>👥 Sinh viên trong lớp</h4>

            {loading ? (
                <p>Đang tải...</p>
            ) : students.length === 0 ? (
                <p>📭 Lớp chưa có sinh viên</p>
            ) : (
                <>
                    <table border={1} cellPadding={6}>
                        <thead>
                        <tr>
                            <th></th>
                            <th>MSSV</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map(s => (
                            <tr key={s.studentId}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(s.studentId)}
                                        onChange={e =>
                                            setSelectedIds(prev =>
                                                e.target.checked
                                                    ? [...prev, s.studentId]
                                                    : prev.filter(id => id !== s.studentId)
                                            )
                                        }
                                    />
                                </td>
                                <td>{s.mssv}</td>
                                <td>{s.fullName}</td>
                                <td>{s.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <button
                        onClick={handleRemoveStudents}
                        disabled={!selectedIds.length}
                    >
                        ❌ Xóa sinh viên đã chọn
                    </button>
                </>
            )}
        </div>
    );
}
