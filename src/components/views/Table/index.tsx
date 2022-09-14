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
import { ITableProps, SelectedAccount } from './types';
import { ActionType, OrderType } from './TableToolbar/types';

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
  const [open, setOpen] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState<SelectedAccount>({
    id: null,
    statistics: null,
    startCapitalInBaseCurrency: null,
    baseCurrency: undefined,
  });

  const toggleAlertOpen = useCallback(() => setOpen(!open), [open]);

  const usersFilter = useAppSelector(adminSelectors.selectUsersFilter);
  const alertsFilter = useAppSelector(alertsSelectors?.selectAlertsFilter);
  const accountFilter = useAppSelector(accountsSelectors?.selectAccountAccountsList).filter;

  const pageFromRedux =
    action === ActionType.USERS
      ? usersFilter.skip / usersFilter.take
      : action === ActionType.ACCOUNTS
      ? accountFilter.skip / accountFilter.take
      : alertsFilter.skip / alertsFilter.take;
  const orderSort = (elem: any): OrderType.DESC | OrderType.ASC =>
    elem.order === OrderType.DESC ? OrderType.ASC : OrderType.DESC;

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: any): void => {
    if (action === ActionType.USERS) {
      let newOrder = OrderType.DESC;
      if (sort === usersFilter.sort) {
        newOrder = orderSort(usersFilter);
      } else {
        newOrder = OrderType.DESC;
      }
      dispatch(usersFilterUpdate({ sort, order: newOrder as OrderType.DESC | OrderType.ASC }));
    } else if (action === ActionType.ACCOUNTS) {
      let newOrder = OrderType.DESC;
      if (sort === accountFilter.sort) {
        newOrder = orderSort(accountFilter);
      } else {
        newOrder = OrderType.DESC;
      }
      dispatch(accountsFilterUpdate({ sort, order: newOrder as OrderType.DESC | OrderType.ASC }));
    } else {
      let newOrder = OrderType.DESC;
      if (sort === alertsFilter.sort) {
        newOrder = orderSort(alertsFilter);
      } else {
        newOrder = OrderType.DESC;
      }
      dispatch(alertsFilterUpdate({ sort, order: newOrder as OrderType.DESC | OrderType.ASC }));
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    const filterSkip = { skip: Number(newPage) * take };

    switch (action) {
      case ActionType.USERS: {
        dispatch(usersFilterUpdate(filterSkip));
        break;
      }
      case ActionType.ACCOUNTS: {
        dispatch(accountsFilterUpdate(filterSkip));
        break;
      }
      case ActionType.ALERTS: {
        dispatch(alertsActions.alertsFilterUpdate(filterSkip));
        break;
      }

      default:
        break;
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      const filterPerPage = { take: parseInt(event.target.value), skip: 0 };

      switch (action) {
        case ActionType.USERS: {
          dispatch(usersFilterUpdate(filterPerPage));
          break;
        }
        case ActionType.ACCOUNTS: {
          dispatch(accountsFilterUpdate(filterPerPage));
          break;
        }
        case ActionType.ALERTS: {
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

  const handleBlock = useCallback(
    async (id: number) => {
      if (action === ActionType.USERS) {
        await dispatch(adminActions.blockUser(id)).unwrap();
      } else {
        await dispatch(adminActions.blockAccount(id)).unwrap();
      }
    },
    [action, dispatch],
  );

  const handleUnblock = useCallback(
    async (id: number) => {
      if (action === ActionType.USERS) {
        await dispatch(adminActions.unblockUser(id)).unwrap();
      } else {
        await dispatch(adminActions.unblockAccount(id)).unwrap();
      }
    },
    [action, dispatch],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (action === ActionType.USERS) {
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
      case ActionType.USERS: {
        return <TableUsersBody {...commonProps} />;
      }
      case ActionType.ACCOUNTS: {
        return <TableAccountBody {...commonProps} handleChartAction={handleChartAction} />;
      }
      case ActionType.ALERTS: {
        return <TableAlertsBody rows={rows} />;
      }

      default:
        return null;
    }
  }, [action, handleBlock, handleDelete, handleUnblock, open, rows, toggleAlertOpen]);

  return (
    <>
      <div className={styles.wrapper}>
        <TableToolbar linkText={linkText} linkTo={linkTo} action={action} />
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
            currentPage={pageFromRedux}
            rowsPerPage={take}
            totalCount={totalCount}
          />
        </div>
      </div>
      <Modal
        open={openChart}
        id={selectedAccountData.id}
        setOpen={setOpenChart}
        baseCurrency={selectedAccountData?.baseCurrency}
        modalList={[
          {
            id: 1,
            key: 'Seed Capital',
            value: selectedAccountData.statistics?.startCapitalInBaseCurrency
              ? Number(selectedAccountData.statistics?.startCapitalInBaseCurrency).toFixed(8)
              : 0,
          },
          {
            id: 2,
            key: wrapWithBaseCurrency('Current open profit', selectedAccountData?.baseCurrency),
            value: selectedAccountData.statistics?.currentOpenProfitInBaseCurrency
              ? Number(selectedAccountData.statistics?.currentOpenProfitInBaseCurrency).toFixed(8)
              : 0,
          },
          {
            id: 3,
            key: wrapWithBaseCurrency('Earned capital', selectedAccountData?.baseCurrency),
            value: selectedAccountData.statistics?.earnedCapitalInBaseCurrency
              ? Number(selectedAccountData.statistics?.earnedCapitalInBaseCurrency).toFixed(8)
              : 0,
          },
          {
            id: 4,
            key: 'Performance',
            value: `${
              selectedAccountData.statistics?.earnedCapitalInPercent
                ? Number(selectedAccountData.statistics?.earnedCapitalInPercent)
                : 0
            }%`,
          },
          {
            id: 5,
            key: wrapWithBaseCurrency('Current Capital', selectedAccountData?.baseCurrency),
            value: selectedAccountData.statistics?.currentCapitalInBaseCurrency
              ? Number(selectedAccountData.statistics?.currentCapitalInBaseCurrency).toFixed(8)
              : 0,
            info: `Updated at ${moment(selectedAccountData.statistics?.refreshDate).format(
              'DD.MM.YYYY HH:mm:ss',
            )}`,
          },
        ]}
      />
    </>
  );
};

export default Table;
