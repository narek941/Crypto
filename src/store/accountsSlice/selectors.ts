import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AccountsSliceState } from './types';

const selectAccounts = (state: RootState): AccountsSliceState => state.accounts;

export const selectAccountsError = createSelector(selectAccounts, (accounts) => accounts.error);
