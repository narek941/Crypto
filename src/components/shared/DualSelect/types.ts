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
  text?: ReactNode | string | null | undefined;
  error: ErrorType;
  defaultChecked?: boolean;
  color?: ColorType;
  [prop: string]: any;
}
