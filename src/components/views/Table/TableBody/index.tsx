import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BinIcon, ChartIcon, EditIcon, SettingIcon } from 'assets/icons';
import { DeleteAlert } from 'components';
import { Routes } from 'types';

import styles from '../Table.module.scss';
import { IStatus } from '../types';
import BlockAction from '../BlockAction';

import { ITableBodyProps } from './types';

const TableBody = ({
  rows,
  action,
  open,
  handleChartAction,
  handleClose,
  toggleAlertOpen,
  handleBlock,
  handleUnblock,
  handleDelete,
}: ITableBodyProps) => {
  const actionCellClassnames = classNames(
    styles.table__body__row__ceil,
    styles.table__body__row__ceil__actions,
  );
  const [delID, setID] = useState<number | null>(null);

  const renderActions = (status: IStatus, id: number, isLastItem: boolean) => {
    const tooltipClasses = classNames({
      [styles.table__body__row__ceil__actions__bin__users_last]: isLastItem,
    });

    switch (action) {
      case 'accounts':
        return (
          <TableCell className={actionCellClassnames} align='left'>
            <>
              {handleChartAction && (
                <div className={styles.table__body__row__ceil__actions__chart}>
                  <ChartIcon onClick={() => handleChartAction(id)} />
                  <span>Account analytics</span>
                </div>
              )}
              <div className={styles.table__body__row__ceil__actions__setting}>
                <SettingIcon />
                <span>Account settings</span>
              </div>
              <BlockAction
                status={status}
                id={id}
                action='account'
                handleUnblock={handleUnblock}
                handleBlock={handleBlock}
              />

              {handleClose && (
                <div
                  className={styles.table__body__row__ceil__actions__bin}
                  onClick={toggleAlertOpen}
                >
                  {status !== 'DELETED' && <BinIcon />}
                  <span>Delete account</span>
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
                action={'user'}
                handleUnblock={handleUnblock}
                handleBlock={handleBlock}
                tooltipClasses={tooltipClasses}
              />
              <Link
                to={`${Routes.EditUser}/${id}`}
                className={styles.table__body__row__ceil__actions__setting}
              >
                <EditIcon />
                <span className={tooltipClasses}>Edit user</span>
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
                  <span className={tooltipClasses}>Delete user</span>
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
        {rows.map(({ id, email, role, status, username }: any, index) => {
          const arr = [id, username, email, role, status];
          const isLastItem = index === rows.length - 1;

          return (
            <TableRow className={styles.table__body__row} tabIndex={id} key={index}>
              {arr.map((item: string) => {
                return (
                  <TableCell className={styles.table__body__row__ceil} key={item} align='left'>
                    {item}
                  </TableCell>
                );
              })}
              <>{renderActions(status, id, isLastItem)}</>
            </TableRow>
          );
        })}
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

export default TableBody;
