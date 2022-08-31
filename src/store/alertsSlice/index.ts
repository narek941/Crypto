import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { extraReducers } from 'utils';

import * as alertsThunks from './thunks';
import { AlertsSliceState } from './types';

const internalInitialState: AlertsSliceState = {
  error: null,
  loading: false,
  totalCount: 0,
  list: [],
  filter: { skip: 0, take: 10, sort: 'id', order: 'DESC', search: '', filter: {} },
};

const alertsSlice = createSlice({
  name: Slice.Alerts,
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(alertsThunks.getAlertList.fulfilled, (state, action: PayloadAction<any>) => {
      state.error = null;
      state.loading = false;
      state.list = action.payload.list;
      state.totalCount = action.payload.totalCount;
    });

    builder.addCase(alertsThunks.alertsFilterUpdate, (state, action) => {
      state.filter.skip = 0;
      const filter = state.filter;
      state.filter = { ...filter, ...action.payload };
      state.filter.filter = { ...filter.filter, ...action.payload.filter };
    });

    builder.addCase(alertsThunks.alertsFilterClear, (state, action) => {
      state.filter.skip = 0;
      state.filter.filter = action.payload;
    });

    builder.addMatcher(isAnyOf(alertsThunks.getAlertList.pending), extraReducers.pendingReducer);

    builder.addMatcher(isAnyOf(alertsThunks.getAlertList.rejected), extraReducers.errorReducer);
  },
});

const { reducer, actions } = alertsSlice;

export const alertsActions = {
  ...actions,
  ...alertsThunks,
};

export * as alertsSelectors from './selectors';

export default reducer;
