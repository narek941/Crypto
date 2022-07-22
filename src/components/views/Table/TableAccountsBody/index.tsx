import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames';
import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { BinIcon, ChartIcon, EditIcon, SettingIcon } from 'assets/icons';
import { DeleteAlert } from 'components';
import { Routes } from 'types';

import styles from '../Table.module.scss';
import { IStatus } from '../types';
import BlockAction from '../BlockAction';

import { ITableAccountBodyProps } from './types';

const TableAccountBody = ({
  rows,
  action,
  open,
  handleChartAction,
  handleClose,
  toggleAlertOpen,
  handleBlock,
  handleUnblock,
  handleDelete,
}: ITableAccountBodyProps) => {
  const actionCellClassnames = classNames(
    styles.table__body__row__ceil,
    styles.table__body__row__ceil__actions,
  );
  const [delID, setID] = useState<number | null>(null);

  const renderActions = (
    status: IStatus,
    id: number,
    statistics: any,
    startCapitalInBaseCurrency: any,
    isLastItem: boolean,
  ) => {
    const tooltipClasses = classNames({
      [styles.table__body__row__ceil__actions__bin__span_last]: isLastItem,
    });

    switch (action) {
      case 'accounts':
        return (
          <TableCell className={actionCellClassnames} align='left'>
            <>
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
                className={styles.table__body__row__ceil__actions__setting}
                to={`${Routes.EditAccount}/${id}`}
              >
                <SettingIcon />
                <span className={tooltipClasses}>Account settings</span>
              </Link>
              <BlockAction
                status={status}
                id={id}
                action='account'
                handleUnblock={handleUnblock}
                handleBlock={handleBlock}
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
            </>
          </TableCell>
        );
      case 'users':
        return (
          <TableCell className={actionCellClassnames} align='left'>
            <>
              <BlockAction
                status={status}
                id={id}
                action='user'
                handleUnblock={handleUnblock}
                handleBlock={handleBlock}
                tooltipClasses={tooltipClasses}
              />
              <Link
                to={Routes.AddNewUser}
                state={{ id }}
                className={styles.table__body__row__ceil__actions__setting}
              >
                <EditIcon />
                <span className={tooltipClasses}>Account settings</span>
              </Link>
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
            </>
          </TableCell>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <tbody className={styles.table__body}>
        {rows.map(
          ({ id, startCapitalInBaseCurrency, name, createdAt, status, statistics }: any, index) => {
            const formattedDate = moment(createdAt).format('DD.MM.YYYY HH:MM:SS');
            const isLastItem = index === rows.length - 1;

            return (
              <TableRow className={styles.table__body__row} tabIndex={id} key={index}>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {id}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {name}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {statistics.startCapitalInBaseCurrency + ' USDT'}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {startCapitalInBaseCurrency + ' USDT'}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {formattedDate}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {statistics.currentOpenProfitInBaseCurrency + ' %'}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {statistics.earnedCapitalInBaseCurrency + ' USDT'}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {statistics.earnedCapitalInPercent + ' %'}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {statistics.currentOpenProfitInBaseCurrency + ' USDT'}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {statistics.numberDailyTransactions}
                </TableCell>
                <TableCell className={styles.table__body__row__ceil} align='left'>
                  {status}
                </TableCell>
                {renderActions(status, id, statistics, startCapitalInBaseCurrency, isLastItem)}
              </TableRow>
            );
          },
        )}
        <DeleteAlert
          open={open}
          handleClose={() => handleClose && handleClose()}
          handleDelete={handleDelete}
          id={delID}
        />
      </tbody>
    </>
  );
};

export default TableAccountBody;
