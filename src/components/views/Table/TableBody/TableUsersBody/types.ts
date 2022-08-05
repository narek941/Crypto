import { RowsType } from '../../types';

export interface ITableBodyProps {
  open: boolean;
  rows: RowsType[];
  handleClose?: () => void;
  toggleAlertOpen?: () => void;
  handleBlock: (id: number) => Promise<void>;
  handleUnblock: (id: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}
