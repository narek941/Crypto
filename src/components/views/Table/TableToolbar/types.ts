import { Routes } from 'types';

export interface ITableToolbarProps {
  linkText?: 'user' | 'account';
  linkTo?: Routes;
  onClick?: any;
  action: ActionType.USERS | ActionType.ACCOUNTS | ActionType.ALERTS;
}

export enum AccountTabType {
  spot = 'spot',
  futures = 'futures',
}

export enum ActionType {
  USERS = 'users',
  ACCOUNTS = 'accounts',
  ALERTS = 'alerts',
}

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}
