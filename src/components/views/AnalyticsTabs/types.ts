export interface IAnalyticsTabs {
  convertedId: number;
}

export enum TabType {
  wallet = 'wallet',
  inflow = 'inflow',
  history = 'orders-history',
  trades = 'trades',
  alerts = 'alerts',
  orders = 'orders',
}

export enum AccountTabType {
  spot = 'spot',
  futures = 'futures',
}
