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

export interface IPlatform {
  platform: any;
}

export interface IPlatformApi {
  api: any;
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

export enum RoleType {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  ANALYST = 'ANALYST',
}

export enum StatusType {
  BLOCKED = 'BLOCKED',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export interface IExportParams {
  filename: string;
  fromDate: string | Date;
  toDate: string | Date;
}
