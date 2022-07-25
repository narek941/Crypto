import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { client } from 'api';
import { IFilter } from 'types/api';

export const getAccountList = createAsyncThunk(
  `${Slice.Accounts}/accounts`,
  async (
    credentials: { skip: number; take: number; sort: string; order: string; search: string },
    thunkAPI,
  ) => {
    try {
      const response = await client.get('accounts', { params: { ...credentials } });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountById = createAsyncThunk(
  `${Slice.Accounts}/accounts/id`,
  async (userID: number, thunkAPI) => {
    try {
      const response = await client.get(`/accounts/${userID}`);

      return {
        account: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountSummary = createAsyncThunk(
  `${Slice.Accounts}/accounts/id/summary`,
  async (id: number, thunkAPI) => {
    try {
      const response = await client.get(`/accounts/${id}/summary`);

      return {
        summary: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountTradesList = createAsyncThunk(
  `${Slice.Accounts}/account-trades`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      id: string;
    },
    thunkAPI,
  ) => {
    const { id, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/accounts/${id}/trades-list`, {
        params: { ...restCredentials },
      });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountAlerts = createAsyncThunk(
  `${Slice.Accounts}/account-alerts`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      id: string;
    },
    thunkAPI,
  ) => {
    const { id, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/accounts/${id}/alerts`, {
        params: { ...restCredentials },
      });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const accountsFilterUpdate = createAction<Partial<IFilter>>('accountsFilter');
export const accountsTradesFilterUpdate = createAction<Partial<IFilter>>('accountsTradesFilter');
export const accountsAlertsFilterUpdate = createAction<Partial<IFilter>>(
  'accountsAlertsFilterUpdate',
);

export const removeAccountById = createAction('removeAccountByID');
