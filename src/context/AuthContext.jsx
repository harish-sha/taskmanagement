import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Stored User:', storedUser); 
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = ({ username, password }) => {
        const users = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'manager', password: 'manager123', role: 'manager' },
            { username: 'user', password: 'user123', role: 'user' }
        ];

        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        );


        if (foundUser) {
            const userData = { username: foundUser.username, role: foundUser.role, token: `${foundUser.username}-token` };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));

            if (foundUser.role === 'admin') navigate('/admin');
            else if (foundUser.role === 'manager') navigate('/manager');
            else navigate('/user');
        } else {
            alert('Invalid username or password');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[100vh]">
                <span className="text-2xl font-semibold text-gray-700">
                    <Loader />
                </span>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);