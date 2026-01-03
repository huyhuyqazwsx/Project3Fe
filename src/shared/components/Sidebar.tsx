import { useAuth } from '../../modules/hooks/auth/useAuth.ts';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    FileText,
    ClipboardList,
    Settings,
    GraduationCap
} from 'lucide-react';

interface MenuItem {
    label: string;
    path: string;
    icon: any;
    roles: string[];
}

const menuItems: MenuItem[] = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
        roles: ['ADMIN', 'TEACHER', 'STUDENT']
    },
    {
        label: 'Môn học',
        path: '/subjects',
        icon: BookOpen,
        roles: ['ADMIN', 'TEACHER']
    },
    {
        label: 'Lớp học',
        path: '/classes',
        icon: GraduationCap,
        roles: ['ADMIN', 'TEACHER', 'STUDENT']
    },
    {
        label: 'Đề thi',
        path: '/exams',
        icon: FileText,
        roles: ['ADMIN', 'TEACHER']
    },
    {
        label: 'Bài thi của tôi',
        path: '/my-exams',
        icon: ClipboardList,
        roles: ['STUDENT']
    },
    {
        label: 'Người dùng',
        path: '/users',
        icon: Users,
        roles: ['ADMIN']
    },
    {
        label: 'Cài đặt',
        path: '/settings',
        icon: Settings,
        roles: ['ADMIN', 'TEACHER', 'STUDENT']
    }
];

export default function Sidebar() {
    const { user } = useAuth();
    const location = useLocation();

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.includes(user?.role || '')
    );

    return (
        <aside className="bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto">
            <nav className="p-4 space-y-1">
                {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}