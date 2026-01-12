import { Routes, Route } from 'react-router-dom';
import Login from "../modules/pages/Share/Login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import RoleRedirect from "./RoleRedirect.tsx";
import AdminPage from "../modules/pages/Admin/Dashboard/AdminPage.tsx";
import Dashboard from "../modules/pages/Student/Dashboard/Dashboard.tsx";
import StudentExamsPage from "../modules/pages/Student/Class/StudentExamsPage.tsx";
import StudentResultsPage from "../modules/pages/Student/exam/StudentResultsPage.tsx";
import StudentClassesPage from "../modules/pages/Student/Class/StudentClassesPage.tsx";
import StudentClassExamsPage from "../modules/pages/Student/Class/StudentClassExamsPage.tsx";
import StudentExamPage from "../modules/pages/Student/exam/StudentExamPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/* ================= PUBLIC ================= */}
            <Route path="/login" element={<Login />} />

            {/* ================= ROOT ================= */}
            {/* Sau login → redirect theo role */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <RoleRedirect />
                    </ProtectedRoute>
                }
            />

            {/* ================= STUDENT ================= */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/classes"
                element={
                    <ProtectedRoute>
                        <StudentClassesPage />
                    </ProtectedRoute>
                }
            />

            {/* ✅ Danh sách đề thi của 1 lớp */}
            <Route
                path="/student/classes/:classId/exams"
                element={
                    <ProtectedRoute>
                        <StudentClassExamsPage />
                    </ProtectedRoute>
                }
            />

            {/* ✅ Trang làm bài thi */}
            <Route
                path="/student/exams/:examId"
                element={
                    <ProtectedRoute>
                        <StudentExamPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/exams/:examId/take"
                element={
                    <ProtectedRoute>
                        <StudentExamPage />
                    </ProtectedRoute>
                }
            />

            {/* (giữ lại nếu bạn còn dùng) */}
            <Route
                path="/student/exams"
                element={
                    <ProtectedRoute>
                        <StudentExamsPage />
                    </ProtectedRoute>
                }
            />

            {/* ✅ Trang xem kết quả */}
            <Route
                path="/student/results/:examId"
                element={
                    <ProtectedRoute>
                        <StudentResultsPage />
                    </ProtectedRoute>
                }
            />

            {/* (giữ lại nếu còn dùng query string) */}
            <Route
                path="/student/results"
                element={
                    <ProtectedRoute>
                        <StudentResultsPage />
                    </ProtectedRoute>
                }
            />


            {/* ================= ADMIN ================= */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/classes/:classId"
                element={
                    <ProtectedRoute>
                        <StudentClassExamsPage />
                    </ProtectedRoute>
                }
            />

            {/* ================= FALLBACK ================= */}
            {/* Optional: route không tồn tại */}
            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <RoleRedirect />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
