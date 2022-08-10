import { ReactNode } from 'react';

type ErrorType = any | null;

export type ColorType = 'default' | 'primary';

export type Option = {
  label: string;
  value: string;
};

export interface ISelect {
  id: string;
  name: string;
  label?: string;
  callback?: any;
  error: ErrorType;
  color?: ColorType;
  options: Option[];
  className?: string;
  filterName?: string;
  [prop: string]: any;
  withAction?: boolean;
  defaultValue?: string;
  defaultChecked?: boolean;
  text?: ReactNode | string | null | undefined;
}
