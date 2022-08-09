import { createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
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
      role: credentials.accountType,
    };

    try {
      const response = await usersApi.addNewUserRequest(newUser);

      return {
        accessToken: response.data.token,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: 'You can not add users' });
    }
  },
);
