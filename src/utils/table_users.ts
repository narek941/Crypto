import { HeadCell, Order } from 'components/views/Table/types';

export const rows = [
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
  ['1', 'System User', 'Order created with Currency  FTMSDTD !', '21.01.2022 16:21:01', 'Currency'],
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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
    id: 'message',
    numeric: true,
    disablePadding: false,
    label: 'Message',
  },
  {
    id: 'alertTime',
    numeric: true,
    disablePadding: false,
    label: 'Alert Time',
  },
  {
    id: 'alertTigger',
    numeric: true,
    disablePadding: false,
    label: 'Alerts trigger',
  },
];
