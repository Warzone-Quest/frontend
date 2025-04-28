import axios from 'axios';
import { ENV_CONFIG } from '@/config/envConfig';

const axiosInstance = axios.create({
  baseURL: ENV_CONFIG.API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    const excludedRoutes = ['/auth/login', '/auth/signup'];

    if (token != undefined && token != null && token != "" && !excludedRoutes.some((route) => config.url?.includes(route))) {
      config.headers['user-jwt-token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
