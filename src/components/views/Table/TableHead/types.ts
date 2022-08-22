import { HeadCell } from 'types';

import { KeyOfData, TypeType } from '../types';

export interface ITableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: KeyOfData) => void;
  rowCount: any;
  sort?: string;
  order?: string;
  type?: TypeType;
  headCells: HeadCell[];
}
