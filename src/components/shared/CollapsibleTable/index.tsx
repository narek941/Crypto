import * as React from 'react';
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

import { TableDropdownIcon } from 'assets/icons';
import { EmptyData, Pagination } from 'components';
import { RootState } from 'types';

import styles from './CollapsibleTable.module.scss';

function createData(
  ID: string,
  Created: string,
  Pair: string,
  Side: string,
  Value: string,
  ValueUSDT: string,
  Received: string,
  ReceivedUSDT: string,
  Fee: string,
  FeeUSDT: string,
  share: string,
  Updated: string,
) {
  return {
    ID,
    Created,
    Pair,
    Side,
    Value,
    ValueUSDT,
    Received,
    ReceivedUSDT,
    Fee,
    FeeUSDT,
    share,
    Updated,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: '3',
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: '1',
      },
    ],
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rows = [
  createData(
    '11',
    '22.02.2022 16:20:01',
    'BTCUSDT',
    'Sell',
    '0,112 BTC',
    '4,567',
    '0,112 BTC',
    '4,567',
    '1,11 BTC',
    '1,112',
    '34%',
    '22.01.2022 ..',
  ),
];

const headArr = [
  'ID',
  ' Created',
  'Pair',
  'Side',
  'Value',
  'ValueUSDT',
  ' Received',
  'ReceivedUSDT',
  'Fee',
  'FeeUSDT',
  'share',
  'Updated',
];

const Row = ({ row }: any) => {
  // eslint-disable-next-line no-console
  console.log(row, 'item?.coinsPair?.name}');

  const [open, setOpen] = React.useState(false);

  const collapseClass = classNames({ [styles.open]: open });
  return (
    <React.Fragment>
      <TableRow className={styles.container__body__row}>
        <TableCell className={styles.ceil}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            <TableDropdownIcon />
          </IconButton>
        </TableCell>
        <>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row.id}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={row.id}>
            {moment(row.createdAt).format('MM.DD.YY')}
          </TableCell>

          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row?.coinsPair?.name}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row.side}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row.totalPrice}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row.totalPriceInBaseCurrency}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {'-'}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {'-'}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row.fees}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {row.feesInBaseCurrency}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
            {'-'}
          </TableCell>
          <TableCell align='left' className={styles.ceil} key={row.id}>
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
                  <TableRow className={styles.container__body__row}>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      22.02.2022 19:20:01
                    </TableCell>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      0,412 USDT
                    </TableCell>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      0,112 BTC
                    </TableCell>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      22,11 USDT
                    </TableCell>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      1,112 BTC
                    </TableCell>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      4,567 USDT
                    </TableCell>
                    <TableCell className={styles.container__body__row__ceil} align='left'>
                      11,1 USDT
                    </TableCell>
                  </TableRow>
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
  const { accountsFilter, accountsAnalytics, accountsAnalyticsTotalCount } = useSelector(
    (state: RootState) => state.accounts,
  );

  return (
    <TableContainer component={Paper} className={styles.container}>
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
            {accountsAnalytics.map((row) => (
              <Row row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
        {!accountsAnalyticsTotalCount && <EmptyData />}
        <Pagination
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          currentPage={page}
          rowsPerPage={accountsFilter?.take}
          totalCount={accountsAnalyticsTotalCount}
        />
      </div>
    </TableContainer>
  );
};
export default CollapsibleTable;
