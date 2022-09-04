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

const AnalyticsTabs = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleTabUpdateChange = (id: number) => {
    setSearchParams({ tab: id.toString() });
  };
  const handleFilter = () => setOpenFilter(!openFilter);

  useEffect(() => {
    setOpenFilter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('tab')]);

  const renderTable = () => {
    const position = window.pageYOffset;

    switch (searchParams.get('tab')) {
      case '1':
        return <WalletsTable filterVisible={openFilter} />;
      case '2':
        return <InflowsTable filterVisible={openFilter} />;
      case '3':
        return <OrdersHistoryTable filterVisible={openFilter} />;
      case '4':
        return <TradesTable filterVisible={openFilter} />;
      case '5':
        return <AnalyticsAlertTable filterVisible={openFilter} />;
      default:
        return <OrdersTable filterVisible={openFilter} />;
    }
    window.scrollTo(0, position);
  };

  return (
    <TableContainer component={Paper} className={styles.table}>
      <div className={styles.tabs__wrapper}>
        <div className={styles.tabs}>
          {accountAnalyticsTabs.map(({ id, name }) => (
            <Tab
              selectedTab={Number(searchParams.get('tab'))}
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
