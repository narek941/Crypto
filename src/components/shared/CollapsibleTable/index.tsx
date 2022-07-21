import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { v4 as uuid4 } from 'uuid';

import { TableDropdownIcon } from 'assets/icons';
import { EmptyData, Pagination } from 'components';
import { RootState } from 'types';
import { useAppDispatch } from 'hooks';
import { accountsActions } from 'store/accountsSlice';

import styles from './CollapsibleTable.module.scss';

const headArr = [
  'ID',
  'Created',
  'Pair',
  'Side',
  'Value',
  'ValueUSDT',
  'Received',
  'Received, USDT',
  'Fee',
  'FeeUSDT',
  'Share',
  'Updated',
];

const Row = ({ row }: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [wallerOrder, setWallerOrder] = React.useState<any | null>();

  const accounts = useSelector((state: RootState) => state.accounts);

  const id = accounts.accountById?.wallets?.length && accounts.accountById.wallets[0]?.id;
  const collapseClass = classNames({ [styles.open]: open });

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
      <TableRow className={styles.container__body__row}>
        <TableCell className={styles.ceil}>
          <IconButton aria-label='expand row' size='small' onClick={() => handleCollapse(row.id)}>
            <TableDropdownIcon />
          </IconButton>
        </TableCell>
        <>
          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {row.id}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={uuid4()}>
            {moment(row.createdAt).format('MM.DD.YY')}
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
            {moment(row.updatedAt).format('MM.DD.YY')}
          </TableCell>
        </>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14} className={styles.ceil}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases' className={collapseClass}>
                <TableBody className={styles.container__body}>
                  {wallerOrder ? (
                    <>
                      <TableRow className={styles.container__body__row}>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {moment(wallerOrder?.createdAt).format('MM.DD.YY')}
                        </TableCell>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {wallerOrder.price}
                        </TableCell>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {wallerOrder.totalPrice} BTC
                        </TableCell>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {wallerOrder.totalPriceInBaseCurrency} USDT
                        </TableCell>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {wallerOrder.amount} BTC
                        </TableCell>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {wallerOrder.fees} USDT
                        </TableCell>
                        <TableCell className={styles.container__body__row__ceil} align='left'>
                          {wallerOrder.feesInBaseCurrency} USDT
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <EmptyData />
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleTable = ({ handleChangePage, handleChangeRowsPerPage, page }: any) => {
  const { accountsFilter, openOrders, openOrdersTotalCount } = useSelector(
    (state: RootState) => state.accounts,
  );

  return (
    <TableContainer component={Paper} className={styles.container}>
      <div className={styles.tabs}>
        <span className={styles.tabs__selected}>Open orders</span>
        <span>Wallet</span>
        <span>Inflows & Outflows</span>
        <span>Orders History</span>
        <span>Trades</span>
        <span>Alerts</span>
      </div>
      <div className={styles.wrapper}>
        <Table aria-label='collapsible table' className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              <TableCell className={styles.container__header__ceil}>More</TableCell>
              {headArr.map((item) => (
                <TableCell align='left' className={styles.container__header__ceil} key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {openOrders.map((row) => (
              <Row row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
        {!openOrdersTotalCount && <EmptyData />}
        <Pagination
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          currentPage={page}
          rowsPerPage={accountsFilter?.take}
          totalCount={openOrdersTotalCount}
        />
      </div>
    </TableContainer>
  );
};
export default CollapsibleTable;
