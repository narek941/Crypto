import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { WalletsSliceState } from './types';

const selectWallets = (state: RootState): WalletsSliceState => state.wallets;

export const selectWalletsError = createSelector(selectWallets, (wallets) => wallets.error);
export const selectInflow = createSelector(selectWallets, (wallets) => wallets.inflow);
export const selectLoading = createSelector(selectWallets, (wallets) => wallets.loading);
export const selectOpenOrders = createSelector(selectWallets, (wallets) => wallets.openOrders);
export const selectOrderTrades = createSelector(selectWallets, (wallets) => wallets.orderTrades);
export const selectOrders = createSelector(selectWallets, (wallets) => wallets.orders);
export const selectRecords = createSelector(selectWallets, (wallets) => wallets.records);
export const selectSummary = createSelector(selectWallets, (wallets) => wallets.summary);
