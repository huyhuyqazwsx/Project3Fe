import type { ClassItem } from '../../types/class';

interface Props {
    classes: ClassItem[];
    loading: boolean;
    onSelect: (classId: number) => void;
}

export function ClassList({
                              classes,
                              loading,
                              onSelect,
                          }: Props) {
    if (loading) return <p>Đang tải...</p>;
    if (!classes.length) return <p>Chưa có lớp nào</p>;

    return (
        <table border={1} cellPadding={8} width="100%">
            <thead>
            <tr>
                <th>ID</th>
                <th>Tên lớp</th>
                <th>Subject ID</th>
                <th>Teacher ID</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {classes.map(c => (
                <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.subjectId}</td>
                    <td>{c.teacherId}</td>
                    <td>
                        <button onClick={() => onSelect(c.id)}>
                            👁 Xem chi tiết
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
