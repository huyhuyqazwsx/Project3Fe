import { useState } from 'react';
import { useAuth } from "../../../hooks/auth/useAuth.ts";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import styles from './Login.module.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        try {
            setLoading(true);
            await login({ email, password });
            navigate('/', { replace: true });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Đăng nhập thất bại');
            } else {
                setError('Đã xảy ra lỗi không xác định');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    <FiLogIn /> Đăng nhập hệ thống thi
                </h1>

                <div className={styles.field}>
                    <FiMail className={styles.icon} />
                    <input
                        className={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <FiLock className={styles.icon} />
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles.options}>
                    <label className={styles.remember}>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                        />
                        Ghi nhớ đăng nhập
                    </label>

                    <Link to="/forgot-password" className={styles.forgot}>
                        Quên mật khẩu?
                    </Link>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button
                    className={styles.button}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                <p className={styles.footer}>
                    © 2025 Hệ thống thi trực tuyến
                </p>
            </div>
        </div>
    );
}
