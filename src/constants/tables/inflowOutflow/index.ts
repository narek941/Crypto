import { TableHeaderRow } from 'types';

export const inflowOutflowTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'Type',
  },
  {
    id: 2,
    value: 'ID',
  },
  {
    id: 3,
    value: 'Asset',
  },
  {
    id: 4,
    value: 'Amount',
  },
  {
    id: 5,
    value: 'Amount',
    withBaseCurrency: true,
  },
  {
    id: 6,
    value: 'Fees',
  },
  {
    id: 7,
    value: 'Time',
  },
];

export default inflowOutflowTable;
