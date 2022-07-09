import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { client } from 'api';

import { reducerName } from './constants';

export const signIn = createAsyncThunk(
  `${reducerName}/signIn`,
  async (credentials: { email: string; password: string; navigate: any }, thunkAPI) => {
    const { navigate, ...restCredentials } = credentials;

    try {
      const response = await client.post('auth/login', restCredentials);

      localStorage.setItem('accessToken', response.data.token);
      navigate('/dashboard');

      return {
        accessToken: response.data.accessToken,
      };
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);

      return thunkAPI.rejectWithValue({ error: message });
    }
  },
);

export const signOut = createAsyncThunk(`${reducerName}/signOut`, async (_, thunkAPI) => {
  try {
    const response = await client.delete('auth/logOut');

    return response.data;
  } catch (error) {
    const { message } = error as Error;

    return thunkAPI.rejectWithValue({ error: message });
  }
});
