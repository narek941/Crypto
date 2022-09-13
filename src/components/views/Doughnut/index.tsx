import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut as DoughnutJs } from 'react-chartjs-2';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import { useSearchParams } from 'react-router-dom';

import { parseChartLabels } from 'utils';

import styles from './Doughnut.module.scss';

const Doughnut = ({
  data,
  field,
  value,
  header,
  tooltipFields = [],
  className,
  baseCurrency,
  legendPositionBottom = false,
  radius = '80',
  colors,
  navigateTo,
}: any): JSX.Element => {
  const formattedData = parseChartLabels(data, field, value);

  const wrapperClass = classNames(className ? className : styles.wrapper);
  const innerClass = classNames(
    legendPositionBottom ? styles.legend__inner : styles.legendBig__inner,
  );
  const legendClass = classNames(legendPositionBottom ? styles.legend : styles.legendBig, {
    [styles.legendBig__column]:
      formattedData.label && formattedData.label.length >= 7 && !legendPositionBottom,
  });
  const legendItemClass = classNames(
    legendPositionBottom ? styles.legend__item : styles.legendBig__item,
  );
  const legendItemBoxClass = classNames(
    legendPositionBottom ? styles.legend__item__box : styles.legendBig__item__box,
  );
  const legendItemTextClass = classNames(
    legendPositionBottom ? styles.legend__item__text : styles.legendBig__item__text,
  );
  const chartClass = classNames(legendPositionBottom ? styles.chart : styles.chartBig);

  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
      tooltipEl.style.zIndex = '100000';

      const table = document.createElement('div');

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMoreBtn = () => {
    setSearchParams({ tab: navigateTo.toString() });
  };

  const externalTooltipHandler = (context: any) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    const obj = data.find(
      (el: any) =>
        el['id'] == tooltip.dataPoints[0].dataset.id[Number(tooltip.dataPoints[0].dataIndex)],
    );

    // Set Text
    if (tooltip.body) {
      const bodyLines = chart?.tooltip.dataPoints[0].label.includes('Others')
        ? [
            ` ${tooltip.dataPoints[0].label}` || '',
            `${
              chart.tooltip.dataPoints[0].dataset?.others
                ? chart.tooltip.dataPoints[0].dataset?.others[tooltipFields[0]]
                : ''
            } ${baseCurrency}`,
          ]
        : [
            ` ${tooltip.dataPoints[0].label}` || '',
            `${isUndefined(obj[tooltipFields[0]]) ? '' : Number(obj[tooltipFields[0]])}  ${
              isUndefined(obj[tooltipFields[1]]) ? '' : obj[tooltipFields[1]]
            }`,
            `${isUndefined(obj[tooltipFields[2]]) ? '' : Number(obj[tooltipFields[2]])} ${
              isUndefined(obj[tooltipFields[3]]) ? '' : obj[tooltipFields[3]]
            }`,
          ];

      const tableBody = document.createElement('div');
      tableBody.className = styles['tooltip'];
      bodyLines.forEach((body: any) => {
        const span = document.createElement('div');
        span.className = styles['tooltip__item'];
        const text = document.createTextNode(body);
        span.appendChild(text);
        tableBody.appendChild(span);
      });

      const tableRoot = tooltipEl.querySelector('div');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    // tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const optionData = {
    labels: formattedData.label.map(({ key, value }: any) => `${key} - ${value}%`),
    datasets: [
      {
        label: '%',
        data: formattedData.label.map(({ value }: any) => value),
        backgroundColor: colors,
        others: formattedData.others,
        borderWidth: 0,
        id: formattedData.label.map(({ id }: any) => id),
      },
    ],
  };

  const options: any = {
    cutout: '90%',
    responsive: true,
    spacing: 4,
    radius: radius,

    plugins: {
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
      },
      legend: {
        display: false,
      },
    },
  };

  ChartJS.register(Legend, ArcElement, Tooltip);

  return (
    <div className={wrapperClass}>
      <h1 className={styles.wrapper__title}>{header}</h1>
      <div className={innerClass}>
        <div className={chartClass}>
          <DoughnutJs data={optionData} options={options} />
        </div>
        <div className={legendClass}>
          {formattedData?.label &&
            colors &&
            formattedData?.label?.map(({ key, value }: any, index) => (
              <div key={index} className={legendItemClass}>
                <div
                  className={legendItemBoxClass}
                  style={{
                    background: colors[index] || '',
                  }}
                />
                <span className={legendItemTextClass}>{`${key} - ${value}%`}</span>
              </div>
            ))}
        </div>
      </div>
      {navigateTo && (
        <div className={styles.more} onClick={() => handleMoreBtn()}>
          More Details
        </div>
      )}
    </div>
  );
};

export default Doughnut;
