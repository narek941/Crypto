import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { pendingReducer, errorReducer } from 'utils/extraReducers';

import * as accountsThunks from './thunks';
import { AccountStates } from './constants';
import { AccountsSliceState } from './types';

const internalInitialState: AccountsSliceState = {
  error: null,
  loading: AccountStates.IDLE,
  coins: [],
  accountById: {},
  accountsList: {
    totalCount: 0,
    list: [],
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  },
  trades: {
    totalCount: 0,
    list: [],
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  },
  alerts: {
    totalCount: 0,
    list: [],
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  },
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
        state.accountsList.list = action.payload.list;
        state.accountsList.totalCount = action.payload.totalCount;
      },
    );

    builder.addCase(
      accountsThunks.getAccountTradesList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.trades.list = action.payload.list;
        state.trades.totalCount = action.payload.totalCount;
      },
    );

    builder.addCase(
      accountsThunks.getAccountAlerts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.alerts.list = action.payload.list;
        state.alerts.totalCount = action.payload.totalCount;
      },
    );

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
    });

    builder.addCase(accountsThunks.removeAccountById, (state) => {
      state.accountById = {};
    });

    builder.addCase(accountsThunks.accountsFilterUpdate, (state, action) => {
      const filter = state.accountsList.filter;
      state.accountsList.filter = { ...filter, ...action.payload };
    });
    builder.addCase(accountsThunks.accountsTradesFilterUpdate, (state, action) => {
      const filter = state.trades.filter;
      state.trades.filter = { ...filter, ...action.payload };
    });
    builder.addCase(accountsThunks.accountsAlertsFilterUpdate, (state, action) => {
      const filter = state.alerts.filter;
      state.alerts.filter = { ...filter, ...action.payload };
    });

    builder.addMatcher(
      isAnyOf(
        accountsThunks.getAccountSummary.pending,
        accountsThunks.getAccountList.pending,
        accountsThunks.getAccountById.pending,
        accountsThunks.getAccountTradesList.pending,
        accountsThunks.getAccountAlerts.pending,
      ),
      pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        accountsThunks.getAccountSummary.rejected,
        accountsThunks.getAccountList.rejected,
        accountsThunks.getAccountById.rejected,
        accountsThunks.getAccountTradesList.rejected,
        accountsThunks.getAccountAlerts.rejected,
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
