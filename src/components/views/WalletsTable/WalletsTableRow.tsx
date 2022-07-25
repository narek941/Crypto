import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './WalletsTable.module.scss';

const WalletsTableRow = ({ row }: any) => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {row?.coin?.name}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row.value}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row.baseCurrencyValue}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row.refreshAt).format('DD.MM.YYYY HH:MM:SS')}
    </TableCell>
  </TableRow>
);

export default WalletsTableRow;
