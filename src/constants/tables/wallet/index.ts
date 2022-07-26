import { TableHeaderRow } from 'types';

const walletSummaryTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'ID',
  },
  {
    id: 2,
    value: 'Capital, BTC',
  },
  {
    id: 3,
    value: 'Capital',
    withBaseCurrency: true,
  },
  {
    id: 4,
    value: 'Profit/Loss',
    withBaseCurrency: true,
  },
  {
    id: 5,
    value: 'Profit/Loss, %',
  },
  {
    id: 6,
    value: 'Time',
  },
];

const walletAssetsTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'Asset',
  },
  {
    id: 2,
    value: 'Amount',
  },
  {
    id: 3,
    value: 'Amount',
    withBaseCurrency: true,
  },
  {
    id: 4,
    value: 'Time',
  },
];

const walletTable = {
  summaryTable: walletSummaryTable,
  assetsTable: walletAssetsTable,
};

export default walletTable;
