import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />; 
    }

    if (user.role !== role) {
        return (
            <div className="flex items-center justify-center min-h-[100vh]">
                <span className="text-3xl font-semibold text-gray-700">
                    403 Forbidden
                </span>
            </div>
        );
    }

    console.log('User:', user, 'Required Role:', role); 

    return children;
};

export default PrivateRoute;