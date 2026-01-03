import { useState, memo } from "react";
import type { Subject, UpdateSubjectRequest } from "../../types/subject.ts";

interface ListProps {
    subjects: Subject[];
    loading: boolean;
    onUpdate: (id: number, data: UpdateSubjectRequest) => Promise<{ success: boolean; message: string }>;
    onDelete: (id: number) => Promise<{ success: boolean; message: string }>;
}

export const SubjectList = memo(({ subjects, loading, onUpdate, onDelete }: ListProps) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<UpdateSubjectRequest>({
        name: '',
        subjectCode: '',
        totalChapters: 1,
    });
    const [message, setMessage] = useState<string | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const handleEdit = (subject: Subject) => {
        setEditingId(subject.id);
        setEditData({
            name: subject.name,
            subjectCode: subject.subjectCode,
            totalChapters: subject.totalChapters,
        });
    };

    const handleSave = async (id: number) => {
        const res = await onUpdate(id, editData);
        showMessage(res.message);
        if (res.success) {
            setEditingId(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({ name: '', subjectCode: '', totalChapters: 1 });
    };

    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`Xóa môn học "${name}"?`)) return;
        const res = await onDelete(id);
        showMessage(res.message);
    };

    if (loading) {
        return <p style={{ textAlign: 'center', padding: 20 }}>Đang tải...</p>;
    }

    if (subjects.length === 0) {
        return <p style={{ textAlign: 'center', padding: 20, color: '#999' }}>Không có môn học nào.</p>;
    }

    return (
        <div>
            <h3>📋 Danh sách môn học ({subjects.length})</h3>

            {message && (
                <p style={{
                    margin: '0 0 10px 0',
                    padding: 8,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 4,
                    color: '#333'
                }}>
                    {message}
                </p>
            )}

            <table
                border={1}
                cellPadding={8}
                style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}
            >
                <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ width: '30%' }}>Tên môn học</th>
                    <th style={{ width: '20%' }}>Mã môn</th>
                    <th style={{ width: '15%' }}>Số chương</th>
                    <th style={{ width: '35%' }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {subjects.map(subject => (
                    <tr key={subject.id}>
                        {editingId === subject.id ? (
                            <>
                                <td>
                                    <input
                                        value={editData.name}
                                        onChange={e =>
                                            setEditData(prev => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        style={{ width: '100%', padding: 6 }}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={editData.subjectCode}
                                        onChange={e =>
                                            setEditData(prev => ({
                                                ...prev,
                                                subjectCode: e.target.value,
                                            }))
                                        }
                                        style={{ width: '100%', padding: 6 }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min={1}
                                        value={editData.totalChapters}
                                        onChange={e =>
                                            setEditData(prev => ({
                                                ...prev,
                                                totalChapters: Number(e.target.value),
                                            }))
                                        }
                                        style={{ width: '100%', padding: 6 }}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSave(subject.id)}
                                        style={{
                                            padding: '6px 15px',
                                            marginRight: 5,
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        style={{
                                            padding: '6px 15px',
                                            backgroundColor: '#6c757d',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{subject.name}</td>
                                <td>{subject.subjectCode}</td>
                                <td style={{ textAlign: 'center' }}>{subject.totalChapters}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(subject)}
                                        style={{
                                            padding: '6px 15px',
                                            marginRight: 5,
                                            backgroundColor: '#ffc107',
                                            color: '#000',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(subject.id, subject.name)}
                                        style={{
                                            padding: '6px 15px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
});