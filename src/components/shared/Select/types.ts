import { ReactNode } from 'react';

type errorType = any | null;

export type colorType = 'default' | 'primary';

export interface ISelect {
  id: string;
  className?: string;
  name: string;
  text?: ReactNode | string | null | undefined;
  error: errorType;
  defaultChecked?: boolean;
  color?: colorType;
  [prop: string]: any;
}
