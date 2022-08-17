import React from 'react';
ChartJS.register(Legend, Title, ArcElement);
import { ArcElement, Chart as ChartJS, Legend, Title } from 'chart.js';
import { Doughnut as DoughnutJs } from 'react-chartjs-2';
import classNames from 'classnames';

import styles from './Doughnut.module.scss';

const Doughnut = ({
  data,
  labels,
  header,
  legendDisplay = true,
  legendPosition = 'right',
  legendMaxWidth = '284',
  wrapperClassName,
  pointStyle = 'rect',
  textColor,

  colors,
}: any): JSX.Element => {
  const wrapperClass = classNames(wrapperClassName ? wrapperClassName : styles.wrapper);
  const fakeData = {
    labels: labels,
    datasets: [
      {
        label: '%',
        data: data,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options: any = {
    cutout: '90%',
    responsive: true,
    spacing: 2,
    plugins: {
      legend: {
        display: legendDisplay,
        position: legendPosition,
        maxWidth: legendMaxWidth,
        usePointStyle: true,
        // fontColor: 'red',

        // maxHeight:400,
        labels: {
          fontColor: '#333',
          boxWidth: 11,
          boxHeight: 11,
          textAlign: 'left',
          padding: 8,
          usePointStyle: true,
          pointStyle,
          pointStyleWidth: 13,
          color: textColor,
          font: {
            size: 10,
            weight: 400,
          },
        },
      },
    },
  };

  ChartJS.register(Legend, Title, ArcElement);

  return (
    <div className={wrapperClass}>
      <h1 className={styles.wrapper__title}>{header}</h1>
      <div className={styles.chart}>
        <DoughnutJs data={fakeData} options={options} />
      </div>
    </div>
  );
};

export default Doughnut;
