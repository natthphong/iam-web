import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../common/api';
import { setAuth } from '../../redux/authSlice';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await apiRequest(`/auth/login`, 'POST', {
                body: { username, password, appCode: 'GIAM' },
            });

            const { accessToken, refreshToken, jwtBody } = response.body;

            dispatch(
                setAuth({
                    accessToken,
                    refreshToken,
                    jwtBody,
                })
            );

            // Navigate to Role Management Page
            navigate('/role-manage');
        } catch (err) {
            console.error(err);
            setError('Login failed: Invalid username or password.');
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-5 border rounded">
            <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;
