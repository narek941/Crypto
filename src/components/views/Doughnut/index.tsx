import React from 'react';
ChartJS.register(Legend, Title, ArcElement);
import { ArcElement, Chart as ChartJS, Legend, Title } from 'chart.js';
import { Doughnut as DoughnutJs } from 'react-chartjs-2';
import classNames from 'classnames';

import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';

import styles from './Doughnut.module.scss';

const Doughnut = ({
  data,
  labels,
  header,
  width = '448',
  height = '199',
  legendDisplay = true,
  legendPosition = 'right',
  legendMaxWidth = '284',
  wrapperClassName,
}: any): JSX.Element => {
  const isDarkMode = useAppSelector(authSelectors.selectIsDarkMode);
  const wrapperClass = classNames(wrapperClassName ? wrapperClassName : styles.wrapper);
  const fakeData = {
    labels: labels,
    datasets: [
      {
        label: '%',
        data: data,
        backgroundColor: isDarkMode
          ? [
              '#6771DC',
              '#6794DC',
              '#67B7DC',
              '#14AB6C',
              '#FE8463',
              '#8067DC',
              '#C667DC',
              '#DC67AB',
              '#D6504D',
            ]
          : [
              '#6794DC',
              '#6771DC',
              '#9B67DC',
              '#DC67B4',
              '#D7504B',
              '#14AB6C',
              '#14AB6C',
              '#E4B514',
              '#FE8463',
            ],
        borderWidth: 0,
      },
    ],
  };

  const options: any = {
    cutout: '90%',
    responsive: false,
    spacing: 2,

    plugins: {
      legend: {
        display: legendDisplay,
        position: legendPosition,
        maxWidth: legendMaxWidth,
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
    <div className={wrapperClass}>
      <h1 className={styles.wrapper__title}>{header}</h1>
      <div className={styles.chart}>
        <DoughnutJs data={fakeData} options={options} width={width} height={height} />
      </div>
    </div>
  );
};

export default Doughnut;
