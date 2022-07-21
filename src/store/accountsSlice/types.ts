import { SerializedError } from '@reduxjs/toolkit';

import { IFilter } from 'types/api';

import { AccountStates } from './constants';

export type AccountsSliceState = {
  loading: AccountStates;
  error?: SerializedError | null;
  totalCount: number;
  list: any[];
  openOrders: any[];
  openOrdersTotalCount: number;
  accountsFilter: IFilter;
  accountById: any;
  coins: any[];
  summary: any;
};
