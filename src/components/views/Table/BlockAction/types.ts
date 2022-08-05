import { IStatus } from '../types';

export interface IBlockAction {
  status: IStatus;
  id: number;
  handleUnblock: (id: number) => Promise<void>;
  handleBlock: (id: number) => Promise<void>;
  action: 'user' | 'account';
  tooltipClasses?: string;
}
