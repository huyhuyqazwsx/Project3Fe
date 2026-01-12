import type {Exam, UpdateExamRequest} from "../../types/exam.ts";
import {useState} from "react";
import * as React from "react";

interface Props {
    exams: Exam[];
    loading: boolean;
    onUpdate: (
        id: number,
        data: UpdateExamRequest
    ) => Promise<{ success: boolean; message: string }>;
    onDelete: (id: number) => Promise<{ success: boolean; message: string }>;
}

function toDatetimeLocal(value: string) {
    // "2026-01-15T13:00:00" -> "2026-01-15T13:00"
    return value ? value.slice(0, 16) : '';
}

export function ExamList({
                             exams,
                             loading,
                             onUpdate,
                             onDelete,
                         }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<UpdateExamRequest | null>(null);

    /* ===== Start edit ===== */
    const startEdit = (exam: Exam) => {
        setEditingId(exam.id);
        setForm({
            name: exam.name,
            classId: exam.classId,
            blueprintId: exam.blueprintId ?? 0,
            durationMinutes: exam.durationMinutes,
            startTime: toDatetimeLocal(exam.startTime),
            endTime: toDatetimeLocal(exam.endTime),
        });
    };

    /* ===== Handle change ===== */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!form) return;

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev!,
            [name]:
                name === 'name' || name === 'startTime' || name === 'endTime'
                    ? value
                    : Number(value),
        }));
    };

    /* ===== Save ===== */
    const handleUpdate = async (id: number) => {
        if (!form) return;
        await onUpdate(id, form);
        setEditingId(null);
        setForm(null);
    };

    if (loading) return <p>Đang tải danh sách bài thi...</p>;
    if (!exams.length) return <p>Chưa có bài thi nào</p>;

    return (
        <table width="100%" border={1} cellPadding={8}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Tên bài thi</th>
                <th>Class</th>
                <th>Blueprint</th>
                <th>Thời gian</th>
                <th>Thời lượng (phút)</th>
                <th>Hành động</th>
            </tr>
            </thead>

            <tbody>
            {exams.map(exam => (
                <tr key={exam.id}>
                    <td>{exam.id}</td>

                    {/* Name */}
                    <td>
                        {editingId === exam.id ? (
                            <input
                                name="name"
                                value={form?.name}
                                onChange={handleChange}
                            />
                        ) : (
                            exam.name
                        )}
                    </td>

                    {/* Class */}
                    <td>
                        {editingId === exam.id ? (
                            <input
                                name="classId"
                                type="number"
                                value={form?.classId}
                                onChange={handleChange}
                            />
                        ) : (
                            exam.classId
                        )}
                    </td>

                    {/* Blueprint */}
                    <td>
                        {editingId === exam.id ? (
                            <input
                                name="blueprintId"
                                type="number"
                                value={form?.blueprintId}
                                onChange={handleChange}
                            />
                        ) : (
                            exam.blueprintId ?? '-'
                        )}
                    </td>

                    {/* Time */}
                    <td>
                        {editingId === exam.id ? (
                            <>
                                <input
                                    type="datetime-local"
                                    name="startTime"
                                    value={form?.startTime}
                                    onChange={handleChange}
                                />
                                <br />
                                <input
                                    type="datetime-local"
                                    name="endTime"
                                    value={form?.endTime}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                {new Date(exam.startTime).toLocaleString()}
                                {' → '}
                                {new Date(exam.endTime).toLocaleString()}
                            </>
                        )}
                    </td>

                    {/* Duration */}
                    <td>
                        {editingId === exam.id ? (
                            <input
                                name="durationMinutes"
                                type="number"
                                value={form?.durationMinutes}
                                onChange={handleChange}
                            />
                        ) : (
                            exam.durationMinutes
                        )}
                    </td>

                    {/* Actions */}
                    <td>
                        {editingId === exam.id ? (
                            <>
                                <button onClick={() => handleUpdate(exam.id)}>
                                    💾 Lưu
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingId(null);
                                        setForm(null);
                                    }}
                                >
                                    ❌ Hủy
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => startEdit(exam)}>
                                    ✏️ Sửa
                                </button>
                                <button onClick={() => onDelete(exam.id)}>
                                    🗑 Xóa
                                </button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}