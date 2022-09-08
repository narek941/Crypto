import { AxiosError } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { adminApi } from 'api';
import { ITableFilter } from 'types/api';

import { accountsActions } from '../accountsSlice';

export const addNewAccount = createAsyncThunk(
  `${Slice.Admin}/accounts`,
  async (credentials: any, thunkAPI) => {
    try {
      const response = await adminApi.addNewAccountRequest(credentials);

      return {
        response: response.data,
      };
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      if (error.message === 'WRONG_KEYS') {
        return thunkAPI.rejectWithValue({
          error: { apiKey: '', apiSecret: error.response?.data.message[0] },
        });
      } else {
        return thunkAPI.rejectWithValue({ error: error.response?.data.message[0] });
      }
    }
  },
);

export const updateAccount = createAsyncThunk(
  `${Slice.Admin}/accounts/update`,
  async ({ credentials, accountId }: any, thunkAPI) => {
    try {
      const response = await adminApi.updateAccountRequest(accountId, credentials);

      return {
        response: response.data,
      };
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      if (error.message === 'WRONG_KEYS') {
        return thunkAPI.rejectWithValue({
          error: { apiKey: '', apiSecret: error.response?.data.message[0] },
        });
      } else {
        return thunkAPI.rejectWithValue({ error: error.response?.data.message[0] });
      }
    }
  },
);

export const getUsersList = createAsyncThunk(
  `${Slice.Admin}/users`,
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
      const response = await adminApi.usersListRequest(credentials);

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
      const response = await adminApi.blockUserRequest(userID);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { usersFilter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(getUsersList(usersFilter)).unwrap();

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
      const response = await adminApi.unblockUserRequest(userID);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { usersFilter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(getUsersList(usersFilter)).unwrap();

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const updateUsername = createAsyncThunk(
  `${Slice.Admin}/users/username`,
  async ({ userID, username }: { userID: number; username: string }, thunkAPI) => {
    try {
      const response = await adminApi.updateUsernameRequest(userID, username);

      return response.data;
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({ error: { username: error.response?.data.message[0] } });
    }
  },
);

export const updateUserAllowedAccounts = createAsyncThunk(
  `${Slice.Admin}/users/:id/allowed-accounts`,
  async ({ userID, allowedAccountIds }: { userID: number; allowedAccountIds: any[] }, thunkAPI) => {
    try {
      const response = await adminApi.updateAllowedAccountsRequest(userID, allowedAccountIds);

      return response.data;
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({
        error: { allowedAccountIds: error.response?.data.message[0] },
      });
    }
  },
);

export const updateUserEmail = createAsyncThunk(
  `${Slice.Admin}/users/email`,
  async ({ userID, email }: { userID: number; email: string }, thunkAPI) => {
    try {
      const response = await adminApi.updateUserEmailRequest(userID, email);

      return response.data;
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({ error: { email: error.response?.data.message[0] } });
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  `${Slice.Admin}/users/password`,
  async ({ userID, password }: { userID: number; password: string }, thunkAPI) => {
    try {
      const response = await adminApi.updateUserPasswordRequest(userID, password);

      return response.data;
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({ error: { password: error.response?.data.message[0] } });
    }
  },
);

export const updateUserRole = createAsyncThunk(
  `${Slice.Admin}/users/role`,
  async ({ userID, role }: { userID: number; role: string }, thunkAPI) => {
    try {
      const response = await adminApi.updateUserRoleRequest(userID, role);

      return response.data;
    } catch (exception) {
      const error = exception as AxiosError<{ message: any }>;
      return thunkAPI.rejectWithValue({ error: { role: error.response?.data.message[0] } });
    }
  },
);

export const deleteUser = createAsyncThunk(
  `${Slice.Admin}/users/delete`,
  async (id: number, thunkAPI) => {
    try {
      const response = await adminApi.deleteUserRequest(id);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { usersFilter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(getUsersList(usersFilter)).unwrap();

      return response;
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const deleteAccount = createAsyncThunk(
  `${Slice.Admin}/accounts/delete`,
  async (id: number, thunkAPI) => {
    try {
      const response = await adminApi.deleteAccountRequest(id);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { accountsFilter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(accountsActions.getAccountList(accountsFilter)).unwrap();

      return response;
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const blockAccount = createAsyncThunk(
  `${Slice.Admin}/accounts/block`,
  async (userID: number, thunkAPI) => {
    try {
      const response = await adminApi.blockAccountRequest(userID);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { accountsFilter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(accountsActions.getAccountList(accountsFilter)).unwrap();

      return response;
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const unblockAccount = createAsyncThunk(
  `${Slice.Admin}/accounts/unblock`,
  async (userID: number, thunkAPI) => {
    try {
      const response = await adminApi.unblockAccountRequest(userID);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { accountsFilter } = thunkAPI.getState().admin;

      await thunkAPI.dispatch(accountsActions.getAccountList(accountsFilter)).unwrap();

      return {
        list: response.data.list,
        totalCount: response.data.totalCount,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getUserById = createAsyncThunk(
  `${Slice.Admin}/users/id`,
  async (userID: number, thunkAPI) => {
    try {
      const response = await adminApi.getUserByIdRequest(userID);

      return {
        user: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const getCoins = createAsyncThunk(`${Slice.Admin}/coins`, async (_, thunkAPI) => {
  try {
    const response = await adminApi.getCoinsRequest();

    return {
      coins: response.data.list,
    };
  } catch {
    return thunkAPI.rejectWithValue({ error: '* Incorrect' });
  }
});

export const getTradingPairs = createAsyncThunk(
  `${Slice.Admin}/trading-pairs`,
  async (_, thunkAPI) => {
    try {
      const response = await adminApi.getTradingPairsRequest();

      return {
        tradingPairs: response.data.list,
      };
    } catch {
      return thunkAPI.rejectWithValue({ error: '* Incorrect' });
    }
  },
);

export const removeUserById = createAction('removeUserByID');
export const userFilterClear = createAction<Partial<ITableFilter>>('userFilterClear');
export const usersFilterUpdate = createAction<Partial<ITableFilter>>('usersFilter');
