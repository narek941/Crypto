import axios from 'axios';

const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

const withTokenOptions = {
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const clientWithToken = axios.create(withTokenOptions) as any;

export default clientWithToken;
