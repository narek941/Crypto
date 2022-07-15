import { Order } from '../types';

import { TypeType, RowsType } from './../types';

export interface ITableBodyProps {
  order?: Order;
  orderBy?: string;
  rows: RowsType[];
  page: number;
  rowsPerPage: number;
  type?: TypeType;
  action?: boolean;
  handleChartAction?: () => void;
}
