import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UserLayout = () => {

    const { user } = useAuth(); 

    if (!user || user.role !== 'user') {
        return (
            <div className="flex items-center justify-center min-h-[100vh]">
                <span className="text-3xl font-semibold text-gray-700">
                    403 Forbidden
                </span>
            </div>
        );
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar role={user.role} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: '16px',
                     ml: { xs: '48px', sm: 0 },
                    backgroundColor: '#f9fafb',
                    overflowY: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default UserLayout