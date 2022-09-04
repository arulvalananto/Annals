import axios from 'axios';

const instance = axios.create({
    baseURL:
        process.env.REACT_APP_ENV === 'development'
            ? process.env.REACT_APP_DEVELOPMENT_URL
            : process.env.REACT_APP_PRODUCTION_URL,
    withCredentials: true,
    timeout: 25000,
    timeoutErrorMessage: 'Server Down',
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    const secret = sessionStorage.getItem('verified');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.headers['x-auth-secret'] = secret ? `Bearer ${secret}` : '';
    return config;
});

export default instance;
