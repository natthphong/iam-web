import axios, { Method } from 'axios';

const iamUrl = import.meta.env.VITE_IAM_URL;

interface ApiRequestOptions {
    body?: any;
    headers?: any;
}

export const apiRequest = async (
    endpoint: string,
    method: Method,
    options?: ApiRequestOptions
) => {
    const { body, headers } = options || {};
    const response = await axios({
        url: `${iamUrl}${endpoint}`,
        method,
        data: body,
        headers,
    });
    return response.data;
};
