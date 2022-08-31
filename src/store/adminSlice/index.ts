import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';
import { BrowserStorageKeys, BrowserStorageService } from 'services';

import * as adminThunks from './thunks';
import { AdminSliceState, UpdateAccessTokenAction } from './types';

const internalInitialState: AdminSliceState = {
  role: '',
  error: null,
  loading: false,
  twoFactorAdminEnabled: false,
  list: [],
  coins: [],
  tradingPairs: [],
  totalCount: 0,
  accessToken:
    BrowserStorageService.get(BrowserStorageKeys.AccessToken) ||
    BrowserStorageService.get(BrowserStorageKeys.AccessToken, { session: true }) ||
    '',
  usersFilter: { skip: 0, take: 10, sort: 'username', order: 'ASC', search: '', filter: {} },
  accountsFilter: {
    skip: 0,
    take: 10,
    sort: 'id',
    order: 'ASC',
    search: '',
  },
  userById: {},
};

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
      state.loading = false;
    });

    builder.addCase(adminThunks.getUsersList.fulfilled, (state, action: PayloadAction<any>) => {
      state.list = action.payload.list;
      state.totalCount = action.payload.totalCount;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(adminThunks.usersFilterUpdate, (state, action) => {
      state.usersFilter.skip = 0;
      const usersFilter = state.usersFilter;
      state.usersFilter = { ...usersFilter, ...action.payload };
      state.usersFilter.filter = { ...usersFilter.filter, ...action.payload.filter };
    });

    builder.addCase(adminThunks.blockUser.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(adminThunks.deleteUser.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(adminThunks.getUserById.fulfilled, (state, action: PayloadAction<any>) => {
      state.userById = action.payload.user;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(adminThunks.removeUserById, (state) => {
      state.userById = {};
    });

    builder.addCase(adminThunks.getCoins.fulfilled, (state, action) => {
      state.coins = action.payload.coins;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(adminThunks.getTradingPairs.fulfilled, (state, action) => {
      state.tradingPairs = action.payload.tradingPairs;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(adminThunks.userFilterClear, (state, action) => {
      state.usersFilter.skip = 0;
      state.usersFilter.filter = action.payload;
      state.error = null;
      state.loading = false;
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
        adminThunks.getTradingPairs.pending,
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
        adminThunks.getTradingPairs.rejected,
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
