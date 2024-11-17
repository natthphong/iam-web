import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
import {clearAuth} from "../../redux/authSlice.tsx";
import {useNavigate} from "react-router-dom";
import {apiRequest} from "../../common/api.tsx";

const RoleManagePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { jwtBody, accessToken } = useSelector((state: RootState) => state.auth);
    const handleLogout = () => {
        dispatch(clearAuth());
        navigate('/');
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await apiRequest('/auth/me', 'GET');
                console.log('API Response:', response);
            } catch (error: any) {
                if (error.message === 'logout') {
                    // Handle logout navigation
                    dispatch(clearAuth());
                    navigate('/');
                } else {
                    console.error('API Error:', error);
                }
            }
        };

        fetchUserInfo();
    }, [accessToken, handleLogout]);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-5">Role Management</h1>
            <p><strong>User ID:</strong> {jwtBody?.userId}</p>
            <p><strong>Access Token:</strong> {accessToken}</p>
            <p><strong>Roles:</strong></p>
            <ul>
                {jwtBody?.roles.map((role: any, index: number) => (
                    <li key={`role  ${index}`}>
                        {role.roleNameTh} ({role.roleNameEn})
                        <ul>
                            {role.objects.map((o: string, objectIndex: number) => (
                                <li key={`Object ${objectIndex}`}>
                                    {o}
                                </li>
                            ))}
                        </ul>
                    </li>


                ))}
            </ul>
            <button
                className="mt-5 bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default RoleManagePage;
