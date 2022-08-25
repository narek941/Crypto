import { SerializedError } from '@reduxjs/toolkit';

import { ITableFilter } from 'types/api';

export type AlertsSliceState = {
  loading: boolean;
  error?: SerializedError | null;
  totalCount: number;
  list: any[];
  filter: ITableFilter;
};
