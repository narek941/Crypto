import { TableHeaderRow } from 'types';

const tradesTable: TableHeaderRow[] = [
  {
    id: 1,
    label: 'Time',
    value: 'tradeTime',
  },
  {
    id: 2,
    label: 'Symbol',
    value: 'coinsPair.name',
  },
  {
    id: 3,
    label: 'Side',
    value: 'side',
  },
  {
    id: 4,
    label: 'Price',
    value: 'price',
  },
  {
    id: 5,
    label: 'Amount',
    value: 'amount',
  },
  {
    id: 7,
    label: 'Total price',
    value: 'totalPrice',
  },
  {
    id: 8,
    label: 'Total price',
    value: 'totalPriceInBaseCurrency',
    withBaseCurrency: true,
  },
  {
    id: 9,
    label: 'Fees',
    value: 'fees',
  },
  {
    id: 10,
    label: 'Fees',
    value: 'feesInBaseCurrency',
    withBaseCurrency: true,
  },
];

export default tradesTable;
