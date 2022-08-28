import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Routes } from 'types';
import { Alert } from 'components';
import { BinIcon, EditIcon } from 'assets/icons';
import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';

import styles from '../../Table.module.scss';
import BlockAction from '../../BlockAction';

import { ITableBodyProps } from './types';

const TableUsersBody = ({
  rows,
  open,
  handleClose,
  handleBlock,
  handleDelete,
  handleUnblock,
  toggleAlertOpen,
}: ITableBodyProps) => {
  const [delID, setID] = useState<number | null>(null);

  const personalInfo = useAppSelector(authSelectors.selectPersonalInfo);

  const actionCellClassnames = classNames(
    styles.table__body__row__ceil,
    styles.table__body__row__ceil__actions,
  );

  const renderRows = rows.map(({ id, email, role, status, username }: any, index) => {
    const dataCells = [id, username, email, role, status];
    const isLastItem = index === rows.length - 1;
    const tooltipClasses = classNames({
      [styles.table__body__row__ceil__actions__bin__users_last]: isLastItem,
    });
    const binClass = classNames(styles.table__body__row__ceil__actions__bin, {
      [styles.table__body__row__ceil__actions__bin__disabled]: personalInfo?.id == id,
    });

    return (
      <TableRow className={styles.table__body__row} tabIndex={id} key={index}>
        {dataCells.map((item) => (
          <TableCell key={item} align='left' className={styles.table__body__row__ceil}>
            {item}
          </TableCell>
        ))}

        <TableCell className={actionCellClassnames} align='left'>
          <BlockAction
            id={id}
            action='user'
            status={status}
            handleBlock={handleBlock}
            handleUnblock={handleUnblock}
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
              className={binClass}
              onClick={() => {
                setID(id);
                toggleAlertOpen && toggleAlertOpen();
              }}
            >
              <BinIcon />
              <span className={tooltipClasses}>Delete user</span>
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <tbody className={styles.table__body}>
      {renderRows}
      <Alert
        id={delID}
        open={open}
        handleAction={handleDelete}
        type='DELETE'
        handleClose={() => handleClose && handleClose()}
      />
    </tbody>
  );
};

export default TableUsersBody;
