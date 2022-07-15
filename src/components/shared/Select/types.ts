import { ReactNode } from 'react';

type ErrorType = any | null;

export type ColorType = 'default' | 'primary';

export interface ISelect {
  id: string;
  className?: string;
  name: string;
  text?: ReactNode | string | null | undefined;
  error: ErrorType;
  defaultChecked?: boolean;
  color?: ColorType;
  data: string[];
  [prop: string]: any;
}
