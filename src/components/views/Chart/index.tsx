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
  field2,
}: any): JSX.Element => {
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
          field2={field2}
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
