import { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

import RegisterUserPage from './RegisterUserPage';
import SubjectPage from '../Admin/SubjectPage.tsx';

type AdminAction =
    | 'REGISTER_USER'
    | 'ADD_SUBJECT'
    | 'ADD_QUESTION';

export default function AdminPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [action, setAction] = useState<AdminAction>('REGISTER_USER');

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <div style={{ padding: 24 }}>
            {/* Header */}
            <header
                style={{
                    marginBottom: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div>
                    <h1>🎓 Admin Panel</h1>
                    <p>
                        Xin chào, <strong>{user?.fullName}</strong>
                    </p>
                </div>

                <button onClick={handleLogout}>
                    🚪 Logout
                </button>
            </header>

            {/* Action selector */}
            <div style={{ marginBottom: 24 }}>
                <button onClick={() => setAction('REGISTER_USER')}>
                    ➕ Thêm sinh viên
                </button>

                <button onClick={() => setAction('ADD_SUBJECT')}>
                    📚 Thêm môn học
                </button>

                <button onClick={() => setAction('ADD_QUESTION')}>
                    ❓ Thêm câu hỏi
                </button>
            </div>

            {/* Content */}
            <main>
                {action === 'REGISTER_USER' && <RegisterUserPage />}
                {action === 'ADD_SUBJECT' && <SubjectPage />}
            </main>
        </div>
    );
}
