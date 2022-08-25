import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';

import * as usersThunks from './thunks';
import { UsersSliceState } from './types';

const internalInitialState: UsersSliceState = {
  error: null,
  loading: false,
};

const usersSlice = createSlice({
  name: Slice.Users,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },

  extraReducers: (builder) => {
    builder.addCase(usersThunks.addNewUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addMatcher(isAnyOf(usersThunks.addNewUser.pending), extraReducers.pendingReducer);

    builder.addMatcher(isAnyOf(usersThunks.addNewUser.rejected), extraReducers.errorReducer);
  },
});

const { reducer, actions } = usersSlice;

export const usersActions = {
  ...actions,
  ...usersThunks,
};

export * as usersSelectors from './selectors';

export default reducer;
