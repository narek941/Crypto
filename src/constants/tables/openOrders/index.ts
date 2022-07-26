import { TableHeaderRow } from 'types';

const openOrdersTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'ID',
  },
  {
    id: 2,
    value: 'Created at',
  },
  {
    id: 3,
    value: 'Pair',
  },
  {
    id: 4,
    value: 'Side',
  },
  {
    id: 5,
    value: 'Value',
  },
  {
    id: 6,
    value: 'Value',
    withBaseCurrency: true,
  },
  {
    id: 7,
    value: 'Received',
  },
  {
    id: 8,
    value: 'Received',
    withBaseCurrency: true,
  },
  {
    id: 9,
    value: 'Fee',
  },
  {
    id: 10,
    value: 'Fee',
    withBaseCurrency: true,
  },
  {
    id: 11,
    value: 'Share',
  },
  {
    id: 12,
    value: 'Updated',
  },
];

export default openOrdersTable;
