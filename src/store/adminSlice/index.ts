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
  accessToken: localStorage.getItem('accessToken') || '',
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
  },
});

const { reducer, actions } = adminSlice;

export const adminActions = {
  ...actions,
  ...adminThunks,
};

export * as adminSelectors from './selectors';

export default reducer;
