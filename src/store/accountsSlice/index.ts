import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';

import * as accountsThunks from './thunks';
import { AccountsSliceState } from './types';

const internalInitialState: AccountsSliceState = {
  error: null,
  loading: false,
  coins: [],
  allAccountsList: [],
  accountById: {},
  accountAssetChart: [],
  accountTradingPairsChart: [],
  accountCapitalChart: [],
  accountPerformanceChart: [],
  accountsList: {
    totalCount: 0,
    list: [],
    filter: {
      skip: 0,
      take: 10,
      sort: 'statistics.numberDailyTransactions',
      order: 'DESC',
      search: '',
      filter: {},
    },
  },
  trades: {
    totalCount: 0,
    list: [],
    filter: { skip: 0, take: 10, sort: 'tradeTime', order: 'DESC', search: '', filter: {} },
  },
  alerts: {
    totalCount: 0,
    list: [],
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
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
        state.accountsList.list = action.payload.list;
        state.accountsList.totalCount = action.payload.totalCount;
        state.error = null;
        state.loading = false;
      },
    );

    builder.addCase(
      accountsThunks.getAccountTradesList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.trades.list = action.payload.list;
        state.trades.totalCount = action.payload.totalCount;
        state.error = null;
        state.loading = false;
      },
    );

    builder.addCase(
      accountsThunks.getAccountAlerts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.alerts.list = action.payload.list;
        state.alerts.totalCount = action.payload.totalCount;
        state.loading = false;
        state.error = null;
      },
    );

    builder.addCase(
      accountsThunks.getAccountById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.accountById = action.payload.account;
        state.error = null;
        state.loading = false;
      },
    );

    builder.addCase(accountsThunks.getAccountSummary.fulfilled, (state, action) => {
      state.accountById = {
        ...state.accountById,
        statistics: action.payload.summary,
      };
      state.loading = false;
      state.error = null;
    });

    builder.addCase(accountsThunks.getAccountAssetsChartData.fulfilled, (state, action) => {
      state.accountAssetChart = action.payload.chart;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(accountsThunks.getAccountTradingPairsChartData.fulfilled, (state, action) => {
      state.accountTradingPairsChart = action.payload.chart;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(accountsThunks.getAccountCapitalChartData.fulfilled, (state, action) => {
      state.accountCapitalChart = action.payload.chart;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(accountsThunks.getAccountPerformanceChartData.fulfilled, (state, action) => {
      state.accountPerformanceChart = action.payload.chart;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(accountsThunks.getAllAccounts.fulfilled, (state, action) => {
      state.allAccountsList = action.payload.list;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(accountsThunks.removeAccountById, (state) => {
      state.accountById = {};
    });

    builder.addCase(accountsThunks.accountsFilterUpdate, (state, action) => {
      state.accountsList.filter.skip = 0;
      const filter = state.accountsList.filter;
      state.accountsList.filter = { ...filter, ...action.payload };
      state.accountsList.filter.filter = { ...filter.filter, ...action.payload.filter };
    });
    builder.addCase(accountsThunks.accountsTradesFilterUpdate, (state, action) => {
      state.trades.filter.skip = 0;
      const filter = state.trades.filter;
      state.trades.filter = { ...filter, ...action.payload };
      state.trades.filter.filter = { ...filter.filter, ...action.payload.filter };
    });
    builder.addCase(accountsThunks.accountsAlertsFilterUpdate, (state, action) => {
      state.alerts.filter.skip = 0;
      const filter = state.alerts.filter;
      state.alerts.filter = { ...filter, ...action.payload };
      state.alerts.filter.filter = { ...filter.filter, ...action.payload.filter };
    });
    builder.addCase(accountsThunks.accountsTradesFilterClear, (state, action) => {
      state.trades.filter.skip = 0;
      state.trades.filter.filter = action.payload;
    });
    builder.addCase(accountsThunks.accountsAlertsFilterClear, (state, action) => {
      state.alerts.filter.skip = 0;
      state.alerts.filter.filter = action.payload;
    });
    builder.addCase(accountsThunks.accountsFilterClear, (state, action) => {
      state.accountsList.filter.skip = 0;
      state.accountsList.filter.filter = action.payload;
    });

    builder.addMatcher(
      isAnyOf(
        accountsThunks.getAccountById.pending,
        accountsThunks.getAccountList.pending,
        accountsThunks.getAccountAlerts.pending,
        accountsThunks.getAccountSummary.pending,
        accountsThunks.getAccountTradesList.pending,
        accountsThunks.getAccountAssetsChartData.pending,
        accountsThunks.getAccountCapitalChartData.pending,
        accountsThunks.getAccountPerformanceChartData.pending,
        accountsThunks.getAccountTradingPairsChartData.pending,
      ),
      extraReducers.pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        accountsThunks.getAccountList.rejected,
        accountsThunks.getAccountById.rejected,
        accountsThunks.getAccountAlerts.rejected,
        accountsThunks.getAccountSummary.rejected,
        accountsThunks.getAccountTradesList.rejected,
        accountsThunks.getAccountAssetsChartData.rejected,
        accountsThunks.getAccountCapitalChartData.rejected,
        accountsThunks.getAccountPerformanceChartData.rejected,
        accountsThunks.getAccountTradingPairsChartData.rejected,
      ),
      extraReducers.errorReducer,
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
