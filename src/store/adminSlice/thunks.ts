import { createAsyncThunk } from '@reduxjs/toolkit';

import { client } from 'api';
import { Routes, Slice } from 'types';

export const addNewAccount = createAsyncThunk(
  `${Slice.Admin}/users`,
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
