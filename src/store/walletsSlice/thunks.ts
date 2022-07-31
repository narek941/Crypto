import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { client } from 'api';
import { ITableFilter } from 'types/api';

export const getWalletOpenOrders = createAsyncThunk(
  `${Slice.Wallets}/open-orders`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      id: string;
      filter: any;
    },
    thunkAPI,
  ) => {
    const { id, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/wallets/${id}/orders/open`, {
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

export const getWalletOrderTrades = createAsyncThunk(
  `${Slice.Wallets}/trades`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      walletId: number;
      orderId: number;
      filter: any;
    },
    thunkAPI,
  ) => {
    const { orderId, walletId, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/wallets/${walletId}/orders/${orderId}/trades`, {
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

export const getWalletOrders = createAsyncThunk(
  `${Slice.Wallets}/orders`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      id: string;
      filter: any;
    },
    thunkAPI,
  ) => {
    const { id, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/wallets/${id}/orders`, {
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

export const getWalletInflow = createAsyncThunk(
  `${Slice.Wallets}/inflow`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      walletId: number;
      filter: any;
    },
    thunkAPI,
  ) => {
    const { walletId, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/wallets/${walletId}/inflow-outflow`, {
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

export const getWalletSummary = createAsyncThunk(
  `${Slice.Wallets}/summary`,
  async (walletId: number, thunkAPI) => {
    try {
      const response = await client.get(`/wallets/${walletId}/summary`);

      return {
        list: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getWalletRecords = createAsyncThunk(
  `${Slice.Wallets}/records`,
  async (
    credentials: {
      skip: number;
      take: number;
      sort: string;
      order: string;
      search: string;
      id: string;
      filter: any;
    },
    thunkAPI,
  ) => {
    const { id, ...restCredentials } = credentials;

    try {
      const response = await client.get(`/wallets/${id}/records`, {
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

export const ordersFilterUpdate = createAction<Partial<ITableFilter>>('ordersFilter');
export const inflowFilterUpdate = createAction<Partial<ITableFilter>>('inflowFilter');
export const openOrdersFilterUpdate = createAction<Partial<ITableFilter>>('openOrdersFilter');
export const orderTradesFilterUpdate = createAction<Partial<ITableFilter>>('orderTradesFilter');
export const recordsFilterUpdate = createAction<Partial<ITableFilter>>('recordsFilter');
