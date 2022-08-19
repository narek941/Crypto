import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.scss';

const Chart = ({ labels, chartData }: any): JSX.Element => {
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        borderColor: '#009688',
        borderWidth: 2,
        yAxisID: 'y-axis',
        xAxisID: 'x-axis',
      },
    ],
  };
  const options: any = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: { display: false },
      'x-axis': {
        gridThickness: 2,
        unit: 'month',
        unitStepSize: 2,
        offset: true,
        grid: {
          tickLength: 8,
          display: false,
        },
        ticks: {
          color: '#212121',
          textStrokeWidth: 20,
          font: {
            size: 12,
            weight: '400',
          },
        },
      },
      'y-axis': {
        type: 'linear',
        position: 'right',
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          drawBorder: false,
        },
      },
      y: {
        display: false,
      },
    },
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Strategy P&L Chart</p>
      <p className={styles.subTitle}>Performance in %</p>
      <div className={styles.chart}>
        <Line data={data} options={options} width='493' height='251' />
      </div>
    </div>
  );
};

export default Chart;
