import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './WalletsTable.module.scss';

const WalletsSummaryTableRow = ({ walletId, row }: any) => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {walletId}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row.totalCapital}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row.totalCapitalInBaseCurrency}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row.profitLossInBaseCurrency}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row.profitLossInPercent}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row.lastRefreshDate).format('DD.MM.YYYY HH:MM:SS')}
    </TableCell>
  </TableRow>
);

export default WalletsSummaryTableRow;
