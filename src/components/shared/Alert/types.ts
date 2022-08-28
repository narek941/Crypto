import { SyntheticEvent } from 'react';
export interface AlertProps {
  ref?: any;
  open: boolean;
  className?: string;
  type: 'DELETE' | 'BLOCK' | 'UNBLOCK';
  handleClose: (e: SyntheticEvent) => void;
  handleAction: (id: number) => Promise<void>;
  id: number | null;
}
