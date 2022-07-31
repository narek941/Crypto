import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';

import * as adminThunks from './thunks';
import { AdminStates } from './constants';
import { AdminSliceState, UpdateAccessTokenAction } from './types';

const internalInitialState: AdminSliceState = {
  role: '',
  error: null,
  loading: AdminStates.IDLE,
  twoFactorAdminEnabled: false,
  list: [],
  coins: [],
  totalCount: 0,
  accessToken: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '',
  usersFilter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  accountsFilter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '' },
  userById: {},
};

export type IFilterPayload =
  | { skip: number }
  | { take: number }
  | { sort: string }
  | { search: string }
  | { order: 'DESC' | 'ASC' }
  | { filter: any };

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
    builder.addCase(adminThunks.addNewAccount.fulfilled, (state) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
    });

    builder.addCase(adminThunks.getUsersList.fulfilled, (state, action: PayloadAction<any>) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
      state.list = action.payload.list;
      state.totalCount = action.payload.totalCount;
    });

    builder.addCase(adminThunks.usersFilterUpdate, (state, action) => {
      const usersFilter = state.usersFilter;
      state.usersFilter = { ...usersFilter, ...action.payload };
    });

    builder.addCase(adminThunks.blockUser.fulfilled, (state) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
    });

    builder.addCase(adminThunks.deleteUser.fulfilled, (state) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
    });

    builder.addCase(adminThunks.getUserById.fulfilled, (state, action: PayloadAction<any>) => {
      state.error = null;
      state.loading = AdminStates.IDLE;
      state.userById = action.payload.user;
    });

    builder.addCase(adminThunks.removeUserById, (state) => {
      state.userById = {};
    });

    builder.addCase(adminThunks.getCoins.fulfilled, (state, action) => {
      state.coins = action.payload.coins;
    });

    builder.addMatcher(
      isAnyOf(
        adminThunks.addNewAccount.pending,
        adminThunks.getUsersList.pending,
        adminThunks.blockUser.pending,
        adminThunks.deleteUser.pending,
        adminThunks.blockAccount.pending,
        adminThunks.deleteAccount.pending,
        adminThunks.getUserById.pending,
        adminThunks.unblockAccount.pending,
        adminThunks.unblockUser.pending,
        adminThunks.updateUserEmail.pending,
        adminThunks.updateUserPassword.pending,
        adminThunks.updateUserRole.pending,
        adminThunks.updateUsername.pending,
        adminThunks.getCoins.pending,
      ),
      extraReducers.pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        adminThunks.addNewAccount.rejected,
        adminThunks.getUsersList.rejected,
        adminThunks.blockUser.rejected,
        adminThunks.deleteUser.rejected,
        adminThunks.blockAccount.rejected,
        adminThunks.deleteAccount.rejected,
        adminThunks.getUserById.rejected,
        adminThunks.unblockAccount.rejected,
        adminThunks.unblockUser.rejected,
        adminThunks.updateUserEmail.rejected,
        adminThunks.updateUserPassword.rejected,
        adminThunks.updateUserRole.rejected,
        adminThunks.updateUsername.rejected,
        adminThunks.getCoins.rejected,
      ),
      extraReducers.errorReducer,
    );
  },
});

const { reducer, actions } = adminSlice;

export const adminActions = {
  ...actions,
  ...adminThunks,
};

export * as adminSelectors from './selectors';

export default reducer;
