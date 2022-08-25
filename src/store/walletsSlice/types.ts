import { SerializedError } from '@reduxjs/toolkit';

import { ITableFilter } from 'types/api';

export type WalletsSliceState = {
  loading: boolean;
  error?: SerializedError | null;
  summary: any;
  openOrders: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
  orderTrades: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
  orders: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
  inflow: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
  records: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
};
