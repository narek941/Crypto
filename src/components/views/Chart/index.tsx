import TradeChart from '../TradeChart';

import styles from './Chart.module.scss';

const Chart = ({
  type,
  data,
  field,
  title,
  width,
  subTitle,
  timeField,
  baseCurrency,
}: any): JSX.Element => {
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       data: chartData,
  //       borderColor: '#009688',
  //       borderWidth: 2,
  //       yAxisID: 'y-axis',
  //       xAxisID: 'x-axis',
  //     },
  //   ],
  // };
  // const options: any = {
  //   responsive: true,

  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   elements: {
  //     point: {
  //       radius: 0,
  //     },
  //   },
  //   scales: {
  //     x: { display: false },
  //     'x-axis': {
  //       gridThickness: 2,
  //       unit: 'month',
  //       unitStepSize: 2,
  //       offset: true,
  //       grid: {
  //         tickLength: 8,
  //         display: false,
  //       },
  //       ticks: {
  //         color: '#212121',
  //         textStrokeWidth: 20,
  //         font: {
  //           size: 12,
  //           weight: '400',
  //         },
  //       },
  //     },
  //     'y-axis': {
  //       type: 'linear',
  //       position: 'right',
  //       min: 0,
  //       max: 100,
  //       ticks: {
  //         stepSize: 20,
  //       },
  //       grid: {
  //         drawBorder: false,
  //       },
  //     },
  //     y: {
  //       display: false,
  //     },
  //   },
  // };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subTitle}>{subTitle}</p>
      <div className={styles.chart}>
        <TradeChart
          id={title}
          timeField={timeField}
          data={data}
          field={field}
          width={width}
          type={type}
          baseCurrency={baseCurrency}
          className={styles.tooltip}
        />
      </div>
    </div>
  );
};

export default Chart;
