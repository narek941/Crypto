import { HeadCell, KeyOfData, Order, TypeType } from '../types';

export interface ITableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: KeyOfData) => void;
  order: Order;
  orderBy: string;
  rowCount: any;
  type?: TypeType;
  headCells: HeadCell[];
}
