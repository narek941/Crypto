import { useEffect, useState } from 'react';
import { Paper, TableContainer, Tooltip } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePortal from 'react-useportal';

import { accountAnalyticsTabs } from 'constants/index';
import {
  Tab,
  OrdersTable,
  TradesTable,
  InflowsTable,
  WalletsTable,
  OrdersHistoryTable,
  AnalyticsAlertTable,
} from 'components';
import { AddInflowIcon, FilterIcon } from 'assets/icons';
import { accountsActions } from 'store/accountsSlice';
import { useAppDispatch } from 'hooks';

import AddInflowForm from '../AddInflowForm';

import styles from './AnalyticsTabs.module.scss';
import { TabType } from './types';

const AnalyticsTabs = (): JSX.Element => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleTabUpdateChange = (id: string) => {
    const type = searchParams.get('type') || '';

    setSearchParams({ tab: id, type });
  };

  const handleFilter = () => setOpenFilter(!openFilter);

  const handleAddInflow = (e: any) => {
    isOpen ? closePortal(e) : openPortal(e);
  };

  const handleInflowSubmit = (body: any) => {
    // eslint-disable-next-line no-console
    console.log(body);
  };

  useEffect(() => {
    setOpenFilter(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('tab')]);

  useEffect(() => {
    dispatch(accountsActions.platformApiTypeUpdate({ api: searchParams.get('type') }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('type')]);

  const renderTable = () => {
    switch (searchParams.get('tab')) {
      case TabType.wallet:
        return <WalletsTable filterVisible={openFilter} />;
      case TabType.inflow:
        return <InflowsTable filterVisible={openFilter} />;
      case TabType.history:
        return <OrdersHistoryTable filterVisible={openFilter} />;
      case TabType.trades:
        return <TradesTable filterVisible={openFilter} />;
      case TabType.alerts:
        return <AnalyticsAlertTable filterVisible={openFilter} />;
      case TabType.orders:
        return <OrdersTable filterVisible={openFilter} />;
      default:
        return <OrdersTable filterVisible={openFilter} />;
    }
  };

  return (
    <>
      <TableContainer component={Paper} className={styles.table}>
        <div className={styles.tabs__wrapper}>
          <div className={styles.tabs}>
            {accountAnalyticsTabs.map(({ id, name }) => (
              <Tab
                selectedTab={searchParams.get('tab') || TabType.orders}
                handleChange={handleTabUpdateChange}
                id={id}
                name={name}
                key={id}
              />
            ))}
          </div>
          <div className={styles.toolbar__filter}>
            {searchParams.get('tab') === TabType.inflow && (
              <AddInflowIcon onClick={(e) => handleAddInflow(e)} className={styles.add_inflow} />
            )}
            <Tooltip followCursor={true} placement='bottom' title={t('filters')}>
              <FilterIcon onClick={handleFilter} />
            </Tooltip>
          </div>
        </div>
        {renderTable()}
      </TableContainer>
      {isOpen && (
        <Portal>
          <div className={styles.portal}>
            <div className={styles.portal__inner}>
              <AddInflowForm onClick={handleInflowSubmit} handleClose={closePortal} />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default AnalyticsTabs;
