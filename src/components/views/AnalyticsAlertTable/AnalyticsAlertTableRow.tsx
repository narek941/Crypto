import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { v4 as uuid4 } from 'uuid';

import styles from './AnalyticsAlertTable.module.scss';

const AnalyticsAlertTableRow = ({ row }: any) => {
  return (
    <React.Fragment>
      <TableRow className={styles.container__body__row}>
        <>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {moment(row.createdAt).format('DD.MM.YYYY HH:MM:SS')}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row?.coinsPair?.name}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.side}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.price}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.amount}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.value}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.totalPrice || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.totalPriceInBaseCurrency || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.fees || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.feesInBaseCurrency || 0}
          </TableCell>
        </>
      </TableRow>
    </React.Fragment>
  );
};

export default AnalyticsAlertTableRow;
