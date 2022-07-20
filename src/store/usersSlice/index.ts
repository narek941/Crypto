import { createSlice } from '@reduxjs/toolkit';

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
  // extraReducers: (builder) => {},
});

const { reducer, actions } = usersSlice;

export const usersActions = {
  ...actions,
  ...usersThunks,
};

export * as usersSelectors from './selectors';

export default reducer;
