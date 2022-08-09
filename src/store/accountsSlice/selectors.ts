import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AccountsSliceState } from './types';

const selectAccounts = (state: RootState): AccountsSliceState => state.accounts;

export const selectAccountsError = createSelector(selectAccounts, (accounts) => accounts.error);

export const selectAccountById = createSelector(selectAccounts, (accounts) => accounts.accountById);
export const selectAccountLoading = createSelector(selectAccounts, (accounts) => accounts.loading);
export const selectAccountCoins = createSelector(selectAccounts, (accounts) => accounts.coins);
export const selectAccountAccountsList = createSelector(
  selectAccounts,
  (accounts) => accounts.accountsList,
);
export const selectAccountAccountsTrades = createSelector(
  selectAccounts,
  (accounts) => accounts.trades,
);

export const selectAccountAccountsAlerts = createSelector(
  selectAccounts,
  (accounts) => accounts.alerts,
);
