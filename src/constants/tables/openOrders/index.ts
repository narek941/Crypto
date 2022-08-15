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
    value: 'Stop Price',
  },
  {
    id: 8,
    value: 'Limit Price',
  },
  {
    id: 9,
    value: 'Received',
  },
  {
    id: 10,
    value: 'Received',
    withBaseCurrency: true,
  },
  {
    id: 11,
    value: 'Fee',
  },
  {
    id: 12,
    value: 'Fee',
    withBaseCurrency: true,
  },
  {
    id: 13,
    value: 'Share',
  },
  {
    id: 14,
    value: 'Updated',
  },
];

export default openOrdersTable;
