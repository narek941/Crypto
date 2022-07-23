import { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';

import { tabList } from 'utils/table';
import {
  OrdersHistoryTable,
  OrdersTable,
  InflowsTable,
  Tab,
  TradesTable,
  WalletsTable,
} from 'components';

import AnalyticsAlertTable from '../AnalyticsAlertTable';

import styles from './AnalyticsTabs.module.scss';

const AnalyticsTabs = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(tabList[0].id || 0);

  const handleTabUpdateChange = (id: number) => {
    setSelectedTab(id);
  };

  const renderTable = () => {
    switch (selectedTab) {
      case 0:
        return <OrdersTable />;
      case 1:
        return <WalletsTable />;
      case 2:
        return <InflowsTable />;
      case 3:
        return <OrdersHistoryTable />;
      case 4:
        return <TradesTable />;
      default:
        return <AnalyticsAlertTable />;
    }
  };

  return (
    <TableContainer component={Paper} className={styles.table}>
      <>
        <div className={styles.tabs}>
          {tabList.map(({ id, name }) => (
            <Tab
              selectedTab={selectedTab}
              handleChange={handleTabUpdateChange}
              id={id}
              name={name}
              key={id}
            />
          ))}
        </div>

        {renderTable()}
      </>
    </TableContainer>
  );
};

export default AnalyticsTabs;
