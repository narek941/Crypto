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
import { useAppDispatch } from 'hooks';
import { TableDropdownIcon } from 'assets/icons';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import { accountsSelectors } from 'store/accountsSlice';

import styles from './OrdersTable.module.scss';

const OrdersTableRow = ({ row }: any): JSX.Element => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [wallerOrder, setWallerOrder] = useState<any | null>();
  const accountById = useSelector(accountsSelectors.selectAccountById);

  const { filter } = useSelector(walletsSelectors.selectOrders);

  const id = accountById?.wallets?.length && accountById.wallets[0]?.id;
  const coinName = accountById?.baseCurrency?.name;

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
          {(Number(row.stopPrice) && Number(row.stopPrice).toFixed(8)) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {(Number(row.limitPrice) && Number(row.limitPrice).toFixed(8)) || 0}
        </TableCell>

        <TableCell align='left' className={styles.ceil}>
          {(row.tradesTotalPriceSum && Number(row.tradesTotalPriceSum).toFixed(8)) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {(row.tradesTotalPriceInBaseCurrencySum &&
            Number(row.tradesTotalPriceInBaseCurrencySum).toFixed(8)) ||
            0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {(row.feesSum && Number(row.feesSum).toFixed(8)) || 0}
        </TableCell>
        <TableCell align='left' className={styles.ceil}>
          {(row.feesSumInBaseCurrency && Number(row.feesSumInBaseCurrency).toFixed(8)) || 0}
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
                        <Tooltip followCursor={true} placement='bottom' title='Time'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {moment(order?.tradeTime).format('DD.MM.YYYY HH:MM:SS')}
                          </TableCell>
                        </Tooltip>
                        <Tooltip followCursor={true} placement='bottom' title='Price'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.price)?.toFixed(8) || 0} ${order?.feesCoin}`}
                          </TableCell>
                        </Tooltip>
                        <Tooltip followCursor={true} placement='bottom' title='Amount'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.amount).toFixed(8) || 0} ${order?.feesCoin}`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip followCursor={true} placement='bottom' title='Total price'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.totalPrice).toFixed(8) || 0} ${order?.feesCoin}`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip
                          followCursor={true}
                          placement='bottom'
                          title={`Total price, <${coinName}>`}
                        >
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${
                              Number(order?.totalPriceInBaseCurrency).toFixed(8) || 0
                            } ${coinName}`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip followCursor={true} placement='bottom' title='Fees'>
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.fees).toFixed(8) || 0} ${order?.feesCoin}`}
                          </TableCell>
                        </Tooltip>

                        <Tooltip
                          followCursor={true}
                          placement='bottom'
                          title={`Fees, <${coinName}>`}
                        >
                          <TableCell
                            className={styles.container__body__row__ceil__collapse}
                            align='left'
                          >
                            {`${Number(order?.feesInBaseCurrency).toFixed(8) || 0} ${coinName}`}
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
