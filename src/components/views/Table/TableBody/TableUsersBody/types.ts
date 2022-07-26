import { RowsType } from '../../types';

export interface ITableBodyProps {
  open: boolean;
  rows: RowsType[];
  handleClose?: () => void;
  toggleAlertOpen?: () => void;
  handleBlock: (id: number) => void;
  handleUnblock: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
}
