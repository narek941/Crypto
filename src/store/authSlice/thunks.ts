import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { client } from 'api';
import { Slice } from 'types';
import { errorConverter } from 'utils/errorConverter';

export const signIn = createAsyncThunk(
  `${Slice.Auth}/signIn`,
  async (credentials: { email: string; password: string; rememberMe?: boolean }, thunkAPI) => {
    const { rememberMe, ...restCredentials } = credentials;

    try {
      const response = await client.post('auth/login', restCredentials);
      if (rememberMe) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('role', response.data.role);
      } else {
        sessionStorage.setItem('accessToken', response.data.token);
        sessionStorage.setItem('role', response.data.role);
      }

      return {
        accessToken: response.data.token,
        role: response.data.role,
        twoFactorAuthEnabled: response.data.twoFactorAuthEnabled,
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      return thunkAPI.rejectWithValue({
        error: errorConverter(err.response?.data?.message),
      });
    }
  },
);

export const signOut = createAsyncThunk(`${Slice.Auth}/signOut`, async (_, thunkAPI) => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('role');
  } catch (error) {
    const { message } = error as Error;

    return thunkAPI.rejectWithValue({ error: message });
  }
});

export const setDarkTheme = createAction('auth/setDarkTheme');
export const setLightTheme = createAction('auth/setLightTheme');
export const setTheme = createAction('auth/setTheme');
