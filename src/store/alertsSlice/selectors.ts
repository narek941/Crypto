import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { AlertsSliceState } from './types';

const selectAlerts = (state: RootState): AlertsSliceState => state.alerts;

export const selectAlertsError = createSelector(selectAlerts, (alerts) => alerts.error);
