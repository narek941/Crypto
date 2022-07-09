import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as authThunks from './thunks';
import { reducerName, AuthStates } from './constants';
import { AuthSliceState, UpdateAccessTokenAction } from './types';

const internalInitialState: AuthSliceState = {
  error: null,
  loading: AuthStates.IDLE,
  accessToken: localStorage.getItem('accessToken') || '',
};

const authSlice = createSlice({
  name: reducerName,
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
    });
    builder.addCase(authThunks.signIn.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.error;
    });

    builder.addCase(authThunks.signOut.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.signOut.fulfilled, () => internalInitialState);

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

export default reducer;
