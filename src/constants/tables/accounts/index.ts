import { HeadCell } from 'types';

const accountsTable: HeadCell[] = [
  {
    id: 'id',
    value: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    value: 'name',
    label: 'Name',
  },
  {
    id: 'seed_capital',
    value: 'statistics.startCapitalInBaseCurrency',
    label: 'Seed Capital',
  },
  {
    id: 'current_capital',
    value: 'statistics.currentCapitalInBaseCurrency',
    label: 'Current Capital',
  },
  {
    id: 'time',
    value: 'createdAt',
    label: 'Time',
  },
  {
    id: 'open_profit_in_percent',
    value: 'statistics.currentOpenProfitInPercent',
    label: 'Open Profit, %',
  },
  {
    id: 'earned_capital',
    value: 'statistics.earnedCapitalInBaseCurrency',
    label: 'Earned Capital',
  },
  {
    id: 'earned_capital_2',
    value: 'statistics.earnedCapitalInPercent',
    label: 'Earned Capital, %',
  },
  {
    id: 'open_profit_2',
    value: 'statistics.currentOpenProfitInBaseCurrency',
    label: 'Open Profit',
  },
  {
    id: 'status',
    value: 'status',
    label: 'Status',
  },

  {
    id: 'trades',
    value: 'statistics.numberDailyTransactions',
    label: 'Avg.Trades',
  },

  {
    id: 'actions',
    label: 'Actions',
  },
];

export default accountsTable;
