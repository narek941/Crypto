import { Routes } from 'types/routes';

export interface Data {
  id: string;
  name: string;
  seed_capital: string;
  current_capital: string;
  time: string;
  open_profit: string;
  earned_capital: string;
  earned_capital_2: string;
  open_profit_2: string;
  status: string;
  trades: string;
  actions: any;
}

export type KeyOfData = keyof Data | keyof UserData;
export interface HeadCell {
  disablePadding: boolean;
  isSort?: boolean;
  id: KeyOfData;
  label: string;
  numeric: boolean;
}
export type RowsType = string[];

export type TypeType = 'primary' | 'secondary' | 'tertiary';

export interface ITableProps {
  rows: RowsType[];
  headCells: HeadCell[];
  type: TypeType;
  action: 'users' | 'accounts' | 'alerts';
  linkText?: 'user' | 'account';
  linkTo?: Routes;
  users?: boolean;
  handleClose?: () => void;
  take: number;
  order?: string;
  totalCount: number;
}
export interface UserData {
  id: string;
  name: string;
  message: string;
  alertTigger: string;
  alertTime: string;
  email: string;
  accountType: string;
  status: string;
  action?: string;
}

export type Order = 'asc' | 'desc';

export type IStatus = 'ACTIVE' | 'DELETED' | 'BLOCKED' | 'EMAIL_VERIFICATION';
