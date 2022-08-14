import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import styles from './AnalyticsAlertTable.module.scss';

const AnalyticsAlertTableRow = ({ row }: any) => (
  <>
    <TableRow className={styles.container__body__row}>
      <TableCell align='left' className={styles.ceil}>
        {row?.id}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {row?.type}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {row?.message}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {moment(row?.createdAt).format('DD.MM.YYYY HH:MM:SS')}
      </TableCell>
    </TableRow>
  </>
);

export default AnalyticsAlertTableRow;
