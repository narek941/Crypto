import { ReactNode } from 'react';

type ErrorType = any | null;

export type ColorType = 'default' | 'primary';

export type Option = {
  label: string;
  value: string;
};

export interface ISelect {
  id: string;
  className?: string;
  name: string;
  label?: string;
  text?: ReactNode | string | null | undefined;
  error: ErrorType;
  defaultChecked?: boolean;
  color?: ColorType;
  options: Option[];
  callback?: any;
  filterName?: string;
  withAction?: boolean;
  multiple?: boolean;
  [prop: string]: any;
}
