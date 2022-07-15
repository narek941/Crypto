import React from 'react';
ChartJS.register(Legend, Title, ArcElement);
import { ArcElement, Chart as ChartJS, Legend, Title } from 'chart.js';
import { Doughnut as DoughnutJs } from 'react-chartjs-2';

import styles from './Doughnut.module.scss';

const Doughnut: React.FC = () => {
  const data = {
    labels: [
      'USDT/BTC - 20%',
      'XRP/USDC - 18%',
      'XRP/USDT - 10%',
      'BTC/USDC - 10%',
      'BTC/XRP - 5%',
      'BTC/USDT - 5%',
      'BTC/USDT - 10%',
      'BTC/USDT - 10%',
      'Others - 2,5%',
    ],
    datasets: [
      {
        label: '%',
        data: [20, 18, 10, 10, 5, 5, 10, 10, 2.5],
        backgroundColor: [
          '#6771DC',
          '#6794DC',
          '#67B7DC',
          '#14AB6C',
          '#FE8463',
          '#8067DC',
          '#C667DC',
          '#DC67AB',
          '#D6504D',
        ],
        borderWidth: 2,
      },
    ],
  };
  const options: any = {
    cutout: '90%',
    responsive: false,

    plugins: {
      legend: {
        display: true,
        position: 'right',
        maxWidth: '284',
        labels: {
          fontColor: '#333',
          fontSize: 16,
          boxWidth: 11,
          boxHeight: 11,
          textAlign: 'left',
          padding: 8,
        },
      },
    },
  };

  ChartJS.register(Legend, Title, ArcElement);

  return (
    <div className={styles.wrapper}>
      <h1>Trading Pairs Chart</h1>
      <div className={styles.chart}>
        <DoughnutJs data={data} options={options} width='448' height='199' />
      </div>
    </div>
  );
};

export default Doughnut;
