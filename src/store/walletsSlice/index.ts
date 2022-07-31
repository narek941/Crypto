import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';

import * as walletsThunks from './thunks';
import { WalletsStates } from './constants';
import { WalletsSliceState } from './types';

const internalInitialState: WalletsSliceState = {
  error: null,
  loading: WalletsStates.IDLE,
  openOrders: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
  },
  orderTrades: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
  },
  orders: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
  },
  inflow: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
  },
  records: {
    list: [],
    totalCount: 0,
    filter: {
      skip: 0,
      take: 10,
      sort: 'id',
      order: 'DESC',
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
        state.openOrders.list = action.payload.list;
        state.openOrders.totalCount = action.payload.totalCount;
      },
    );

    builder.addCase(walletsThunks.getWalletOrderTrades.fulfilled, (state, action) => {
      state.orderTrades.list = action.payload.list;
      state.orderTrades.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletOrders.fulfilled, (state, action) => {
      state.orders.list = action.payload.list;
      state.orders.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletInflow.fulfilled, (state, action) => {
      state.inflow.list = action.payload.list;
      state.inflow.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletRecords.fulfilled, (state, action) => {
      state.records.list = action.payload.list;
      state.records.totalCount = action.payload.totalCount;
    });

    builder.addCase(walletsThunks.getWalletSummary.fulfilled, (state, action) => {
      state.summary = action.payload.list;
    });

    builder.addCase(walletsThunks.recordsFilterUpdate, (state, action) => {
      const filter = state.records.filter;
      state.records.filter = { ...filter, ...action.payload };
    });

    builder.addCase(walletsThunks.inflowFilterUpdate, (state, action) => {
      const filter = state.inflow.filter;
      state.inflow.filter = { ...filter, ...action.payload };
    });

    builder.addCase(walletsThunks.ordersFilterUpdate, (state, action) => {
      const filter = state.orders.filter;
      state.orders.filter = { ...filter, ...action.payload };
    });

    builder.addCase(walletsThunks.orderTradesFilterUpdate, (state, action) => {
      const filter = state.orderTrades.filter;
      state.orderTrades.filter = { ...filter, ...action.payload };
    });

    builder.addCase(walletsThunks.openOrdersFilterUpdate, (state, action) => {
      // eslint-disable-next-line no-console
      const filter = state.openOrders.filter;
      state.openOrders.filter = { ...filter, ...action.payload };
    });

    builder.addMatcher(
      isAnyOf(
        walletsThunks.getWalletOrders.pending,
        walletsThunks.getWalletInflow.pending,
        walletsThunks.getWalletSummary.pending,
        walletsThunks.getWalletOpenOrders.pending,
        walletsThunks.getWalletOrderTrades.pending,
      ),
      extraReducers.pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        walletsThunks.getWalletOrders.rejected,
        walletsThunks.getWalletInflow.rejected,
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
