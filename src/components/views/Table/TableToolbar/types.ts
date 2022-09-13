import { Routes } from 'types';

export interface ITableToolbarProps {
  linkText?: 'user' | 'account';
  linkTo?: Routes;
  onClick?: any;
  action: 'users' | 'accounts' | 'alerts';
}
