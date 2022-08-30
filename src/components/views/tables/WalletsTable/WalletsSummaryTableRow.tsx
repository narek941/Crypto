import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './WalletsTable.module.scss';

const WalletsSummaryTableRow = ({ row }: any) => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.totalCapital)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.totalCapitalInBaseCurrency)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.profitLossInBaseCurrency)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.profitLossInPercent || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row?.lastRefreshDate).format('DD.MM.YYYY HH:mm:ss')}
    </TableCell>
  </TableRow>
);

export default WalletsSummaryTableRow;
