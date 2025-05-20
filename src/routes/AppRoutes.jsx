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
import Task from '../pages/User/Task';
import Calendar from '../pages/User/Calendar';


import ManagerTask from '../pages/Manager/ManagerTask';
import ManagerCalendar from '../pages/Manager/Calendar';

import AdminTask from '../pages/Admin/AdminTask';
import Analystics from '../pages/Admin/Analystics';
import AdminCalendar from '../pages/Admin/Calendar';





const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Admin */}
            <Route path="/admin" element={
                <PrivateRoute role="admin">
                    <AdminLayout />
                </PrivateRoute>
            }>
                <Route index element={<AdminDashboard />} />
                <Route path="manageroles" element={<Roles />} />
                <Route path='tasks' element={<AdminTask />} />
                <Route path='calendar' element={<AdminCalendar />} />
                <Route path='analytics' element={<Analystics />} />
            </Route>

            {/* Manager */}
            <Route path="/manager" element={
                <PrivateRoute role="manager">
                    <ManagerLayout />
                </PrivateRoute>
            }>
                <Route index element={<ManagerDashboard />} />
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
                <Route path='tasks' element={<Task />} />
                <Route path='calendar' element={<Calendar />} />
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