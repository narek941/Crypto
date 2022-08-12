import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';

import * as alertsThunks from './thunks';
import { AlertStates } from './constants';
import { AlertsSliceState } from './types';

const internalInitialState: AlertsSliceState = {
  error: null,
  loading: AlertStates.IDLE,
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
    builder.addCase(alertsThunks.getAlertList.pending, (state) => {
      state.loading = AlertStates.LOADING;
    });
    builder.addCase(alertsThunks.getAlertList.fulfilled, (state, action: PayloadAction<any>) => {
      state.error = null;
      state.loading = AlertStates.IDLE;
      state.list = action.payload.list;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(alertsThunks.getAlertList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AlertStates.IDLE;
      state.error = action.payload.error;
    });
    builder.addCase(alertsThunks.alertsFilterUpdate, (state, action) => {
      const filter = state.filter;
      state.filter = { ...filter, ...action.payload };
      state.filter.filter = { ...filter.filter, ...action.payload.filter };
    });
    builder.addCase(alertsThunks.alertsFilterClear, (state, action) => {
      state.filter.filter = action.payload;
    });
  },
});

const { reducer, actions } = alertsSlice;

export const alertsActions = {
  ...actions,
  ...alertsThunks,
};

export * as alertsSelectors from './selectors';

export default reducer;
