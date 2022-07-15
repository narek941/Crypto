import React from 'react';

import { Bricks, Chart, Doughnut, Export } from 'components';
import { accountsAnalyticsData, accountsAnalyticsLineChart } from 'utils/table';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics: React.FC = () => {
  const renderBricks = accountsAnalyticsData.map(({ name, value, moreInfo }: any, index) => (
    <Bricks key={index} header={name} value={value} moreText={moreInfo} />
  ));

  const renderLineCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Chart key={index} />
  ));

  const renderDoughnutCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Doughnut key={index} />
  ));
  return (
    <div className={styles.analytics}>
      <div className={styles.analytics__export}>
        <Export />
      </div>
      <div className={styles.analytics__bricks__wrapper}>{renderBricks}</div>
      <div className={styles.analytics__chart}>{renderLineCharts}</div>
      <div className={styles.analytics__chart}>{renderDoughnutCharts}</div>
    </div>
  );
};

export default AccountsAnalytics;
