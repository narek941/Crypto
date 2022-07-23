import { SerializedError } from '@reduxjs/toolkit';

import { IFilter } from 'types/api';

import { WalletsStates } from './constants';

export type WalletsSliceState = {
  loading: WalletsStates;
  error?: SerializedError | null;
  summary: any[];
  openOrders: {
    totalCount: number;
    list: any[];
    filter: IFilter;
  };
  orderTrades: {
    totalCount: number;
    list: any[];
    filter: IFilter;
  };
  orders: {
    totalCount: number;
    list: any[];
    filter: IFilter;
  };
  inflow: {
    totalCount: number;
    list: any[];
    filter: IFilter;
  };
  records: {
    totalCount: number;
    list: any[];
    filter: IFilter;
  };
};
