import { useAuth } from '../../hooks/auth/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { FiLogOut, FiUser } from 'react-icons/fi';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout().then(() => navigate('/login'));
    }

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.logo}>🎓 Hệ thống thi trực tuyến</h1>
                <div className={styles.userBox}>
                    <FiUser />
                    <span>{user?.fullName}</span>
                    <button className={styles.logout} onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className={styles.main}>
                <div className={styles.card}>
                    <h2>Xin chào 👋</h2>
                    <p>
                        <strong>{user?.fullName}</strong>, chào mừng bạn đến với hệ thống thi trực tuyến.
                    </p>

                    <div className={styles.hint}>
                        📌 Hiện tại bạn có thể:
                        <ul>
                            <li>Xem danh sách bài thi</li>
                            <li>Tham gia làm bài thi</li>
                            <li>Xem kết quả sau khi thi</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
