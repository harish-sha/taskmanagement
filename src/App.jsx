import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalToaster from './components/common/GlobalToaster'
import Login from './login/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import ManagerDashboard from './pages/ManagerDashboard';
// import UserDashboard from './pages/UserDashboard';
import { AuthProvider } from './context/AuthContext';
import Dummy from './dummy/Dummy';
import TaskBoardPage from './pages/TaskBoardPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import UserDashboard from './pages/User/UserDashboard';


const App = () => {
  return (
    <AuthProvider>
      <GlobalToaster />
      <Routes>

        <Route path="/" element={<Login />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Manager */}
        <Route path="/manager" element={<ManagerDashboard />} />

        {/* User */}
        <Route path="/user" element={<UserDashboard />} />
        
        <Route path="/tasks" element={<TaskBoardPage />} />
        <Route path="/dummy" element={<Dummy />} />


        <Route path="*" element={
          <div className='flex items-center justify-center min-h-[100vh]'>
            <span className="text-3xl text-gray-700 font-semibold">
              404 Not Found
            </span>
          </div>
        }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App