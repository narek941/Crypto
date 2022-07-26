import moment from 'moment';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import styles from './InflowsTable.module.scss';

const InflowsTableRow = ({ row }: any) => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil}>
      {row?.type === 'DEPOSIT' ? 'Inflow' : 'Outflow'}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.id}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {row?.coin?.name}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.amount)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row.amountInBaseCurrency)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {Number(row?.transactionFee)?.toFixed(8) || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil}>
      {moment(row?.type === 'DEPOSIT' ? row.insertTime : row?.applyTime).format(
        'DD.MM.YYYY HH:MM:SS',
      )}
    </TableCell>
  </TableRow>
);

export default InflowsTableRow;
