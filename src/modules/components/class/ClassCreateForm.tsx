import { useEffect, useState } from 'react';
import type { CreateClassRequest } from '../../types/class.ts';
import type { Subject } from '../../types/subject.ts';
import { subjectApi } from '../../api/subject/subjectApi.ts';
import * as React from "react";

interface Props {
    onCreate: (data: CreateClassRequest) => Promise<{
        success: boolean;
        message: string;
    }>;
}

export function ClassCreateForm({ onCreate }: Props) {
    const [form, setForm] = useState<CreateClassRequest>({
        name: '',
        subjectId: 0,
        teacherId: 0,
    });

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loadingSubjects, setLoadingSubjects] = useState(true);

    /* ===== Load subjects ===== */
    useEffect(() => {
        subjectApi.getAll().then(data => {
            setSubjects(data);
            setLoadingSubjects(false);
        });
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]:
                name === 'name' ? value : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.subjectId) {
            alert('Vui lòng chọn môn học');
            return;
        }

        const res = await onCreate(form);
        alert(res.message);

        if (res.success) {
            setForm({
                name: '',
                subjectId: 0,
                teacherId: 0,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>➕ Tạo lớp học</h3>

            {/* Class name */}
            <input
                name="name"
                placeholder="Tên lớp"
                value={form.name}
                onChange={handleChange}
                required
            />

            {/* Subject select */}
            <select
                name="subjectId"
                value={form.subjectId}
                onChange={handleChange}
                disabled={loadingSubjects}
                required
            >
                <option value={0}>
                    -- Chọn môn học --
                </option>

                {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                        {s.subjectCode} - {s.name}
                    </option>
                ))}
            </select>

            {/* Teacher ID (giữ tạm, sau này nâng cấp select) */}
            <input
                name="teacherId"
                type="number"
                placeholder="Teacher ID"
                value={form.teacherId}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Tạo lớp
            </button>
        </form>
    );
}
