import { TableHeaderRow } from 'types';

const openOrdersTable: TableHeaderRow[] = [
  {
    id: 'ID',
    value: 'originalId',
    label: 'ID',
  },
  {
    id: 'createdAt',
    label: 'Created At',
    value: 'creationTime',
  },
  {
    id: 'pair',
    value: 'coinsPair.name',
    label: 'Symbol',
  },
  {
    id: 'Side',
    value: 'side',
    label: 'Side',
  },
  {
    id: 'Value',
    value: 'value',
    label: 'Value',
  },
  {
    id: 'value',
    value: 'valueInBaseCurrency',
    withBaseCurrency: true,
    label: 'Value',
  },
  {
    id: 'stop_price',
    label: 'Stop Price',
    value: 'stopPrice',
  },
  {
    id: 'limitPrice',
    label: 'Limit Price',
    value: 'limitPrice',
  },
  {
    id: 'receives',
    label: 'Received',
    value: 'tradesTotalPriceSum',
  },
  {
    id: 'receivedInBaseCurrency',
    label: 'Received',
    value: 'tradesTotalPriceInBaseCurrencySum',
    withBaseCurrency: true,
  },
  {
    id: 'Fee',
    value: 'feesSum',
    label: 'Fee',
  },
  {
    id: 'FeeInBaseCurrency',
    value: 'feesSumInBaseCurrency',
    label: 'Fee',
    withBaseCurrency: true,
  },
  {
    id: 'share',
    value: 'relativePercentageToAccount',
    label: 'Share, %',
  },
  {
    id: 'Updated',
    value: 'updatedAt',
    label: 'Updated',
  },
];

export default openOrdersTable;
