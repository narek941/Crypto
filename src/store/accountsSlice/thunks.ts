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

export const getAccountsAnalytics = createAsyncThunk(
  `${Slice.Accounts}/accounts-analytics`,
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

export const getCoins = createAsyncThunk(
  `${Slice.Accounts}/accounts/coins`,
  async (_, thunkAPI) => {
    try {
      const response = await client.get('/admin/exchange/1/supported-cryptocurrencies');

      return {
        coins: response.data.list,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const accountsFilterUpdate = createAction<Partial<IFilter>>('accountsFilter');

export const removeAccountById = createAction('removeAccountByID');
