import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { chartData } from 'utils/chart';

import styles from './Chart.module.scss';
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  return (
    <div className={styles.chart}>
      <Doughnut data={chartData} />
    </div>
  );
};
export default Chart;
