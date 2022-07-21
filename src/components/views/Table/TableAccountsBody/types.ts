import { Order } from '../types';
import { TypeType, RowsType } from '../types';

export interface ITableAccountBodyProps {
  order?: Order;
  orderBy?: string;
  rows: RowsType[];
  page: number;
  open: boolean;
  rowsPerPage: number;
  type?: TypeType;
  action: 'users' | 'accounts' | 'alerts';
  handleChartAction?: (data: {
    id: number;
    statistics: any;
    startCapitalInBaseCurrency: any;
  }) => void;
  handleClose?: () => void;
  toggleAlertOpen?: () => void;
  handleBlock: (id: number) => void;
  handleUnblock: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
}
