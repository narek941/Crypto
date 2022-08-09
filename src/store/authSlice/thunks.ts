import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authApi } from 'api';
import { Slice } from 'types';
import { errorConverter } from 'utils/errorConverter';
import { BrowserStorageKeys, BrowserStorageService } from 'services';

export const signIn = createAsyncThunk(
  `${Slice.Auth}/signIn`,
  async (credentials: { email: string; password: string; rememberMe?: boolean }, thunkAPI) => {
    const { rememberMe, ...restCredentials } = credentials;

    try {
      const response = await authApi.signInRequest(restCredentials);

      BrowserStorageService.set(BrowserStorageKeys.AccessToken, response.data.token, {
        session: !rememberMe,
      });
      BrowserStorageService.set(BrowserStorageKeys.Role, response.data.role, {
        session: !rememberMe,
      });

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
    BrowserStorageService.remove(BrowserStorageKeys.AccessToken);
    BrowserStorageService.remove(BrowserStorageKeys.Role);
    BrowserStorageService.remove(BrowserStorageKeys.AccessToken, {
      session: true,
    });
    BrowserStorageService.remove(BrowserStorageKeys.Role, {
      session: true,
    });
  } catch (error) {
    const { message } = error as Error;

    return thunkAPI.rejectWithValue({ error: message });
  }
});

export const setDarkTheme = createAction('auth/setDarkTheme');
export const setLightTheme = createAction('auth/setLightTheme');
export const setTheme = createAction('auth/setTheme');
export const setLang = createAction('auth/setLang');
