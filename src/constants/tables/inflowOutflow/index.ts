import { TableHeaderRow } from 'types';

export const inflowOutflowTable: TableHeaderRow[] = [
  {
    id: 'id',
    value: 'id',
    label: 'ID',
  },

  {
    id: 'Type',
    label: 'Type',
    value: 'type',
  },

  {
    id: 'Asset',
    label: 'Asset',
    value: 'network',
  },
  {
    id: 'Amount',
    label: 'Amount',
    value: 'amount',
  },
  {
    id: 'Amount',
    label: 'Amount',
    value: 'amountInBaseCurrency',
    withBaseCurrency: true,
  },
  {
    id: 'Fees',
    label: 'Fees',
    value: 'transactionFee',
  },
  {
    id: 'time',
    label: 'Time',
    value: 'insertTime',
  },
];

export default inflowOutflowTable;
