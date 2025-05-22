// import React from 'react'
// import Sidebar from '../components/common/Sidebar'
// import { Outlet } from 'react-router-dom'
// import { Box } from '@mui/material';

// import { useAuth } from '../context/AuthContext';

// const ManagerLayout = () => {
//     const { user } = useAuth(); 

//     if (!user || user.role !== 'manager') {
//         return (
//             <div className="flex items-center justify-center min-h-[100vh]">
//                 <span className="text-3xl font-semibold text-gray-700">
//                     403 Forbidden
//                 </span>
//             </div>
//         );
//     }

//     return (
//         <Box sx={{ display: 'flex', height: '100vh',position: 'relative' }}>
//             <Sidebar role={user.role} />
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     padding: '16px',
//                     backgroundColor: '#f9fafb',
//                     overflowY: 'auto',
                   
                    
//                 }}
//             >
//                 <Outlet />
//             </Box>
//         </Box>
//     )
// }

// export default ManagerLayout



import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ManagerLayout = () => {
    const { user } = useAuth(); 

    if (!user || user.role !== 'manager') {
        return (
            <div className="flex items-center justify-center min-h-[100vh]">
                <span className="text-3xl font-semibold text-gray-700">
                    403 Forbidden
                </span>
            </div>
        );
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
            <Sidebar role={user.role} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    overflowY: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    marginLeft: { xs: '60px', md: 0 }, 
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default ManagerLayout