import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { FiLogOut, FiUser, FiBook, FiEdit3, FiBarChart2 } from 'react-icons/fi';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <div className={styles.wrapper}>
            {/* ===== Header ===== */}
            <header className={styles.header}>
                <h1 className={styles.logo}>🎓 Hệ thống thi trực tuyến</h1>

                <div className={styles.userBox}>
                    <FiUser />
                    <span>{user?.fullName}</span>

                    <button
                        className={styles.logout}
                        onClick={handleLogout}
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </header>

            {/* ===== Main ===== */}
            <main className={styles.main}>
                {/* Actions - 1 hàng ngang */}
                <div className={styles.actionsRow}>
                    <div
                        className={styles.actionCard}
                        onClick={() => navigate('/student/classes')}
                    >
                        <FiBook size={28} />
                        <h3>Lớp học của tôi</h3>
                        <p>Xem các lớp bạn đang tham gia</p>
                    </div>

                    <div
                        className={styles.actionCard}
                        onClick={() => navigate('/student/exams')}
                    >
                        <FiEdit3 size={28} />
                        <h3>Bài thi</h3>
                        <p>Xem và tham gia các bài thi</p>
                    </div>

                    <div
                        className={styles.actionCard}
                        onClick={() => navigate('/student/results')}
                    >
                        <FiBarChart2 size={28} />
                        <h3>Kết quả</h3>
                        <p>Xem kết quả các bài thi đã làm</p>
                    </div>
                </div>

                {/* Welcome / Info ở dưới */}
                <div className={styles.card}>
                    <h2>Xin chào 👋</h2>
                    <p>
                        <strong>{user?.fullName}</strong>, chào mừng bạn đến với hệ thống thi trực tuyến.
                    </p>

                    <p className={styles.subText}>
                        📌 Bạn có thể xem lớp học, tham gia bài thi và theo dõi kết quả học tập của mình tại đây.
                    </p>
                </div>
            </main>
        </div>
    );
}
