import { SerializedError } from '@reduxjs/toolkit';

import { IFilter, ITableFilter } from 'types/api';

import { AccountStates } from './constants';

export type AccountsSliceState = {
  loading: AccountStates;
  error?: SerializedError | null;
  accountById: any;
  coins: any[];
  accountsList: {
    totalCount: number;
    list: any[];
    filter: IFilter;
  };
  trades: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
  alerts: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
};
