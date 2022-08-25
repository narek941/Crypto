import { SerializedError } from '@reduxjs/toolkit';

import { ITableFilter } from 'types/api';

export type AccountsSliceState = {
  loading: boolean;
  error?: SerializedError | null;
  accountById: any;
  coins: any[];
  accountAssetChart: any[];
  accountTradingPairsChart: any[];
  accountCapitalChart: any[];
  accountPerformanceChart: any[];
  accountsList: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
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
