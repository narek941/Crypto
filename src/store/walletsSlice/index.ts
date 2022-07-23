import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { pendingReducer, errorReducer } from 'utils/extraReducers';

import * as walletsThunks from './thunks';
import { WalletsStates } from './constants';
import { WalletsSliceState } from './types';

const internalInitialState: WalletsSliceState = {
  error: null,
  loading: WalletsStates.IDLE,
  openOrders: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  },
  orderTrades: {
    list: [],
    totalCount: 0,
    filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
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
    builder.addCase(walletsThunks.openOrdersFilterUpdate, (state, action) => {
      const filter = state.openOrders.filter;
      state.openOrders.filter = { ...filter, ...action.payload };
    });
    builder.addCase(walletsThunks.orderTradesFilterUpdate, (state, action) => {
      const filter = state.orderTrades.filter;
      state.orderTrades.filter = { ...filter, ...action.payload };
    });

    builder.addMatcher(
      isAnyOf(
        walletsThunks.getWalletOpenOrders.pending,
        walletsThunks.getWalletOrderTrades.pending,
      ),
      pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        walletsThunks.getWalletOpenOrders.rejected,
        walletsThunks.getWalletOrderTrades.rejected,
      ),
      errorReducer,
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
