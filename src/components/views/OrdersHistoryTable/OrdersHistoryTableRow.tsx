import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { v4 as uuid4 } from 'uuid';

import styles from './OrdersHistoryTable.module.scss';

const OrdersHistoryTableRow = ({ row }: any): JSX.Element => {
  return (
    <TableRow className={styles.container__body__row}>
      <>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {row.id}
        </TableCell>

        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {row.coin.name}
          {/* {moment(row.creationTime).format('DD.MM.YYYY HH:MM:SS')} */}
        </TableCell>

        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row?.coinsPair?.name} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.side} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.value} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.valueInBaseCurrency} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.tradesTotalPriceSum || 0} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.tradesTotalPriceInBaseCurrencySum || 0} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.feesSum || 0} */}
        </TableCell>
        <TableCell align='left' className={styles.ceil} key={uuid4()}>
          {/* {row.feesSumInBaseCurrency || 0} */}
        </TableCell>
      </>
    </TableRow>
  );
};

export default OrdersHistoryTableRow;
