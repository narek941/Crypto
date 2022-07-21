import { createAsyncThunk } from '@reduxjs/toolkit';

import { client } from 'api';
import { Routes, Slice } from 'types';

export const signIn = createAsyncThunk(
  `${Slice.Auth}/signIn`,
  async (
    credentials: { email: string; password: string; rememberMe?: boolean; navigate: any },
    thunkAPI,
  ) => {
    const { navigate, rememberMe, ...restCredentials } = credentials;

    try {
      const response = await client.post('auth/login', restCredentials);
      if (rememberMe) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('role', response.data.role);
      } else {
        sessionStorage.setItem('accessToken', response.data.token);
        sessionStorage.setItem('role', response.data.role);
      }
      navigate(Routes.Dashboard);

      return {
        accessToken: response.data.token,
        role: response.data.role,
        twoFactorAuthEnabled: response.data.twoFactorAuthEnabled,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect email or password' });
    }
  },
);

export const signOut = createAsyncThunk(
  `${Slice.Auth}/signOut`,
  async (navigate: any, thunkAPI) => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('role');
      navigate(Routes.Login);
    } catch (error) {
      const { message } = error as Error;

      return thunkAPI.rejectWithValue({ error: message });
    }
  },
);