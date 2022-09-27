import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './OrdersHistoryTable.module.scss';

const OrdersHistoryTableRow = ({ row }: any): JSX.Element => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {row?.originalId}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.symbol}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.side}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.type}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {`${Number(row?.value)?.toFixed(8) || 0} ${row?.coinsPair?.from?.name}`}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.valueInBaseCurrency)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {`${Number(row?.stopPrice)?.toFixed(8) || 0} ${row?.coinsPair?.to?.name}`}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {`${Number(row?.limitPrice)?.toFixed(8) || 0} ${row?.coinsPair?.to?.name}`}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.status || '-'}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.modifiers || '-'}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row?.lastOperationTime).format('DD.MM.YYYY HH:mm:ss')}
    </TableCell>
  </TableRow>
);

export default OrdersHistoryTableRow;
