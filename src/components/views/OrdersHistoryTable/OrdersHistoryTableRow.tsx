import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './OrdersHistoryTable.module.scss';

const OrdersHistoryTableRow = ({ row }: any): JSX.Element => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {row?.id}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.coinsPair?.name}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.side}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.type}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.value || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.valueInBaseCurrency || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.stopPrice || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.limitPrice || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.modifiers || '-'}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row?.lastOperationTime).format('DD.MM.YYYY HH:MM:SS')}
    </TableCell>
  </TableRow>
);

export default OrdersHistoryTableRow;
