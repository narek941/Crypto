import { AlertType, RoleType } from 'types/api';

export const sideOptions = [
  { label: 'BUY', value: 'BUY' },
  { label: 'SELL', value: 'SELL' },
];

export const ordersTypeOptions = [
  { label: 'Market', value: 'MARKET' },
  { label: 'Limit', value: 'LIMIT' },
  { label: 'Stop loss', value: 'STOP_LOSS' },
  { label: 'Stop loss limit', value: 'STOP_LOSS_LIMIT' },
  { label: 'Take profit', value: 'TAKE_PROFIT' },
  { label: 'Take profit limit', value: 'TAKE_PROFIT_LIMIT' },
  { label: 'Limit maker', value: 'LIMIT_MAKER' },
];

export const typeOptions = [
  { label: 'Inflow', value: 'DEPOSIT' },
  { label: 'Outflow', value: 'WITHDRAWAL' },
];

export const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Blocked', value: 'BLOCKED' },
];

export const AccountTypeOptions = [
  {
    label: 'Administrator',
    value: RoleType.ADMIN,
  },
  {
    label: 'Analyst',
    value: RoleType.ANALYST,
  },
  {
    label: 'Viewer',
    value: RoleType.VIEWER,
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
