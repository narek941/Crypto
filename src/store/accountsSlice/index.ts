import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';

import * as accountsThunks from './thunks';
import { AccountStates } from './constants';
import { AccountsSliceState } from './types';

const internalInitialState: AccountsSliceState = {
  error: null,
  loading: AccountStates.IDLE,
  totalCount: 0,
  list: [],
  openOrders: [],
  openOrdersTotalCount: 0,
  coins: [],
  accountsFilter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  accountById: {},
  summary: {},
};
export type IFilterPayload =
  | { skip: number }
  | { take: number }
  | { sort: string }
  | { search: string }
  | { order: 'DESC' | 'ASC' };

const accountsSlice = createSlice({
  name: Slice.Accounts,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(accountsThunks.getAccountList.pending, (state) => {
      state.loading = AccountStates.LOADING;
    });
    builder.addCase(
      accountsThunks.getAccountList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.error = null;
        state.loading = AccountStates.IDLE;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      },
    );
    builder.addCase(accountsThunks.getAccountList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AccountStates.IDLE;
      state.error = action.payload.error;
    });
    builder.addCase(accountsThunks.accountsFilterUpdate, (state, action) => {
      const accountsFilter = state.accountsFilter;
      state.accountsFilter = { ...accountsFilter, ...action.payload };
    });
    builder.addCase(
      accountsThunks.getAccountById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.error = null;
        state.loading = AccountStates.IDLE;
        state.accountById = action.payload.account;
      },
    );
    builder.addCase(accountsThunks.removeAccountById, (state) => {
      state.accountById = {};
    });
    builder.addCase(
      accountsThunks.getWalletOpenOrders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.openOrders = action.payload.list;
        state.openOrdersTotalCount = action.payload.totalCount;
      },
    );
    builder.addCase(accountsThunks.getCoins.fulfilled, (state, action) => {
      state.coins = action.payload.coins;
    });
    builder.addCase(accountsThunks.getAccountSummary.fulfilled, (state, action) => {
      state.accountById = {
        ...state.accountById,
        statistics: action.payload.summary,
      };
    });
  },
});

const { reducer, actions } = accountsSlice;

export const accountsActions = {
  ...actions,
  ...accountsThunks,
};

export * as accountsSelectors from './selectors';

export default reducer;
