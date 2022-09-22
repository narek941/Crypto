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
  text?: ReactNode | string | null | undefined;
  error: ErrorType;
  color?: ColorType;
  options: Option[];
  className?: string;
  multiple?: boolean;
  filterName?: string;
  withAction?: boolean;
  transformLabel: boolean;
  closed?: boolean;
  withClear?: boolean;
  numeric: boolean;
  [prop: string]: any;
}
