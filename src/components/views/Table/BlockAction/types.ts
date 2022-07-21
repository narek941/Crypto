import { IStatus } from '../types';

export interface IBlockAction {
  status: IStatus;
  id: number;
  handleUnblock: (id: number) => void;
  handleBlock: (id: number) => void;
  action: 'user' | 'account';
  tooltipClasses?: string;
}
