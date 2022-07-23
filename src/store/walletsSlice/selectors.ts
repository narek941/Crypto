import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { WalletsSliceState } from './types';

const selectWallets = (state: RootState): WalletsSliceState => state.wallets;

export const selectWalletsError = createSelector(selectWallets, (wallets) => wallets.error);
