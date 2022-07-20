import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { clientWithToken } from 'api';
import { Routes, Slice } from 'types';
import { IFilter } from 'types/api';

export const addNewAccount = createAsyncThunk(
  `${Slice.Admin}/accounts`,
  async (credentials: any, thunkAPI) => {
    const { navigate, ...restCredentials } = credentials;

    try {
      const response = await clientWithToken.post('/accounts', restCredentials);

      navigate(Routes.Accounts);

      return {
        response: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: 'You can not add accounts' });
    }
  },
);

export const getUsersList = createAsyncThunk(
  `${Slice.Admin}/users`,
  async (
    credentials: { skip: number; take: number; sort: string; order: string; search: string },
    thunkAPI,
  ) => {
    try {
      const response = await clientWithToken.get('/admin/users', { params: { ...credentials } });

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const blockUser = createAsyncThunk(
  `${Slice.Admin}/users/block`,
  async (userID: number, thunkAPI) => {
    try {
      const response = await clientWithToken.put(`/admin/users/${userID}/block`);

      return response;
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const unblockUser = createAsyncThunk(
  `${Slice.Admin}/users/unblock`,
  async (userID: number, thunkAPI) => {
    try {
      const response = await clientWithToken.put(`/admin/users/${userID}/unblock`);

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const deleteUser = createAsyncThunk(
  `${Slice.Admin}/users/delete`,
  async (id: number, thunkAPI) => {
    try {
      const response = await clientWithToken.delete(`/admin/users/${id}`);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { filter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(getUsersList(filter)).unwrap();

      return response;
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const filtersUpdate = createAction<Partial<IFilter>>('filter');
