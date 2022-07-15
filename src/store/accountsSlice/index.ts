import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';

import * as accountsThunks from './thunks';
import { AccountStates } from './constants';
import { AccountsSliceState } from './types';

const internalInitialState: AccountsSliceState = {
  error: null,
  loading: AccountStates.IDLE,
};

const accountsSlice = createSlice({
  name: Slice.Accounts,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(accountsThunks.getAccountList.pending, (state) => {
      state.loading = AccountStates.LOADING;
    });
    builder.addCase(
      accountsThunks.getAccountList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.error = null;
        state.loading = AccountStates.IDLE;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      },
    );
    builder.addCase(accountsThunks.getAccountList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AccountStates.IDLE;
      state.error = action.payload.error;
    });
  },
});

const { reducer, actions } = accountsSlice;

export const accountsActions = {
  ...actions,
  ...accountsThunks,
};

export * as accountsSelectors from './selectors';

export default reducer;
