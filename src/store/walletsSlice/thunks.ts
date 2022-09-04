import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { walletsApi } from 'api';
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
      const response = await walletsApi.walletOpenOrdersRequest(id, restCredentials);

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
      const response = await walletsApi.walletOrderTradesRequest(
        walletId,
        orderId,
        restCredentials,
      );

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
      const response = await walletsApi.walletOrdersRequest(id, restCredentials);

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
      const response = await walletsApi.walletInflowRequest(walletId, restCredentials);

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
      const response = await walletsApi.walletSummaryRequest(walletId);

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
      filter: any;
      id: string;
    },
    thunkAPI,
  ) => {
    const { id, ...restCredentials } = credentials;

    try {
      const response = await walletsApi.walletRecordsRequest(id, restCredentials);

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

export const ordersFilterClear = createAction<Partial<ITableFilter>>('ordersFilterClear');
export const inflowFilterClear = createAction<Partial<ITableFilter>>('inflowFilterClear');
export const openOrdersFilterClear = createAction<Partial<ITableFilter>>('openOrdersFilterClear');
export const orderTradesFilterClear = createAction<Partial<ITableFilter>>('orderTradesFilterClear');
export const recordsFilterClear = createAction<Partial<ITableFilter>>('recordsFilterClear');

export const getOrdersFilterValues = createAsyncThunk(
  `${Slice.Accounts}/accounts/:id/orders/filter-values`,
  async (id: number, thunkAPI) => {
    try {
      const response = await walletsApi.accountOrdersFilterValuesRequest(id);

      return {
        data: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getInflowFilterValues = createAsyncThunk(
  `${Slice.Accounts}/accounts/:id/inflow-outflow/filter-values`,
  async (id: number, thunkAPI) => {
    try {
      const response = await walletsApi.accountInflowFilterValuesRequest(id);

      return {
        data: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getRecordsFilterValues = createAsyncThunk(
  `${Slice.Accounts}/accounts/:id/records/filter-values`,
  async (id: number, thunkAPI) => {
    try {
      const response = await walletsApi.accountRecordFilterValuesRequest(id);

      return {
        data: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getOpenOrdersFilterValues = createAsyncThunk(
  `${Slice.Wallets}/:id/trades-list/filter-values`,
  async (id: number, thunkAPI) => {
    try {
      const response = await walletsApi.accountOpenOrdersFilterValuesRequest(id);

      return {
        data: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);
