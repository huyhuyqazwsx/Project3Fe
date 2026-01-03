import { useState } from "react";
import type {CreateSubjectRequest, CreateSubjectResponse} from "../../types/subject.ts";

interface Props {
    onCreate: (data: CreateSubjectRequest) => Promise<CreateSubjectResponse>;
}

export function SubjectCreateForm({ onCreate }: Props) {
    const [name, setName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [totalChapters, setTotalChapters] = useState(1);
    const [message, setMessage] = useState<string | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const handleSubmit = async () => {
        if (!name.trim() || !subjectCode.trim()) {
            showMessage('Vui lòng điền đầy đủ tên và mã môn học!');
            return;
        }

        const res = await onCreate({ name, subjectCode, totalChapters });
        showMessage(res.message || 'Thêm thành công!');

        setName('');
        setSubjectCode('');
        setTotalChapters(1);
    };

    return (
        <div style={{ marginBottom: 20, padding: 15, border: '1px solid #ddd', borderRadius: 5 }}>
            <h3>➕ Thêm môn học</h3>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                <input
                    placeholder="Tên môn học"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ flex: 1, minWidth: 150, padding: 8 }}
                />

                <input
                    placeholder="Mã môn học"
                    value={subjectCode}
                    onChange={e => setSubjectCode(e.target.value)}
                    style={{ flex: 1, minWidth: 150, padding: 8 }}
                />

                <input
                    type="number"
                    min={1}
                    placeholder="Số chương"
                    value={totalChapters}
                    onChange={e => setTotalChapters(Number(e.target.value))}
                    style={{ width: 120, padding: 8 }}
                />

                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                    }}
                >
                    Thêm
                </button>
            </div>

            {message && (
                <p style={{
                    margin: 0,
                    padding: 8,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 4,
                    color: '#333'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}