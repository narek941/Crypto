import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AdminSliceState } from './types';

const selectAdmin = (state: RootState): AdminSliceState => state.admin;

export const selectAdminError = createSelector(selectAdmin, (admin) => admin.error);
export const selectToken = createSelector(selectAdmin, (admin) => admin.accessToken);
export const selectRole = createSelector(selectAdmin, (admin) => admin.role);
