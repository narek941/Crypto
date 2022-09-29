import { SerializedError } from '@reduxjs/toolkit';

import { ITableFilter } from 'types/api';
export type StringOrNull = null | string;
export type SideResponse = 'BUY' | 'SELL';

export interface IWalletSummaryResponse {
  lastRefreshDate: StringOrNull;
  profitLossInBaseCurrency: StringOrNull;
  profitLossInPercent: StringOrNull;
  totalCapital: StringOrNull;
  totalCapitalInBaseCurrency: StringOrNull;
}

export interface ICoinResponse {
  coin: StringOrNull;
  createdAt: StringOrNull;
  deletedAt: StringOrNull;
  id: number;
  name: StringOrNull;
  updatedAt: StringOrNull;
}

export interface ICoinPairResponse {
  createdAt: StringOrNull;
  deletedAt: StringOrNull;
  id: number;
  name: StringOrNull;
  updatedAt: StringOrNull;
  from: ICoinPairDirectionResponse;
  to: ICoinPairDirectionResponse;
}

export interface ICoinPairDirectionResponse {
  coin: StringOrNull;
  createdAt: StringOrNull;
  deletedAt: StringOrNull;
  id: number;
  name: StringOrNull;
  updatedAt: StringOrNull;
}

export interface IWalletTradesResponse {
  amount: StringOrNull;
  coinsPair: ICoinPairResponse;
  createdAt: StringOrNull;
  deletedAt: StringOrNull;
  fees: StringOrNull;
  feesCoin: StringOrNull;
  feesInBaseCurrency: StringOrNull;
  id: number;
  originalId: number;
  price: StringOrNull;
  side: SideResponse;
  totalPrice: StringOrNull;
  totalPriceInBaseCurrency: StringOrNull;
  tradeTime: StringOrNull;
  updatedAt: StringOrNull;
}

export interface IWalletRecordsResponse {
  baseCurrencyValue: StringOrNull;
  btcValue: StringOrNull;
  coin: ICoinResponse;
  createdAt: StringOrNull;
  deletedAt: StringOrNull;
  id: number;
  refreshAt: StringOrNull;
  statistics: {
    assetId: number;
    baseCurrencyValue: StringOrNull;
    buyRate: StringOrNull;
    currentRate: StringOrNull;
    openProfit: StringOrNull;
    walletId: number;
  };
  updatedAt: StringOrNull;
  value: StringOrNull;
}

export interface IWalletOrdersResponse {
  coinsPair: ICoinPairResponse;
  createdAt: StringOrNull;
  creationTime: StringOrNull;
  deletedAt: StringOrNull;
  id: number;
  lastOperationTime: StringOrNull;
  limitPrice: StringOrNull;
  modifiers: StringOrNull;
  originalId: StringOrNull;
  side: SideResponse;
  status: StringOrNull;
  stopPrice: StringOrNull;
  type: StringOrNull;
  updatedAt: StringOrNull;
  value: StringOrNull;
  valueInBaseCurrency: StringOrNull;
}

export interface IWalletInflowResponse {
  address: StringOrNull;
  amount: StringOrNull;
  amountInBaseCurrency: StringOrNull;
  applyTime: StringOrNull;
  coin: ICoinResponse;
  createdAt: StringOrNull;
  deletedAt: StringOrNull;
  id: number;
  api: string;
  insertTime: StringOrNull;
  network: StringOrNull;
  status: StringOrNull;
  transactionFee: StringOrNull;
  tx: StringOrNull;
  type: StringOrNull;
  updatedAt: StringOrNull;
}

export type WalletsSliceState = {
  loading: boolean;
  error?: SerializedError | null;
  summary: IWalletSummaryResponse;
  openOrders: {
    totalCount: number;
    list: any[];
    filter: ITableFilter;
  };
  orderTrades: {
    totalCount: number;
    list: IWalletTradesResponse[];
    filter: ITableFilter;
  };
  orders: {
    totalCount: number;
    list: IWalletOrdersResponse[];
    filter: ITableFilter;
  };
  inflow: {
    totalCount: number;
    list: IWalletInflowResponse[];
    filter: ITableFilter;
  };
  records: {
    totalCount: number;
    list: IWalletRecordsResponse[];
    filter: ITableFilter;
  };
};
