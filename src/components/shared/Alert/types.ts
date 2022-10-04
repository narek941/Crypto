import { SyntheticEvent } from 'react';
export interface AlertProps {
  ref?: any;
  open: boolean;
  className?: string;
  type:
    | 'DELETE'
    | 'BLOCK'
    | 'UNBLOCK'
    | 'SYNCING'
    | 'SYNCING_ADD'
    | 'DELETE_INFLOW'
    | 'SYNCING_INFLOW';
  handleClose: (e: SyntheticEvent) => void;
  handleAction?: (id: number) => Promise<void>;
  id?: number | null;
  isActionIsDone?: boolean;
  text?: string;
}
