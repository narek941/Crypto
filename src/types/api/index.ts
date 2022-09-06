export type MutateData = () => void;

export interface ICommonRequestReturn {
  isError: boolean;
  isLoading: boolean;
}

export interface IFilter {
  skip: number;
  take: number;
  sort: string;
  search: any;
  order: 'DESC' | 'ASC';
  id?: string;
}
export interface ITableFilter extends IFilter {
  filter: any;
}

export enum AlertType {
  TRADE_FULFILLED = 'TRADE_FULFILLED',
  STOP_ORDER_PLACED = 'STOP_ORDER_PLACED',
  STOP_ORDER_NOT_PLACED = 'STOP_ORDER_NOT_PLACED',
  WRONG_CURRENCY = 'WRONG_CURRENCY',
  MAXIMUM_DRAWDOWN_EXCEEDED = 'MAXIMUM_DRAWDOWN_EXCEEDED',
  MAXIMUM_POSITION_EXCEEDED = 'MAXIMUM_POSITION_EXCEEDED',
  RISK_POSITION = 'RISK_POSITION',
}

export interface IExportParams {
  filename: string;
  fromDate: string | Date;
  toDate: string | Date;
}
