import { client } from 'api';

export const walletOpenOrdersRequest = (id: any, params: any) =>
  client.get(`/wallets/${id}/orders/open`, {
    params,
  });

export const walletOrderTradesRequest = (id: number, orderID: number, params: any) =>
  client.get(`/wallets/${id}/orders/${orderID}/trades`, {
    params,
  });

export const walletOrdersRequest = (id: string, params: any) =>
  client.get(`/wallets/${id}/orders`, {
    params,
  });

export const walletInflowRequest = (id: number, params: any) =>
  client.get(`/wallets/${id}/inflow-outflow`, {
    params,
  });

export const walletSummaryRequest = (id: number) => client.get(`/wallets/${id}/summary`);

export const walletRecordsRequest = (id: string, params: any) =>
  client.get(`/wallets/${id}/records`, {
    params,
  });

export const accountOpenOrdersFilterValuesRequest = (id: number) =>
  client.get(`wallets/${id}/orders/open/filter-values`);

export const accountOrdersFilterValuesRequest = (id: number) =>
  client.get(`wallets/${id}/orders/filter-values`);

export const accountRecordFilterValuesRequest = (id: number) =>
  client.get(`wallets/${id}/records/filter-values`);

export const accountInflowFilterValuesRequest = (id: number) =>
  client.get(`wallets/${id}/inflow-outflow/filter-values`);

export const createManualInflowRequest = (id: number, restCredentials: any) =>
  client.post(`wallets/${id}/inflow-outflow`, restCredentials);

export const updateManualInflowRequest = (id: number, walletId: number, restCredentials: any) =>
  client.put(`wallets/${walletId}/inflow-outflow/${id}`, { ...restCredentials });

export const deleteManualInflowRequest = (id: number, walletId: number) =>
  client.del(`wallets/${walletId}/inflow-outflow/${id}`);
