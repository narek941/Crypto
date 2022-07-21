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
  accountsFilter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  accountById: {},
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
  },
});

const { reducer, actions } = accountsSlice;

export const accountsActions = {
  ...actions,
  ...accountsThunks,
};

export * as accountsSelectors from './selectors';

export default reducer;
