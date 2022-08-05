import { KeyOfData } from 'components/views/Table/types';

export interface HeadCell {
  id: KeyOfData;
  label: string;
  isSort?: boolean;
}

export type TableHeaderRow = {
  id: number;
  value: string;
  withBaseCurrency?: boolean;
};