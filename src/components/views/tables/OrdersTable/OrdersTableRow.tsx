import { useState } from 'react';
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
import { Tooltip } from '@mui/material';

import { EmptyData } from 'components';
import { TableDropdownIcon } from 'assets/icons';
import { useAppDispatch } from 'hooks';
import { walletsActions } from 'store/walletsSlice';
import { RootState } from 'types';

import styles from './OrdersTable.module.scss';

const OrdersTableRow = ({ row }: any): JSX.Element => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [wallerOrder, setWallerOrder] = useState<any | null>();
  const accounts = useSelector((state: RootState) => state.accounts);

  const { filter } = useSelector((state: RootState) => state.wallets.orders);

  const id = accounts.accountById?.wallets?.length && accounts.accountById.wallets[0]?.id;
  const baseCurrency = accounts.accountById?.baseCurrency?.coin?.name || '';
  const collapseClass = classNames({ [styles.open]: open });
  const dropdownClass = classNames({ [styles.dropdown]: open });

  const handleCollapse = async (orderId: number) => {
    if (!open) {
      const wallerOrderTrades = await dispatch(
        walletsActions.getWalletOrderTrades({ walletId: id, orderId, ...filter }),
      ).unwrap();

      if (wallerOrderTrades.list) {
        setWallerOrder(wallerOrderTrades.list);
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <TableRow className={styles.container__body__row} onClick={() => handleCollapse(row.id)}>
        <TableCell className={styles.ceil}>
          <IconButton aria-label='expand row' size='small'>
            <TableDropdownIcon className={dropdownClass} />
          </IconButton>
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {row?.originalId}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {moment(row.creationTime).format('DD.MM.YYYY HH:MM:SS')}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {row?.coinsPair?.name}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {row.side}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {Number(row.value).toFixed(8) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {Number(row.valueInBaseCurrency).toFixed(8) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {Number(row.tradesTotalPriceSum).toFixed(8) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {Number(row.tradesTotalPriceInBaseCurrencySum).toFixed(8) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {Number(row.feesSum).toFixed(8) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {Number(row.feesSumInBaseCurrency).toFixed(8) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {row.relativePercentageToAccount || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {moment(row.lastOperationTime).format('DD.MM.YYYY HH:MM:SS')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={14}
          className={styles.collapse__ceil}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box>
              {wallerOrder?.length ? (
                <Table size='small' aria-label='purchases' className={collapseClass}>
                  <TableBody className={styles.container__body}>
                    {wallerOrder?.map((order: any) => (
                      <TableRow key={order.id} className={styles.container__body__row}>
                        <Tooltip placement='bottom-start' title='Time'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {moment(order?.tradeTime).format('DD.MM.YYYY HH:MM:SS')}
                          </TableCell>
                        </Tooltip>
                        <Tooltip placement='bottom-start' title='Price'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.price)?.toFixed(8) || 0} ${
                              order?.coinsPair?.to?.name
                            }`}
                          </TableCell>
                        </Tooltip>
                        <Tooltip placement='bottom-start' title='Amount'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.amount).toFixed(8) || 0} ${
                              order?.coinsPair?.from?.name
                            }`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip placement='bottom-start' title='Total price'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.totalPrice).toFixed(8) || 0} ${
                              order?.coinsPair?.from?.name
                            }`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip placement='bottom-start' title={`Total price, <${baseCurrency}>`}>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.totalPriceInBaseCurrency).toFixed(8) || 0} ${
                              order?.coinsPair?.from?.name
                            }`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip placement='bottom-start' title='Fees'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.fees).toFixed(8) || 0} ${
                              order?.coinsPair?.from?.name
                            }`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip placement='bottom-start' title={`Fees, <${baseCurrency}>`}>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.feesInBaseCurrency).toFixed(8) || 0} ${
                              order?.coinsPair?.from?.name
                            }`}
                          </TableCell>
                        </Tooltip>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyData className={styles.empty} text={'This order has no trades yet.'} />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersTableRow;
