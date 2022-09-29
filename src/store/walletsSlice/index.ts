import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';

import * as walletsThunks from './thunks';
import { WalletsSliceState } from './types';

const internalInitialState: WalletsSliceState = {
  error: null,
  loading: false,
  openOrders: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'originalId', order: 'DESC', search: '', filter: {} },
  },
  orderTrades: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
  },
  orders: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'originalId', order: 'DESC', search: '', filter: {} },
  },
  inflow: {
    list: [],
    totalCount: 0,
    filter: {
      skip: 0,
      take: 10,
      sort: 'insertTime',
      order: 'ASC',
      search: '',
      filter: {},
    },
  },
  records: {
    list: [],
    totalCount: 0,
    filter: {
      skip: 0,
      take: 10,
      sort: 'coin.name',
      order: 'ASC',
      search: '',
      filter: {},
    },
  },
  summary: {
    totalCapital: null,
    lastRefreshDate: null,
    profitLossInPercent: null,
    profitLossInBaseCurrency: null,
    totalCapitalInBaseCurrency: null,
  },
};

const walletsSlice = createSlice({
  name: Slice.Wallets,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      walletsThunks.getWalletOpenOrders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.openOrders.list = action.payload.list;
        state.openOrders.totalCount = action.payload.totalCount;
      },
    );

    builder.addCase(walletsThunks.getWalletOrderTrades.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.orderTrades.list = action.payload.list;
      state.orderTrades.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.orders.list = action.payload.list;
      state.orders.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletInflow.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.inflow.list = action.payload.list;
      state.inflow.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletRecords.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.records.list = action.payload.list;
      state.records.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.summary = action.payload.list;
    });

    builder.addCase(walletsThunks.recordsFilterUpdate, (state, action) => {
      state.records.filter.skip = 0;
      const filter = state.records.filter;
      state.records.filter = { ...filter, ...action.payload };
      state.records.filter.filter = { ...filter.filter, ...action.payload.filter };
    });

    builder.addCase(walletsThunks.inflowFilterUpdate, (state, action) => {
      state.inflow.filter.skip = 0;
      const filter = state.inflow.filter;
      state.inflow.filter = { ...filter, ...action.payload };
      state.inflow.filter.filter = { ...filter.filter, ...action.payload.filter };
    });

    builder.addCase(walletsThunks.ordersFilterUpdate, (state, action) => {
      state.orders.filter.skip = 0;
      const filter = state.orders.filter;
      state.orders.filter = { ...filter, ...action.payload };
      state.orders.filter.filter = { ...filter.filter, ...action.payload.filter };
    });

    builder.addCase(walletsThunks.orderTradesFilterUpdate, (state, action) => {
      state.orderTrades.filter.skip = 0;
      const filter = state.orderTrades.filter;
      state.orderTrades.filter = { ...filter, ...action.payload };
      state.orderTrades.filter.filter = { ...filter.filter, ...action.payload.filter };
    });

    builder.addCase(walletsThunks.openOrdersFilterUpdate, (state, action) => {
      state.openOrders.filter.skip = 0;
      const filter = state.openOrders.filter;
      state.openOrders.filter = { ...filter, ...action.payload };
      state.openOrders.filter.filter = { ...filter.filter, ...action.payload.filter };
    });
    builder.addCase(walletsThunks.recordsFilterClear, (state, action) => {
      state.records.filter.skip = 0;
      state.records.filter.filter = action.payload;
    });

    builder.addCase(walletsThunks.inflowFilterClear, (state, action) => {
      state.inflow.filter.skip = 0;
      state.inflow.filter.filter = action.payload;
    });

    builder.addCase(walletsThunks.ordersFilterClear, (state, action) => {
      state.orders.filter.skip = 0;
      state.orders.filter.filter = action.payload;
    });

    builder.addCase(walletsThunks.orderTradesFilterClear, (state, action) => {
      state.orderTrades.filter.skip = 0;
      state.orderTrades.filter.filter = action.payload;
    });

    builder.addCase(walletsThunks.openOrdersFilterClear, (state, action) => {
      state.openOrders.filter.skip = 0;
      state.openOrders.filter.filter = action.payload;
    });
    builder.addCase(walletsThunks.clearError, (state) => {
      state.error = null;
    });
    builder.addMatcher(
      isAnyOf(
        walletsThunks.getWalletOrders.pending,
        walletsThunks.getWalletInflow.pending,
        walletsThunks.getWalletSummary.pending,
        walletsThunks.getWalletOpenOrders.pending,
        walletsThunks.getWalletOrderTrades.pending,
        walletsThunks.createManualInflow.pending,
        walletsThunks.updateManualInflow.pending,
        walletsThunks.deleteManualInflow.pending,
      ),
      extraReducers.pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        walletsThunks.getWalletOrders.rejected,
        walletsThunks.getWalletInflow.rejected,
        walletsThunks.createManualInflow.rejected,
        walletsThunks.updateManualInflow.rejected,
        walletsThunks.deleteManualInflow.rejected,

        walletsThunks.getWalletSummary.rejected,
        walletsThunks.getWalletOpenOrders.rejected,
        walletsThunks.getWalletOrderTrades.rejected,
      ),
      extraReducers.errorReducer,
    );
  },
});

const { reducer, actions } = walletsSlice;

export const walletsActions = {
  ...actions,
  ...walletsThunks,
};

export * as walletsSelectors from './selectors';

export default reducer;
