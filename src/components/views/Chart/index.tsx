import { TradeChart } from 'components';

import styles from './Chart.module.scss';

const Chart = ({
  type,
  data,
  field,
  title,
  width,
  minValue,
  subTitle,
  maxValue,
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
          minValue={minValue}
          maxValue={maxValue}
          baseCurrency={baseCurrency}
          className={styles.tooltip}
        />
      </div>
    </div>
  );
};

export default Chart;
