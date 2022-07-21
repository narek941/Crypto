import { SerializedError } from '@reduxjs/toolkit';

import { IFilter } from 'types/api';

import { AlertStates } from './constants';

export type AlertsSliceState = {
  loading: AlertStates;
  error?: SerializedError | null;
  totalCount: number;
  list?: any[];
  filter: IFilter;
};