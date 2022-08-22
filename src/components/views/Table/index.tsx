import React, { MouseEvent, useCallback, useMemo, useState } from 'react';
import moment from 'moment';

import { EmptyData } from 'components';
import { wrapWithBaseCurrency } from 'utils';
import { useAppSelector, useAppDispatch } from 'hooks';
import { accountsSelectors } from 'store/accountsSlice';
import { usersFilterUpdate } from 'store/adminSlice/thunks';
import { alertsFilterUpdate } from 'store/alertsSlice/thunks';
import { adminActions, adminSelectors } from 'store/adminSlice';
import { accountsFilterUpdate } from 'store/accountsSlice/thunks';
import { alertsActions, alertsSelectors } from 'store/alertsSlice';

import Modal from '../Modal';
import Pagination from '../Pagination';

import TableHead from './TableHead';
import styles from './Table.module.scss';
import TableToolbar from './TableToolbar';
import TableUsersBody from './TableBody/TableUsersBody';
import TableAlertsBody from './TableBody/TableAlertsBody';
import TableAccountBody from './TableBody/TableAccountsBody';
import { ITableProps, KeyOfData, SelectedAccount } from './types';

const Table = ({
  take,
  type,
  sort,
  order,
  action,
  linkTo,
  linkText,
  headCells,
  rows = [],
  totalCount,
}: ITableProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState<SelectedAccount>({
    id: null,
    statistics: null,
    startCapitalInBaseCurrency: null,
  });

  const toggleAlertOpen = useCallback(() => setOpen(!open), [open]);

  const usersFilter = useAppSelector(adminSelectors.selectUsersFilter);
  const alertsFilter = useAppSelector(alertsSelectors?.selectAlertsFilter);
  const accountFilter = useAppSelector(accountsSelectors?.selectAccountAccountsList).filter;

  const orderSort = (elem: any): 'DESC' | 'ASC' => (elem.order === 'DESC' ? 'ASC' : 'DESC');

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: KeyOfData): void => {
    if (action === 'users') {
      dispatch(usersFilterUpdate({ sort, order: orderSort(usersFilter) }));
    } else if (action === 'accounts') {
      dispatch(accountsFilterUpdate({ sort, order: orderSort(accountFilter) }));
    } else {
      dispatch(alertsFilterUpdate({ sort, order: orderSort(alertsFilter) }));
    }
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
                type={type}
                sort={sort}
                order={order}
                headCells={headCells}
                rowCount={rows.length}
                onRequestSort={handleRequestSort}
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
            value: selectedAccountData.startCapitalInBaseCurrency,
          },
          {
            id: 2,
            key: wrapWithBaseCurrency('Current open profit'),
            value: selectedAccountData.statistics?.currentOpenProfitInBaseCurrency,
          },
          {
            id: 3,
            key: wrapWithBaseCurrency('Earned capital'),
            value: selectedAccountData.statistics?.earnedCapitalInBaseCurrency,
          },
          {
            id: 4,
            key: 'Performance',
            value: `${selectedAccountData.statistics?.productivityInPercent}%`,
          },
          {
            id: 5,
            key: wrapWithBaseCurrency('Current Capital'),
            value: selectedAccountData.statistics?.startCapitalInBaseCurrency,
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
