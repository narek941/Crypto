import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { v4 as uuid4 } from 'uuid';

import { TableDropdownIcon } from 'assets/icons';
import { useAppDispatch } from 'hooks';
import { accountsActions } from 'store/accountsSlice';
import { RootState } from 'types';

import EmptyData from '../EmptyData';

import styles from './OrdersTable.module.scss';

const OrdersTableRow = ({ row }: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [wallerOrder, setWallerOrder] = React.useState<any | null>();
  const accounts = useSelector((state: RootState) => state.accounts);

  const id = accounts.accountById?.wallets?.length && accounts.accountById.wallets[0]?.id;
  const collapseClass = classNames({ [styles.open]: open });
  const dropdownClass = classNames({ [styles.dropdown]: open });

  const handleCollapse = async (orderId: number) => {
    if (!open) {
      const wallerOrderTrades = await dispatch(
        accountsActions.getWalletOrderTrades({ walletId: id, orderId }),
      ).unwrap();

      if (wallerOrderTrades.orderTrades[0]) {
        setWallerOrder(wallerOrderTrades.orderTrades[0]);
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <TableRow className={styles.container__body__row} onClick={() => handleCollapse(row.id)}>
        <TableCell className={styles.ceil}>
          <IconButton aria-label='expand row' size='small'>
            <TableDropdownIcon className={dropdownClass} />
          </IconButton>
        </TableCell>
        <>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.id}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {moment(row.creationTime).format('DD.MM.YYYY HH:MM:SS')}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row?.coinsPair?.name}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.side}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.value}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.valueInBaseCurrency}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.tradesTotalPriceSum || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.tradesTotalPriceInBaseCurrencySum || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.feesSum || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.feesSumInBaseCurrency || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.relativePercentageToAccount || 0}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {moment(row.lastOperationTime).format('DD.MM.YYYY HH:MM:SS')}
          </TableCell>
        </>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={14}
          className={styles.collapse__ceil}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box>
              {wallerOrder ? (
                <>
                  <Table size='small' aria-label='purchases' className={collapseClass}>
                    <TableBody className={styles.container__body}>
                      <TableRow className={styles.container__body__row}>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {moment(wallerOrder?.createdAt).format('MM.DD.YY')}
                        </TableCell>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {wallerOrder.price}
                        </TableCell>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {wallerOrder.totalPrice} BTC
                        </TableCell>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {wallerOrder.totalPriceInBaseCurrency} USDT
                        </TableCell>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {wallerOrder.amount} BTC
                        </TableCell>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {wallerOrder.fees} USDT
                        </TableCell>
                        <TableCell
                          className={styles.container__body__row__ceil__collapse}
                          align='left'
                        >
                          {wallerOrder.feesInBaseCurrency} USDT
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              ) : (
                <EmptyData className={styles.empty} text={'This order has no trades yet.'} />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default OrdersTableRow;
