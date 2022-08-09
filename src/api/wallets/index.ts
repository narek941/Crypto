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
