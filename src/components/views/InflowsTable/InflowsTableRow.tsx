import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { v4 as uuid4 } from 'uuid';

import styles from './InflowsTable.module.scss';

const InflowsTableRow = ({ row }: any) => (
  <TableRow className={styles.container__body__row}>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {row?.type}
    </TableCell>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {row?.id}
    </TableCell>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {row?.coin?.name}
    </TableCell>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {row?.amount}
    </TableCell>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {row.amountInBaseCurrency || 0}
    </TableCell>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {row?.transactionFee}
    </TableCell>
    <TableCell align='left' className={styles.ceil} key={uuid4()}>
      {moment(row?.type === 'DEPOSIT' ? row.insertTime : row?.applyTime).format(
        'DD.MM.YYYY HH:MM:SS',
      )}
    </TableCell>
  </TableRow>
);

export default InflowsTableRow;
