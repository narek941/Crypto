import moment from 'moment';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import styles from '../../Table.module.scss';

import { ITableAlertsBodyProps } from './types';

const TableAlertsBody = ({ rows }: ITableAlertsBodyProps) => {
  const renderRows = rows.map(({ id, account, message, createdAt, type }: any, index) => (
    <TableRow className={styles.table__body__row} tabIndex={id} key={index}>
      <TableCell align='left' className={styles.table__body__row__ceil}>
        {id}
      </TableCell>
      <TableCell align='left' className={styles.table__body__row__ceil}>
        {account?.name}
      </TableCell>
      <TableCell align='left' className={styles.table__body__row__ceil}>
        {message}
      </TableCell>
      <TableCell align='left' className={styles.table__body__row__ceil}>
        {moment(createdAt).format('DD.MM.YYYY HH:MM:SS')}
      </TableCell>
      <TableCell align='left' className={styles.table__body__row__ceil}>
        {type}
      </TableCell>
    </TableRow>
  ));

  return <tbody className={styles.table__body}>{renderRows}</tbody>;
};

export default TableAlertsBody;
