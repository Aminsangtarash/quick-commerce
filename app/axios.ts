
import axiosRoot from 'axios';

const axios = axiosRoot.create({
    baseURL: process.env.QC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.status === 401) {
        }
        if (error.response) {
        } else {
        }
        throw error
    }
);

export default axios;  