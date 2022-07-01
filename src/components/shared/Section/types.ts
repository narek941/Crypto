import { ReactNode } from 'react';

export type colorType = 'light' | 'dark';

export interface ISection {
  className?: string;
  children: ReactNode;
  color: colorType;
}
