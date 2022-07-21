import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';

import * as authThunks from './thunks';
import { AuthStates } from './constants';
import { AuthSliceState, UpdateAccessTokenAction } from './types';

const internalInitialState: AuthSliceState = {
  role: '',
  error: null,
  loading: AuthStates.IDLE,
  twoFactorAuthEnabled: false,
  accessToken: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '',
};

const authSlice = createSlice({
  name: Slice.Auth,
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<UpdateAccessTokenAction>) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.signIn.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.signIn.fulfilled, (state, action) => {
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.loading = AuthStates.IDLE;
      state.role = action.payload.role;
      state.twoFactorAuthEnabled = action.payload.twoFactorAuthEnabled;
    });
    builder.addCase(authThunks.signIn.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AuthStates.IDLE;
      state.error = action.payload.error;
    });

    builder.addCase(authThunks.signOut.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.signOut.fulfilled, () => ({
      ...internalInitialState,
      accessToken: '',
    }));
    builder.addCase(authThunks.signOut.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.error;
    });
  },
});

const { reducer, actions } = authSlice;

export const authActions = {
  ...actions,
  ...authThunks,
};

export * as authSelectors from './selectors';

export default reducer;
