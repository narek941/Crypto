import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AdminSliceState } from './types';

export const selectAdmin = (state: RootState): AdminSliceState => state.admin;

export const selectRole = createSelector(selectAdmin, (admin) => admin.role);
export const selectAdminError = createSelector(selectAdmin, (admin) => admin.error);
export const selectAdminLoading = createSelector(selectAdmin, (admin) => admin.loading);
export const selectTwoFactorAdminEnabled = createSelector(
  selectAdmin,
  (admin) => admin.twoFactorAdminEnabled,
);
export const selectList = createSelector(selectAdmin, (admin) => admin.list);
export const selectCoins = createSelector(selectAdmin, (admin) => admin.coins);
export const selectExchange = createSelector(selectAdmin, (admin) => admin.exchange);
export const selectTradingPairs = createSelector(selectAdmin, (admin) => admin.tradingPairs);
export const selectTotalCount = createSelector(selectAdmin, (admin) => admin.totalCount);
export const selectAdminAccessToken = createSelector(selectAdmin, (admin) => admin.accessToken);
export const selectUsersFilter = createSelector(selectAdmin, (admin) => admin.usersFilter);
export const selectAccountsFilter = createSelector(selectAdmin, (admin) => admin.accountsFilter);
export const selectUserById = createSelector(selectAdmin, (admin) => admin.userById);
