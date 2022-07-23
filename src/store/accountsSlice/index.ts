import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { pendingReducer, errorReducer } from 'utils/extraReducers';

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
  filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  accountById: {},
  summary: {},
};

const accountsSlice = createSlice({
  name: Slice.Accounts,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      accountsThunks.getAccountList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.error = null;
        state.loading = AccountStates.IDLE;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      },
    );

    builder.addCase(accountsThunks.accountsFilterUpdate, (state, action) => {
      const filter = state.filter;
      state.filter = { ...filter, ...action.payload };
    });

    builder.addCase(
      accountsThunks.getAccountById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.error = null;
        state.loading = AccountStates.IDLE;
        state.accountById = action.payload.account;
      },
    );

    builder.addCase(accountsThunks.getAccountSummary.fulfilled, (state, action) => {
      state.accountById = {
        ...state.accountById,
        statistics: action.payload.summary,
      };
      builder.addCase(accountsThunks.removeAccountById, (state) => {
        state.accountById = {};
      });
    });
    builder.addMatcher(
      isAnyOf(
        accountsThunks.getAccountSummary.pending,
        accountsThunks.getAccountList.pending,
        accountsThunks.getAccountById.pending,
      ),
      pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        accountsThunks.getAccountSummary.rejected,
        accountsThunks.getAccountList.rejected,
        accountsThunks.getAccountById.rejected,
      ),
      errorReducer,
    );
  },
});

const { reducer, actions } = accountsSlice;

export const accountsActions = {
  ...actions,
  ...accountsThunks,
};

export * as accountsSelectors from './selectors';

export default reducer;
