import { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth.ts';
import type { RegisterRequest } from '../../types/auth';
import * as React from "react";

export default function RegisterUserPage() {
    const { register } = useAuth();

    const [form, setForm] = useState<RegisterRequest>({
        mssv: '',
        fullName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        role: 'STUDENT',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await register(form);
            setSuccess('✅ Tạo tài khoản thành công');

            // reset form
            setForm({
                mssv: '',
                fullName: '',
                dateOfBirth: '',
                email: '',
                password: '',
                role: 'STUDENT',
            });
        } catch {
            setError('❌ Tạo tài khoản thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400 }}>
            <h2>➕ Tạo tài khoản người dùng</h2>

            <input
                name="mssv"
                placeholder="MSSV"
                value={form.mssv}
                onChange={handleChange}
            />

            <input
                name="fullName"
                placeholder="Họ tên"
                value={form.fullName}
                onChange={handleChange}
            />

            <input
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
            />

            <select
                name="role"
                value={form.role}
                onChange={handleChange}
            >
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
                <option value="ADMIN">ADMIN</option>
            </select>

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Đang tạo...' : 'Tạo tài khoản'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}
