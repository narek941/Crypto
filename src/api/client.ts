import axios from 'axios';

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

export default client;
