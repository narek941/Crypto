import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AlertsSliceState } from './types';

export const selectAlerts = (state: RootState): AlertsSliceState => state.alerts;

export const selectAlertsError = createSelector(selectAlerts, (alerts) => alerts.error);
export const selectAlertsLoading = createSelector(selectAlerts, (alerts) => alerts.loading);
export const selectAlertsTotalCount = createSelector(selectAlerts, (alerts) => alerts.totalCount);
export const selectAlertsList = createSelector(selectAlerts, (alerts) => alerts.list);
export const selectAlertsFilter = createSelector(selectAlerts, (alerts) => alerts.filter);
