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
