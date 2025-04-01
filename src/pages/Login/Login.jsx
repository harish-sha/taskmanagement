import { useState } from 'react';
import InputField from '../../components/common/InputField'
import { useAuth } from '../../context/AuthContext';
import UniversalButton from '../../components/common/UniversalButton';

import toast from 'react-hot-toast';

const Login = () => {
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, password });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <InputField
                    label='Enter Username'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <InputField
                    id="password"
                    name="password"
                    label="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                <div className="flex items-center justify-center" >
                    <UniversalButton
                        label={loading ? "Logging in..." : "Login"}
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;