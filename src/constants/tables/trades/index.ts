import { TableHeaderRow } from 'types';

const tradesTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'Time',
  },
  {
    id: 2,
    value: 'Currency pair',
  },
  {
    id: 3,
    value: 'Side',
  },
  {
    id: 4,
    value: 'Price',
  },
  {
    id: 5,
    value: 'Amount',
  },
  {
    id: 7,
    value: 'Total price',
  },
  {
    id: 8,
    value: 'Total price',
    withBaseCurrency: true,
  },
  {
    id: 9,
    value: 'Fees',
  },
  {
    id: 10,
    value: 'Fees',
    withBaseCurrency: true,
  },
];

export default tradesTable;
