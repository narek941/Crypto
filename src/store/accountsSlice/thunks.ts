import { createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { clientWithToken } from 'api';

export const getAccountList = createAsyncThunk(
  `${Slice.Accounts}/accounts`,
  async (credentials: { skip: number; take: number; sort: string; order: string }, thunkAPI) => {
    try {
      const response = await clientWithToken.get('accounts', { params: { ...credentials } });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);
