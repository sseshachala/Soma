// src/services/axiosService.js

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


const axiosInstance: AxiosInstance  = axios.create({
    baseURL: 'http://159.89.228.58:8000/api/v1/', // Replace with your API base URL
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
        // Add any headers you need for your requests
    },
});

// Add a function to set Bearer token
export const setAuthToken = (token: string | null) => {
    console.log('+++++++', token);
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Optional: Add interceptors for request/response handling
axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with successful response
        return response.data;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosInstance;
