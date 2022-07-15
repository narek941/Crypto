import { createAsyncThunk } from '@reduxjs/toolkit';

import { client } from 'api';
import { Slice } from 'types';

export const getUsers = createAsyncThunk(`${Slice.Users}/me`, async (credentials, thunkAPI) => {
  try {
    const response = await client.get('users/me', credentials);

    return response.data;
  } catch {
    return thunkAPI.rejectWithValue({ error: '* Incorrect' });
  }
});
