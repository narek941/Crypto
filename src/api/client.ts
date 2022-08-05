import axios from 'axios';

import { Routes } from 'types';

const initialConfig = {
  baseURL: process.env.REACT_APP_API_URL,
};

const client = axios.create(initialConfig) as any;

client.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

  if (token) {
    config.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
      },
      config.headers,
    );
  }

  return config;
});

client.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('role');

      if (!window.location.href.includes(Routes.Login)) {
        window.location.href = Routes.Login;
      }
    }

    return Promise.reject(error);
  },
);

export default client;
