import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ManagerLayout from '../layouts/ManagerLayout';
import ManagerDashboard from '../pages/Manager/ManagerDashboard';
import UserLayout from '../layouts/UserLayout';
import UserDashboards from '../pages/User/UserDashboards';
import Roles from '../pages/Admin/Roles';
import Dummy from '../dummy/Dummy';
import PrivateRoute from '../auth/PrivateRoute';
import { useAuth } from '../context/AuthContext';
import Tasks from '../pages/Admin/Tasks';
import Calendar from '../pages/Admin/Calendar';
import Analytics from '../pages/Admin/Analytics';
import ManagerTask from '../pages/Manager/ManagerTask';
import ManagerCalendar from '../pages/Manager/ManagerCalendar';
import Task from '../pages/User/Task';
import UserCalendar from '../pages/User/UserCalendar';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Admin */}
            <Route path="/admin" element={
                <PrivateRoute role="admin">
                    <AdminLayout />
                </PrivateRoute>
            }>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manageroles" element={<Roles />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="analytics" element={<Analytics />} />
            </Route>

            {/* Manager */}
            <Route path="/manager" element={
                <PrivateRoute role="manager">
                    <ManagerLayout />
                </PrivateRoute>
            } >
                <Route index element={<ManagerDashboard />} />
                <Route path='dashboard' element={<ManagerDashboard />} />
                <Route path='tasks' element={<ManagerTask />} />
                <Route path='calendar' element={<ManagerCalendar />} />
            </Route>

            {/* User */}
            <Route path="/user" element={
                <PrivateRoute role="user">
                    <UserLayout />
                </PrivateRoute>
            }>
                <Route index element={<UserDashboards />} />
                  <Route path='dashboard' element={<UserDashboards />} />
                <Route path='tasks' element={<Task />} />
                <Route path='calendar' element={<UserCalendar />} />
            </Route>

            <Route path="/dummy" element={<Dummy />} />


            <Route
                path="*"
                element={
                    <div className="flex items-center justify-center min-h-[100vh]">
                        <span className="text-3xl font-semibold text-gray-700">
                            404 Not Found
                        </span>
                    </div>
                }
            />
        </Routes>
    )
}

export default AppRoutes