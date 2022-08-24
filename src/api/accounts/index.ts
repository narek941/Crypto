import { AxiosRequestConfig } from 'axios';

import { client } from 'api';

export const accountListRequest = (params: AxiosRequestConfig['params']) =>
  client.get('/accounts', { params });

export const accountByIdRequest = (userID: number) => client.get(`/accounts/${userID}`);

export const accountSummaryRequest = (id: number) => client.get(`/accounts/${id}/summary`);

export const accountTradesListRequest = (id: string, params: any) =>
  client.get(`/accounts/${id}/trades-list`, {
    params,
  });

export const accountAlertsRequest = (id: string, params: any) =>
  client.get(`/accounts/${id}/alerts`, {
    params,
  });

export const accountAssetChartRequest = (id: number) =>
  client.get(`/accounts/${id}/assets-chart-data`);

export const accountTradingPairsChartRequest = (id: number) =>
  client.get(`/accounts/${id}/trading-pairs-chart-data`);

export const accountCapitalChartRequest = (id: number) =>
  client.get(`/accounts/${id}/daily-account-statistics`);

export const accountPerformanceChartRequest = (id: number) =>
  client.get(`/accounts/${id}/daily-wallets-statistics`);
