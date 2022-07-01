import { SyntheticEvent } from 'react';

export interface IButton {
  children: JSX.Element | string;
  className?: string;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 's' | 'm' | 'l';
  color?: 'secondary' | 'primary';
}
