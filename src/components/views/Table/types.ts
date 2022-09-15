import { HeadCell } from 'types';
import { Routes } from 'types/routes';

import { ActionType } from './TableToolbar/types';

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

export type RowsType = string[];

export type TypeType = 'primary' | 'secondary' | 'tertiary';

export interface ITableProps {
  rows: RowsType[];
  headCells: HeadCell[];
  type: TypeType;
  sort?: string;
  action: ActionType.USERS | ActionType.ACCOUNTS | ActionType.ALERTS;
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
  alertTrigger: string;
  alertTime: string;
  email: string;
  accountType: string;
  status: string;
  action?: string;
}

export type Order = 'asc' | 'desc';

export type IStatus = 'ACTIVE' | 'DELETED' | 'BLOCKED';

export type SelectedAccount = {
  id: number | null;
  statistics: any | null;
  startCapitalInBaseCurrency: any | null;
  baseCurrency?: string;
  name: string;
};
