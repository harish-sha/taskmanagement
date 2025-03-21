// import { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     const login = ({ username, role }) => {
//         setUser({ username, role });
//         if (role === 'admin') navigate('/admin');
//         else if (role === 'manager') navigate('/manager');
//         else if (role === 'user') navigate('/user');
//     };

//     const logout = () => {
//         setUser(null);
//         navigate('/');
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Dummy credentials
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'manager', password: 'manager123', role: 'manager' },
    { username: 'user', password: 'user123', role: 'user' }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = ({ username, password }) => {
        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        );

        if (foundUser) {
            setUser({ username: foundUser.username, role: foundUser.role });
            if (foundUser.role === 'admin') navigate('/admin');
            else if (foundUser.role === 'manager') navigate('/manager');
            else navigate('/user');
        } else {
            alert('Invalid username or password');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);