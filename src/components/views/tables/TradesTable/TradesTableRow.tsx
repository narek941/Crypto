import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './TradesTable.module.scss';

const TradesTableRow = ({ row }: any) => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {moment(row?.tradeTime).format('DD.MM.YYYY HH:MM:SS')}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.coinsPair?.name}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.side}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {`${Number(row?.price)?.toFixed(8) || 0} ${row?.coinsPair?.to?.name}`}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {`${Number(row?.amount).toFixed(8) || 0} ${row?.coinsPair?.from?.name}`}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {`${Number(row?.totalPrice).toFixed(8) || 0} ${row?.coinsPair?.to?.name}`}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.totalPriceInBaseCurrency).toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.feesCoin
        ? `${Number(row?.fees).toFixed(8) || 0} ${row?.feesCoin}`
        : Number(row?.fees).toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.feesInBaseCurrency).toFixed(8) || 0}
    </TableCell>
  </TableRow>
);

export default TradesTableRow;
