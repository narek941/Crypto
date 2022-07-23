import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { client } from 'api';
import { IFilter } from 'types/api';

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
  async ({ walletId, orderId }: any, thunkAPI) => {
    try {
      const response = await client.get(
        `/wallets/${walletId}/orders/${orderId}/trades?skip=0&take=10&sort=id&order=ASC&search={}`,
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

export const openOrdersFilterUpdate = createAction<Partial<IFilter>>('openOrdersFilter');
export const orderTradesFilterUpdate = createAction<Partial<IFilter>>('orderTradesFilter');
