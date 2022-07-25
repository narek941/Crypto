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
      {row?.price || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.amount || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.totalPrice || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.totalPriceInBaseCurrency || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.fees || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.feesInBaseCurrency || 0}
    </TableCell>
  </TableRow>
);

export default TradesTableRow;
