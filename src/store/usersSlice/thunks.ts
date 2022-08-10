import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { client } from 'api';
import { Slice } from 'types';
import { parseAddUserError } from 'utils/errorConverter';

export const addNewUser = createAsyncThunk(
  `${Slice.Users}/users`,
  async (
    credentials: {
      name: string;
      email: string;
      accountType: string;
      password: string;
      deviceToken: string;
    },
    thunkAPI,
  ) => {
    const newUser = {
      ...credentials,
      username: credentials.name,
      role: credentials.accountType,
    };

    try {
      const response = await client.post('/users', newUser);

      return {
        accessToken: response.data.token,
      };
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({ error: parseAddUserError(error.response?.data.message) });
    }
  },
);

export const userInfoRequest = createAsyncThunk<any, any, { rejectValue: any }>(
  `${Slice.Users}/me`,
  async (data: any, thunkAPI) => {
    try {
      const response = await client.get('/users/me');
      return { personalInfo: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: 'get user info request failed',
      });
    }
  },
);
