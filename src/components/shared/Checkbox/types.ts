import { ReactNode } from 'react';

type errorType = any | null;

export type ColorType = 'default' | 'primary';

export interface ICheckbox {
  id: string;
  className?: string;
  name: string;
  text: ReactNode | string | null | undefined;
  error: errorType;
  defaultChecked?: boolean;
  color?: ColorType;
  [prop: string]: any;
}
