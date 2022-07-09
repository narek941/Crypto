import axios from 'axios';
// import * as cookie from 'cookie';
// import * as setCookie from 'set-cookie-parser';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';

const defaultOptions = {
  baseURL: process.env.REACT_APP_API_URL,
};

const client = axios.create(defaultOptions) as any;

export default client;
