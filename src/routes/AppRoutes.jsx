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
            </Route>

            {/* Manager */}
            <Route path="/manager" element={
                <PrivateRoute role="manager">
                    <ManagerLayout />
                </PrivateRoute>
            }>
                <Route index element={<ManagerDashboard />} />
            </Route>

            {/* User */}
            <Route path="/user" element={
                <PrivateRoute role="user">
                    <UserLayout />
                </PrivateRoute>
            }>
                <Route index element={<UserDashboards />} />
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