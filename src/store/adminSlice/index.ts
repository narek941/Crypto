import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';

import * as adminThunks from './thunks';
import { AdminStates } from './constants';
import { AdminSliceState, UpdateAccessTokenAction } from './types';

const internalInitialState: AdminSliceState = {
  role: '',
  error: null,
  loading: AdminStates.IDLE,
  twoFactorAdminEnabled: false,
  list: [],
  totalCount: 0,
  accessToken: localStorage.getItem('accessToken') || '',
  filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
};
export type IFilterPayload =
  | { skip: number }
  | { take: number }
  | { sort: string }
  | { search: string }
  | { order: 'DESC' | 'ASC' };

const adminSlice = createSlice({
  name: Slice.Admin,
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<UpdateAccessTokenAction>) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(adminThunks.addNewAccount.pending, (state) => {
      state.loading = AdminStates.LOADING;
    });
    builder.addCase(adminThunks.addNewAccount.fulfilled, (state) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
    });
    builder.addCase(adminThunks.addNewAccount.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AdminStates.IDLE;
      state.error = action.payload.error;
    });
    builder.addCase(adminThunks.getUsersList.pending, (state) => {
      state.loading = AdminStates.LOADING;
    });
    builder.addCase(adminThunks.getUsersList.fulfilled, (state, action: PayloadAction<any>) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
      state.list = action.payload.list;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(adminThunks.getUsersList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AdminStates.IDLE;
      state.error = action.payload.error;
    });
    builder.addCase(adminThunks.filtersUpdate, (state, action) => {
      const filter = state.filter;
      state.filter = { ...filter, ...action.payload };
    });
    builder.addCase(adminThunks.blockUser.pending, (state) => {
      state.loading = AdminStates.LOADING;
    });
    builder.addCase(adminThunks.blockUser.fulfilled, (state) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
    });
    builder.addCase(adminThunks.blockUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AdminStates.IDLE;
      state.error = action.payload.error;
    });
    builder.addCase(adminThunks.deleteUser.pending, (state) => {
      state.loading = AdminStates.LOADING;
    });
    builder.addCase(adminThunks.deleteUser.fulfilled, (state) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
    });
    builder.addCase(adminThunks.deleteUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AdminStates.IDLE;
      state.error = action.payload.error;
    });
  },
});

const { reducer, actions } = adminSlice;

export const adminActions = {
  ...actions,
  ...adminThunks,
};

export * as adminSelectors from './selectors';

export default reducer;
