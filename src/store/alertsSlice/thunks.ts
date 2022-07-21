import { createAsyncThunk } from '@reduxjs/toolkit';

import { client } from 'api';
import { Slice } from 'types';

export const getAlertList = createAsyncThunk(
  `${Slice.Alerts}`,
  async (credentials: { skip: number; take: number; sort: string; order: string }, thunkAPI) => {
    try {
      const response = await client.get('alerts', { params: { ...credentials } });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);