import { TableHeaderRow } from 'types';

const ordersHistoryTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'originalId',
    label: 'ID',
  },
  {
    id: 2,
    value: 'coinsPair.name',
    label: 'Symbol',
  },
  {
    id: 3,
    value: 'side',
    label: 'Side',
  },
  {
    id: 4,
    value: 'type',
    label: 'Type',
  },
  {
    id: 5,
    label: 'Value',
    value: 'value',
  },
  {
    id: 6,
    label: 'Value',
    value: 'valueInBaseCurrency',
    withBaseCurrency: true,
  },
  {
    id: 7,
    label: 'Stop Price',
    value: 'stopPrice',
  },
  {
    id: 8,
    label: 'Limit Price',
    value: 'limitPrice',
  },
  {
    id: 9,
    label: 'Status',
    value: 'status',
  },
  {
    id: 10,
    value: 'modifiers',
    label: 'Modifiers',
  },
  {
    id: 11,
    value: 'lastOperationTime',
    label: 'Last Operation Time',
  },
];

export default ordersHistoryTable;
