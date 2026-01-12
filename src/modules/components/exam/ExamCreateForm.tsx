import { useState } from 'react';
import type { CreateExamRequest } from '../../types/exam.ts';
import * as React from "react";

interface Props {
    onCreate: (data: CreateExamRequest) => Promise<{
        success: boolean;
        message: string;
    }>;
}

export function ExamCreateForm({ onCreate }: Props) {
    const [form, setForm] = useState<CreateExamRequest>({
        name: '',
        classId: 0,
        blueprintId: 0,
        durationMinutes: 30,
        startTime: '',
        endTime: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]:
                name === 'name'
                    ? value
                    : Number.isNaN(Number(value))
                        ? value
                        : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const res = await onCreate(form);

        setMessage(res.message);
        setLoading(false);

        if (res.success) {
            setForm({
                name: '',
                classId: 0,
                blueprintId: 0,
                durationMinutes: 30,
                startTime: '',
                endTime: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>➕ Tạo bài thi</h3>

            <input
                name="name"
                placeholder="Tên bài thi"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                name="classId"
                type="number"
                placeholder="Class ID"
                value={form.classId}
                onChange={handleChange}
                required
            />

            <input
                name="blueprintId"
                type="number"
                placeholder="Blueprint ID"
                value={form.blueprintId}
                onChange={handleChange}
                required
            />

            <input
                name="durationMinutes"
                type="number"
                placeholder="Thời gian (phút)"
                value={form.durationMinutes}
                onChange={handleChange}
                required
            />

            <label>Start time</label>
            <input
                name="startTime"
                type="datetime-local"
                value={form.startTime}
                onChange={handleChange}
                required
            />

            <label>End time</label>
            <input
                name="endTime"
                type="datetime-local"
                value={form.endTime}
                onChange={handleChange}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? 'Đang tạo...' : 'Tạo bài thi'}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
}