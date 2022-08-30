import { TableHeaderRow } from 'types';

const walletSummaryTable: TableHeaderRow[] = [
  {
    id: 2,
    label: 'Capital, BTC',
  },
  {
    id: 3,
    label: 'Capital',
    withBaseCurrency: true,
  },
  {
    id: 4,
    label: 'Profit/Loss',
    withBaseCurrency: true,
  },
  {
    id: 5,
    label: 'Profit/Loss, %',
  },
  {
    id: 6,
    label: 'Time',
  },
];

const walletAssetsTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'coin.name',
    label: 'Asset',
  },
  {
    id: 2,
    value: 'value',
    label: 'Amount',
  },
  {
    id: 3,
    value: 'baseCurrencyValue',
    label: 'Amount',
    withBaseCurrency: true,
  },
  {
    id: 4,
    value: 'statistics.currentRate',
    label: 'Current rate',
  },
  {
    id: 5,
    value: 'statistics.buyRate',
    label: 'Buy rate',
  },
  {
    id: 6,
    value: 'statistics.openProfit',
    label: 'Open profit',
  },
  {
    id: 7,
    label: 'Time',
    value: 'createdAt',
  },
];

const walletTable = {
  summaryTable: walletSummaryTable,
  assetsTable: walletAssetsTable,
};

export default walletTable;
