import { HeadCell } from 'types';

import { TypeType } from '../types';

export interface ITableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  rowCount: any;
  sort?: string;
  order?: string;
  type?: TypeType;
  headCells: HeadCell[];
}
