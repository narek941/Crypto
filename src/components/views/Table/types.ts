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
  action?: boolean;
  linkText?: 'user' | 'account';
  linkTo?: Routes;
}
export interface UserData {
  id: string;
  name: string;
  message: string;
  alertTigger: string;
  alertTime: string;
}

export type Order = 'asc' | 'desc';
