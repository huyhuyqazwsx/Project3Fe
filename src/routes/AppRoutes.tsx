import { Routes, Route } from 'react-router-dom';
import Login from "../modules/pages/Login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import RoleRedirect from "./RoleRedirect.tsx";
import AdminPage from "../modules/pages/Admin/AdminPage.tsx";
import Dashboard from "../modules/pages/Student/Dashboard.tsx";
import StudentExamsPage from "../modules/components/class/StudentExamsPage.tsx";
import StudentResultsPage from "../modules/components/class/StudentResultsPage.tsx";
import StudentClassesPage from "../modules/components/class/StudentClassesPage.tsx";
import StudentClassExamsPage from "../modules/pages/Class/StudentClassExamsPage.tsx";

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

            <Route
                path="/student/exams"
                element={
                    <ProtectedRoute>
                        <StudentExamsPage />
                    </ProtectedRoute>
                }
            />

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
