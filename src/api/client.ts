import axios from 'axios';

import store from 'store';
import { authActions } from 'store/authSlice';
import { BrowserStorageService, BrowserStorageKeys } from 'services';

const initialConfig = {
  baseURL: process.env.REACT_APP_API_URL,
};

const client = axios.create(initialConfig) as any;

client.interceptors.request.use((config: any) => {
  const token =
    BrowserStorageService.get(BrowserStorageKeys.AccessToken) ||
    BrowserStorageService.get(BrowserStorageKeys.AccessToken, { session: true });

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
    const token =
      BrowserStorageService.get(BrowserStorageKeys.AccessToken) ||
      BrowserStorageService.get(BrowserStorageKeys.AccessToken, { session: true });

    if (token) {
      if (error.response?.status === 401) {
        store.dispatch(authActions.signOut());
      }
      if (error.response?.status === 403) {
        store.dispatch(authActions.userInfoRequest({}));
      }
    }

    return Promise.reject(error);
  },
);

export default client;
