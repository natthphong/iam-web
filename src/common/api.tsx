import axios, { Method } from 'axios';
import store from '../redux/store';
import { clearAuth, setAuth } from '../redux/authSlice';


const iamUrl = import.meta.env.VITE_IAM_URL;
const prefix = import.meta.env.VITE_IAM_PREFIX;

interface ApiRequestOptions {
    body?: any;
    headers?: Record<string, any>;
    refreshToken?: string;
    accessToken?: string;
}

export const apiRequest = async (
    endpoint: string,
    method: Method,
    options?: ApiRequestOptions
) => {
    const { body, headers } = options || {};
    const url = `${iamUrl}${prefix}${endpoint}`;
    const { auth } = store.getState();

    console.log(url)
    const authHeader = auth.accessToken
        ? { Authorization: `Bearer ${auth.accessToken}` }
        : {};

    try {
        // Attempt original API request
        const response = await axios({
            url: url,
            method,
            data: body,
            headers: {
                ...headers,
                ...authHeader,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            try {
                const refreshResponse = await axios.post(
                    `${iamUrl}${prefix}/auth/refreshToken`,
                    { refreshToken: auth.refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const { code, body } = refreshResponse.data;

                if (code === '000') {
                    console.log("hello")
                    store.dispatch(
                        setAuth({
                            accessToken: body.accessToken,
                            refreshToken: body.refreshToken,
                            jwtBody: body.jwtBody,
                        })
                    );

                    const retryResponse = await axios({
                        url: url,
                        method,
                        data: body,
                        headers: {
                            ...headers,
                            Authorization: `Bearer ${body.accessToken}`,
                        },
                    });
                    return retryResponse.data;
                } else {
                    handleLogout();
                }
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                handleLogout();
            }
        } else {
            // Other errors
            throw error;
        }
    }
};


export const handleLogout = () => {
    store.dispatch(clearAuth());
    throw new Error('logout');
};

