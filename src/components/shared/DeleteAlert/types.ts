export interface AlertProps {
  ref?: any;
  open: boolean;
  className?: string;
  handleClose: () => void;
  handleDelete: (id: number) => Promise<void>;
  id: number | null;
}
