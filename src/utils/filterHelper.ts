import { AlertType } from 'types/api/filters';

export const sideOptions = [
  { label: 'BUY', value: 'BUY' },
  { label: 'SELL', value: 'SELL' },
];

export const ordersTypeOptions = [
  { label: 'Limit', value: 'LIMIT' },
  { label: 'Stop loss limit', value: 'STOP_LOSS_LIMIT' },
];

export const typeOptions = [
  { label: 'Inflow', value: 'DEPOSIT' },
  { label: 'Outflow', value: 'WITHDRAWAL' },
];

export const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Blocked', value: 'BLOCKED' },
  { label: 'Deleted', value: 'DELETED' },
  { label: 'Email verification', value: 'EMAIL_VERIFICATION' },
];

export const AccountTypeOptions = [
  {
    label: 'Administrator',
    value: 'ADMIN',
  },
  {
    label: 'Analyst',
    value: 'ANALYST',
  },
  {
    label: 'Viewer',
    value: 'VIEWER',
  },
];

export const AlertsTypeOptions = [
  {
    label: 'Trade Fulfilled',
    value: AlertType.TRADE_FULFILLED,
  },
  {
    label: 'Stop Order Placed',
    value: AlertType.STOP_ORDER_PLACED,
  },
  {
    label: 'Stop Order Not Placed',
    value: AlertType.STOP_ORDER_NOT_PLACED,
  },
  {
    label: 'Maximum Drawdown Exceeded',
    value: AlertType.MAXIMUM_DRAWDOWN_EXCEEDED,
  },
  {
    label: 'Wrong Currency',
    value: AlertType.WRONG_CURRENCY,
  },
  {
    label: 'Maximum Position Exceeded',
    value: AlertType.MAXIMUM_POSITION_EXCEEDED,
  },
  {
    label: 'Risk Position',
    value: AlertType.RISK_POSITION,
  },
];
