import { useEffect, useState } from 'react';
import { Paper, TableContainer, Tooltip } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
import { FilterIcon } from 'assets/icons';

import styles from './AnalyticsTabs.module.scss';
import { TabType } from './types';

const AnalyticsTabs = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleTabUpdateChange = (id: string) => {
    setSearchParams({ tab: id });
  };
  const handleFilter = () => setOpenFilter(!openFilter);

  useEffect(() => {
    setOpenFilter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('tab')]);

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
          <Tooltip followCursor={true} placement='bottom' title={t('filters')}>
            <FilterIcon onClick={handleFilter} />
          </Tooltip>
        </div>
      </div>
      {renderTable()}
    </TableContainer>
  );
};

export default AnalyticsTabs;
