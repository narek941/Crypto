import { SerializedError } from '@reduxjs/toolkit';

import { AccountStates } from './constants';

export type AccountsSliceState = {
  loading: AccountStates;
  error?: SerializedError | null;
  totalCount?: number;
  list?: any[];
};
