import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';

import { useAppDispatch } from 'hooks';
import { EmptyData } from 'components';
import { wrapWithBaseCurrency } from 'utils';
import { adminActions } from 'store/adminSlice';
import { usersFilterUpdate } from 'store/adminSlice/thunks';
import { accountsFilterUpdate } from 'store/accountsSlice/thunks';
import { alertsActions } from 'store/alertsSlice';

import Modal from '../Modal';
import Pagination from '../Pagination';

import TableHead from './TableHead';
import styles from './Table.module.scss';
import TableToolbar from './TableToolbar';
import TableUsersBody from './TableBody/TableUsersBody';
import TableAccountBody from './TableBody/TableAccountsBody';
import { ITableProps, KeyOfData, SelectedAccount } from './types';
import TableAlertsBody from './TableBody/TableAlertsBody';

const Table = ({
  rows = [],
  headCells,
  type,
  action,
  linkText,
  linkTo,
  take,
  order,
  totalCount,
}: ITableProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const [openChart, setOpenChart] = useState(false);
  const [orderBy, setOrderBy] = useState<KeyOfData>('id');
  const [selectedAccountData, setSelectedAccountData] = useState<SelectedAccount>({
    id: null,
    statistics: null,
    startCapitalInBaseCurrency: null,
  });

  const toggleAlertOpen = useCallback(() => setOpen(!open), [open]);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: KeyOfData) => {
    const isAsc = orderBy === property && order === 'ASC';
    const orderText = isAsc ? 'DESC' : 'ASC';
    if (action === 'users') {
      dispatch(usersFilterUpdate({ order: orderText }));
    } else if (action === 'accounts') {
      dispatch(accountsFilterUpdate({ order: orderText }));
    }

    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    const filterSkip = { skip: Number(newPage) * take };

    switch (action) {
      case 'users': {
        dispatch(usersFilterUpdate(filterSkip));
        break;
      }
      case 'accounts': {
        dispatch(accountsFilterUpdate(filterSkip));
        break;
      }
      case 'alerts': {
        dispatch(alertsActions.alertsFilterUpdate(filterSkip));
        break;
      }

      default:
        break;
    }

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      const filterPerPage = { take: parseInt(event.target.value), skip: 0 };

      switch (action) {
        case 'users': {
          dispatch(usersFilterUpdate(filterPerPage));
          break;
        }
        case 'accounts': {
          dispatch(accountsFilterUpdate(filterPerPage));
          break;
        }
        case 'alerts': {
          dispatch(alertsActions.alertsFilterUpdate(filterPerPage));
          break;
        }

        default:
          break;
      }
    }
  };

  const handleChartAction = (accountData: any) => {
    setSelectedAccountData(accountData);
    setOpenChart(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleFilter = () => {
  // switch (action) {
  //   case 'users': {
  //     dispatch(
  //       usersFilterUpdate({
  //         search: {
  //           role: value.search,
  //           email: value.search,
  //           status: value.search,
  //           username: value.search,
  //           id: Number(value.search) || -1,
  //         },
  //       }),
  //     );
  //     break;
  //   }
  //   case 'accounts': {
  //     dispatch(
  //       accountsFilterUpdate({ search: { id: Number(value.search) || -1, name: value.search } }),
  //     );
  //     break;
  //   }
  //   case 'alerts': {
  //     dispatch(
  //       alertsActions.alertsFilterUpdate({
  //         search: { id: Number(value.search) || -1, message: value.search },
  //       }),
  //     );
  //     break;
  //   }
  //   default:
  //     break;
  // }
  // };

  const handleBlock = useCallback(
    async (id: number) => {
      if (action === 'users') {
        await dispatch(adminActions.blockUser(id)).unwrap();
      } else {
        await dispatch(adminActions.blockAccount(id)).unwrap();
      }
    },
    [action, dispatch],
  );

  const handleUnblock = useCallback(
    async (id: number) => {
      if (action === 'users') {
        await dispatch(adminActions.unblockUser(id)).unwrap();
      } else {
        await dispatch(adminActions.unblockAccount(id)).unwrap();
      }
    },
    [action, dispatch],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (action === 'users') {
        await dispatch(adminActions.deleteUser(id)).unwrap();
      } else {
        await dispatch(adminActions.deleteAccount(id)).unwrap();
      }
    },
    [action, dispatch],
  );

  const renderTableBody = useMemo(() => {
    const commonProps = {
      rows,
      open,
      handleBlock,
      handleClose,
      handleDelete,
      handleUnblock,
      toggleAlertOpen,
    };

    switch (action) {
      case 'users': {
        return <TableUsersBody {...commonProps} />;
      }
      case 'accounts': {
        return <TableAccountBody {...commonProps} handleChartAction={handleChartAction} />;
      }
      case 'alerts': {
        return <TableAlertsBody rows={rows} />;
      }

      default:
        return null;
    }
  }, [action, handleBlock, handleDelete, handleUnblock, open, rows, toggleAlertOpen]);

  return (
    <>
      <div className={styles.wrapper}>
        <TableToolbar linkText={linkText} linkTo={linkTo} />
        <div className={styles.inner}>
          <div className={styles.table__wrapper}>
            <table className={styles.table}>
              <TableHead
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
                type={type}
              />
              {!!totalCount && renderTableBody}
            </table>
            {!totalCount && <EmptyData />}
          </div>
          <Pagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            currentPage={page}
            rowsPerPage={take}
            totalCount={totalCount}
          />
        </div>
      </div>
      <Modal
        open={openChart}
        id={selectedAccountData.id}
        setOpen={setOpenChart}
        modalList={[
          {
            id: 1,
            key: 'Seed Capital',
            value: Number(selectedAccountData.startCapitalInBaseCurrency).toFixed(6) || 0,
          },
          {
            id: 2,
            key: wrapWithBaseCurrency('Current open profit'),
            value:
              Number(selectedAccountData.statistics?.currentOpenProfitInBaseCurrency).toFixed(6) ||
              0,
          },
          {
            id: 3,
            key: wrapWithBaseCurrency('Earned capital'),
            value:
              Number(selectedAccountData.statistics?.earnedCapitalInBaseCurrency).toFixed(6) || 0,
          },
          {
            id: 4,
            key: 'Performance',
            value: `${
              Number(selectedAccountData.statistics?.productivityInPercent).toFixed(6) || 0
            }%`,
          },
          {
            id: 5,
            key: wrapWithBaseCurrency('Current Capital'),
            value:
              Number(selectedAccountData.statistics?.startCapitalInBaseCurrency).toFixed(6) || 0,
            info: `Updated at ${moment(selectedAccountData.statistics?.refreshDate).format(
              'DD.MM.YYYY HH:MM:SS',
            )}`,
          },
        ]}
      />
    </>
  );
};

export default Table;
