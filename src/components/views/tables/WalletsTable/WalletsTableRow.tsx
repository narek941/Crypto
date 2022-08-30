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
      {Number(row.value)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row.baseCurrencyValue)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {!isNaN(Number(row.statistics?.currentRate))
        ? Number(row.statistics?.currentRate)?.toFixed(8)
        : 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {!isNaN(Number(row.statistics?.buyRate)) ? Number(row.statistics?.buyRate)?.toFixed(8) : 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {!isNaN(Number(row.statistics?.openProfit))
        ? Number(row.statistics?.openProfit)?.toFixed(8)
        : 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row.refreshAt).format('DD.MM.YYYY HH:MM:SS')}
    </TableCell>
  </TableRow>
);

export default WalletsTableRow;
