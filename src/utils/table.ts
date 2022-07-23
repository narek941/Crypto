import { OrdersTable } from 'components';
import { HeadCell, Order } from 'components/views/Table/types';

export const rows = [
  [
    '13',
    'John',
    '5.567 USDT',
    '15.567 USDT',
    '21.01.2022 16:...',
    '44%',
    '0,245 USDT',
    '0,11245 USDT',
    '0,115 USDT',
    'Active',
    '145',
  ],
];

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'seed_capital',
    numeric: true,
    disablePadding: false,
    label: 'Seed Capital',
  },
  {
    id: 'current_capital',
    numeric: true,
    disablePadding: false,
    label: 'Current Capital',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'open_profit',
    numeric: true,
    disablePadding: false,
    label: 'Open Profit',
  },
  {
    id: 'earned_capital',
    numeric: true,
    disablePadding: false,
    label: 'Earned Capital',
  },
  {
    id: 'earned_capital_2',
    numeric: true,
    disablePadding: false,
    label: 'Earned Capital',
  },
  {
    id: 'open_profit_2',
    numeric: true,
    disablePadding: false,
    label: 'Open Profit',
  },

  {
    id: 'trades',
    numeric: true,
    disablePadding: false,
    label: 'Avg.Trades',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

export const accountsAnalyticsData = [
  { name: 'Seed Capital', value: '5.567,567' },
  { name: 'Performance', value: '144%' },
  { name: 'Current Capital, USDT', value: '18.567,567', moreInfo: '21.01.2022 16:21:01' },
  { name: 'Current open profit, USDT', value: '647.567,567%' },
  { name: 'Earned capital, USDT', value: '-318,4848' },
];

const labels = [
  '',
  '',
  'Jan',
  '',
  '',
  'Mar',
  '',
  '',
  'May',
  '',
  '',
  'Jul',
  '',
  '',
  'Sep',
  '',
  '',
  'Nov',
  '',
];

export const accountsAnalyticsLineChart = [
  {
    data: {
      labels,
      datasets: [
        {
          data: [50, 44, 59, 59, 67, 70, 74, 62, 76, 71, 72, 68, 81, 77, 78, 75, 58, 58, 51],
          borderColor: '#009688',
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
  {
    data: {
      labels,
      datasets: [
        {
          data: [50, 44, 59, 59, 67, 70, 74, 62, 76, 71, 72, 68, 81, 77, 78, 75, 58, 58, 51],
          borderColor: '#009688',
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
];

export const orderTradesHeader: { id: number; value: string }[] = [
  { id: 1, value: 'ID' },
  { id: 2, value: 'Created at' },
  { id: 3, value: 'Pair' },
  { id: 4, value: 'Side' },
  { id: 5, value: 'Value' },
  { id: 6, value: 'Value, USDT' },
  { id: 7, value: 'Received' },
  { id: 8, value: 'Received, USDT' },
  { id: 9, value: 'Fee' },
  { id: 10, value: 'Fee, USDT' },
  { id: 11, value: 'Share' },
  { id: 12, value: 'Updated' },
];

export const orderHistoryTradesHeader: { id: number; value: string }[] = [
  { id: 1, value: 'ID' },
  { id: 2, value: 'Pair' },
  { id: 3, value: 'Side' },
  { id: 4, value: 'Type' },
  { id: 5, value: 'Value' },
  { id: 6, value: 'Value, USDT' },
  { id: 7, value: 'Stop Price' },
  { id: 8, value: 'Limit Price' },
  { id: 9, value: 'Modifiers' },
  { id: 10, value: 'Last Operation Time' },
];

export const tradesHeader: { id: number; value: string }[] = [
  { id: 1, value: 'Time' },
  { id: 2, value: 'Currency pair' },
  { id: 3, value: 'Side' },
  { id: 4, value: 'Price' },
  { id: 5, value: 'Amount, BTC' },
  { id: 6, value: 'Value USDT' },
  { id: 7, value: 'Total price' },
  { id: 8, value: 'Total price, USDT' },
  { id: 9, value: 'Fees' },
  { id: 10, value: 'Fees USDT' },
];

export const walletHeader: { id: number; value: string }[] = [
  { id: 1, value: 'ID' },
  { id: 2, value: 'Capital, BTC' },
  { id: 3, value: 'Capital, USDT' },
  { id: 4, value: 'Profit/Loss, USDT' },
  { id: 5, value: 'Profit/Loss, %' },
  { id: 6, value: 'Time' },
];

export const inflowHeader: { id: number; value: string }[] = [
  { id: 1, value: 'Time' },
  { id: 2, value: 'ID' },
  { id: 3, value: 'Asset' },
  { id: 4, value: 'Amount' },
  { id: 5, value: 'Amount,USDT' },
  { id: 6, value: 'Fees' },
  { id: 7, value: 'Time' },
];

export const analyticsAlertHeader: { id: number; value: string }[] = [
  { id: 1, value: 'ID' },
  { id: 2, value: 'Message' },
  { id: 3, value: 'Alert Time' },
  { id: 4, value: 'Alerts trigger' },
];

export const tabList: { id: number; name: string; Component?: typeof OrdersTable }[] = [
  { id: 0, name: 'Open orders' },
  { id: 1, name: 'Wallet' },
  { id: 2, name: 'Inflows & Outflows' },
  { id: 3, name: 'Orders History' },
  { id: 4, name: 'Trades' },
  { id: 5, name: 'Alerts' },
];
