import { createAsyncThunk } from '@reduxjs/toolkit';

import { client } from 'api';
import { Routes, Slice } from 'types';

export const signIn = createAsyncThunk(
  `${Slice.Auth}/signIn`,
  async (credentials: { email: string; password: string; navigate: any }, thunkAPI) => {
    const { navigate, ...restCredentials } = credentials;

    try {
      const response = await client.post('auth/login', restCredentials);

      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('role', response.data.role);
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
      navigate(Routes.Login);
    } catch (error) {
      const { message } = error as Error;

      return thunkAPI.rejectWithValue({ error: message });
    }
  },
);

export const addNewUser = createAsyncThunk(
  `${Slice.Auth}/users`,
  async (
    credentials: { email: string; password: string; deviceToken: string; navigate: any },
    thunkAPI,
  ) => {
    const { navigate, ...restCredentials } = credentials;

    try {
      const response = await client.post('/users', restCredentials);

      navigate(Routes.Users);

      return {
        accessToken: response.data.token,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: 'You can not add user' });
    }
  },
);
