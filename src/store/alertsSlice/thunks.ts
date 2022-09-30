import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { alertsApi } from 'api';
import { Slice } from 'types';
import { ITableFilter } from 'types/api';

export const getAlertList = createAsyncThunk(
  `${Slice.Alerts}`,
  async (
    credentials: { skip: number; take: number; sort: string; order: string; filter: ITableFilter },
    thunkAPI,
  ) => {
    try {
      const response = await alertsApi.alertListRequest(credentials);

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAlertsFilterValue = createAsyncThunk(
  `${Slice.Alerts}/filter`,
  async (_, thunkAPI) => {
    try {
      const response = await alertsApi.alertsFilterValuesRequest();

      return {
        data: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const alertsFilterUpdate = createAction<Partial<ITableFilter>>('alertsFilter');

export const alertsFilterClear = createAction<Partial<ITableFilter>>('alertsFilterClear');
