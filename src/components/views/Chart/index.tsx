import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { chartData } from 'utils/chart';

import styles from './Chart.module.scss';
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: 56,
  borderWidth: 0,
  spacing: 2,
};

// const plugins = [
//   // {
//   //   id: 'text',
//   //   beforeDraw: function (chart: any) {
//   //     const width = chart.width,
//   //       height = chart.height,
//   //       ctx = chart.ctx;

//   //     ctx.restore();
//   //     ctx.font = '600 20px OpenSans';
//   //     ctx.textBaseline = 'middle';
//   //     ctx.fillStyle = '#2b67b3';

//   //     const text = '25%',
//   //       textX = Math.round((width - ctx.measureText(text).width) / 1.98),
//   //       textY = height / 2;

//   //     ctx.fillText(text, textX, textY);
//   //     ctx.save();
//   //   },
//   // },
// ];

const Chart = () => {
  return (
    <div className={styles.chart}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
export default Chart;
