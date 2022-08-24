import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { parseAddUserError } from 'utils/errorConverter';
import { usersApi } from 'api';

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
    };

    try {
      const response = await usersApi.addNewUserRequest(newUser);

      return {
        accessToken: response.data.token,
      };
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({ error: parseAddUserError(error.response?.data.message) });
    }
  },
);
