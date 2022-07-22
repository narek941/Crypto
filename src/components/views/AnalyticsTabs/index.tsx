import React, { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';

import { OrdersTable } from 'components';
import { tabList } from 'utils/table';
import Tab from 'components/shared/Tab';
import TradesTable from 'components/shared/TradesTable';

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
        return <>Table2</>;
      case 4:
        return <TradesTable />;
      default:
        return <OrdersTable />;
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
