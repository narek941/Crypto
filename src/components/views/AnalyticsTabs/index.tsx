import { useEffect, useState } from 'react';
import { Paper, TableContainer, Tooltip } from '@mui/material';
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

const AnalyticsTabs = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<number>(accountAnalyticsTabs[0].id || 0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleFilter = () => setOpenFilter(!openFilter);

  const handleTabUpdateChange = (id: number) => {
    setSelectedTab(id);
  };
  useEffect(() => {
    setOpenFilter(false);
  }, [selectedTab]);

  const renderTable = () => {
    switch (selectedTab) {
      case 0:
        return <OrdersTable filterVisible={openFilter} />;
      case 1:
        return <WalletsTable filterVisible={openFilter} />;
      case 2:
        return <InflowsTable filterVisible={openFilter} />;
      case 3:
        return <OrdersHistoryTable filterVisible={openFilter} />;
      case 4:
        return <TradesTable filterVisible={openFilter} />;
      default:
        return <AnalyticsAlertTable filterVisible={openFilter} />;
    }
  };

  return (
    <TableContainer component={Paper} className={styles.table}>
      <div className={styles.tabs__wrapper}>
        <div className={styles.tabs}>
          {accountAnalyticsTabs.map(({ id, name }) => (
            <Tab
              selectedTab={selectedTab}
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
