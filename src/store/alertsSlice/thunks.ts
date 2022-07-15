import { createAsyncThunk } from '@reduxjs/toolkit';

import { clientWithToken } from 'api';
import { Slice } from 'types';

export const getAlertList = createAsyncThunk(
  `${Slice.Alerts}/alerts`,
  async (credentials: { skip: number; take: number; sort: string; order: string }, thunkAPI) => {
    try {
      const response = await clientWithToken.get('alerts', { params: { ...credentials } });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);
