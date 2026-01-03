import { Routes, Route } from 'react-router-dom';
import Login from "../modules/pages/Login/Login.tsx";
import Dashboard from "../modules/pages/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import RoleRedirect from "./RoleRedirect.tsx";
import AdminPage from "../modules/pages/Admin/AdminPage.tsx";

export default function AppRoutes() {
    return (
        <><Routes>
            <Route path="/login" element={<Login/>}/>\

            {/* PRIVATE ROUTE */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <RoleRedirect />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                }
            />


        </Routes></>
    );
}
