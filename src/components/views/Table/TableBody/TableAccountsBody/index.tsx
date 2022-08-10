import { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Routes } from 'types';
import { Alert } from 'components';
import { BinIcon, ChartIcon, SettingIcon } from 'assets/icons';

import BlockAction from '../../BlockAction';
import styles from '../../Table.module.scss';

import { ITableAccountBodyProps } from './types';

const TableAccountBody = ({
  rows,
  open,
  handleClose,
  handleBlock,
  handleDelete,
  handleUnblock,
  toggleAlertOpen,
  handleChartAction,
}: ITableAccountBodyProps) => {
  const actionCellClassnames = classNames(
    styles.table__body__row__ceil,
    styles.table__body__row__ceil__actions,
  );
  const [delID, setID] = useState<number | null>(null);

  const renderRows = rows.map(
    ({ id, startCapitalInBaseCurrency, name, createdAt, status, statistics }: any, index) => {
      const formattedDate = moment(createdAt).format('DD.MM.YYYY HH:MM:SS');
      const isLastItem = index === rows.length - 1;
      const tooltipClasses = classNames({
        [styles.table__body__row__ceil__actions__bin__span_last]: isLastItem,
      });

      return (
        <TableRow className={styles.table__body__row} tabIndex={id} key={index}>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {id}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {name}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics?.startCapitalInBaseCurrency + ' USDT'}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics.currentCapitalInBaseCurrency + ' USDT'}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {formattedDate}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics?.currentOpenProfitInBaseCurrency + ' %'}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics?.earnedCapitalInBaseCurrency + ' USDT'}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics?.earnedCapitalInPercent + ' %'}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics?.currentOpenProfitInBaseCurrency + ' USDT'}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {statistics?.numberDailyTransactions}
          </TableCell>
          <TableCell className={styles.table__body__row__ceil} align='left'>
            {status}
          </TableCell>

          <TableCell className={actionCellClassnames} align='left'>
            {handleChartAction && (
              <div className={styles.table__body__row__ceil__actions__chart}>
                <ChartIcon
                  onClick={() =>
                    handleChartAction({
                      id,
                      statistics,
                      startCapitalInBaseCurrency,
                    })
                  }
                />
                <span className={tooltipClasses}>Account analytics</span>
              </div>
            )}

            <Link
              to={`${Routes.EditAccount}/${id}`}
              className={styles.table__body__row__ceil__actions__setting}
            >
              <SettingIcon />
              <span className={tooltipClasses}>Account settings</span>
            </Link>

            <BlockAction
              id={id}
              status={status}
              action='account'
              handleBlock={handleBlock}
              handleUnblock={handleUnblock}
              tooltipClasses={tooltipClasses}
            />

            {status !== 'DELETED' && handleClose && (
              <div
                className={styles.table__body__row__ceil__actions__bin}
                onClick={() => {
                  setID(id);
                  toggleAlertOpen && toggleAlertOpen();
                }}
              >
                <BinIcon />
                <span className={tooltipClasses}>Delete account</span>
              </div>
            )}
          </TableCell>
        </TableRow>
      );
    },
  );

  return (
    <tbody className={styles.table__body}>
      {renderRows}

      <Alert
        open={open}
        handleClose={() => handleClose && handleClose()}
        handleAction={handleDelete}
        type={'DELETE'}
        id={delID}
      />
    </tbody>
  );
};

export default TableAccountBody;
