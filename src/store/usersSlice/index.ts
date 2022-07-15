import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';

import * as usersThunks from './thunks';
import { UserStates } from './constants';
import { UsersSliceState } from './types';

const internalInitialState: UsersSliceState = {
  error: null,
  loading: UserStates.IDLE,
};

const usersSlice = createSlice({
  name: Slice.Users,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(usersThunks.getUsers.pending, (state) => {
      state.loading = UserStates.LOADING;
    });
    builder.addCase(usersThunks.getUsers.fulfilled, (state) => {
      state.error = null;
      state.loading = UserStates.IDLE;
    });
    builder.addCase(usersThunks.getUsers.rejected, (state, action: PayloadAction<any>) => {
      state.loading = UserStates.IDLE;
      state.error = action.payload.error;
    });
  },
});

const { reducer, actions } = usersSlice;

export const usersActions = {
  ...actions,
  ...usersThunks,
};

export * as usersSelectors from './selectors';

export default reducer;
