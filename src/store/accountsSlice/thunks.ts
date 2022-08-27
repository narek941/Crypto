import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { accountsApi } from 'api';

import { ITableFilter } from './../../types/api/index';

export const getAccountList = createAsyncThunk(
  `${Slice.Accounts}/accounts`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      filter: any;
    },
    thunkAPI,
  ) => {
    try {
      const response = await accountsApi.accountListRequest(credentials);

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
      const response = await accountsApi.accountByIdRequest(userID);

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
      const response = await accountsApi.accountSummaryRequest(id);

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
      const response = await accountsApi.accountTradesListRequest(id, restCredentials);

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
      const response = await accountsApi.accountAlertsRequest(id, restCredentials);

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountAssetsChartData = createAsyncThunk(
  `${Slice.Accounts}/accounts/id/assets-chart-data`,
  async (id: number, thunkAPI) => {
    try {
      const response = await accountsApi.accountAssetChartRequest(id);

      return {
        chart: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);
export const getAccountTradingPairsChartData = createAsyncThunk(
  `${Slice.Accounts}/accounts/id/trading-pairs-chart-data`,
  async (id: number, thunkAPI) => {
    try {
      const response = await accountsApi.accountTradingPairsChartRequest(id);

      return {
        chart: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountCapitalChartData = createAsyncThunk(
  `${Slice.Accounts}/accounts/:id/daily-account-statistics`,
  async (id: number, thunkAPI) => {
    try {
      const response = await accountsApi.accountCapitalChartRequest(id);

      return {
        chart: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAccountPerformanceChartData = createAsyncThunk(
  `${Slice.Accounts}/accounts/:id/daily-wallets-statistics`,
  async (id: number, thunkAPI) => {
    try {
      const response = await accountsApi.accountPerformanceChartRequest(id);

      return {
        chart: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getAllAccounts = createAsyncThunk(`${Slice.Accounts}/list`, async (_, thunkAPI) => {
  try {
    const response = await accountsApi.getAllAccountsRequest();

    return {
      list: response.data,
    };
  } catch {
    return thunkAPI.rejectWithValue({ error: '* Incorrect' });
  }
});

export const accountsFilterUpdate = createAction<Partial<ITableFilter>>('accountsFilter');

export const accountsFilterClear = createAction<Partial<ITableFilter>>('accountsFilterClear');

export const accountsTradesFilterUpdate =
  createAction<Partial<ITableFilter>>('accountsTradesFilter');

export const accountsAlertsFilterUpdate = createAction<Partial<ITableFilter>>(
  'accountsAlertsFilterUpdate',
);

export const accountsTradesFilterClear = createAction<Partial<ITableFilter>>(
  'accountsTradesFilterClear',
);

export const accountsAlertsFilterClear = createAction<Partial<ITableFilter>>(
  'accountsAlertsFilterClear',
);

export const removeAccountById = createAction('removeAccountByID');
