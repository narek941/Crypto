export interface AlertProps {
  ref?: any;
  open: boolean;
  className?: string;
  type: 'DELETE' | 'BLOCK' | 'UNBLOCK';
  handleClose: () => void;
  handleAction: (id: number) => Promise<void>;
  id: number | null;
}
