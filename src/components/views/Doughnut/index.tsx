import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut as DoughnutJs } from 'react-chartjs-2';
import classNames from 'classnames';
import { isUndefined } from 'lodash';

import { parseChartLabels } from 'utils/parseChartLabels';

import styles from './Doughnut.module.scss';

const Doughnut = ({
  data,
  field,
  value,
  header,
  tooltipFields = [],
  legendDisplay = true,
  legendPosition = 'right',
  className,
  pointStyle = 'rect',
  textColor,
  font = 13,
  width,
  radius = '120',
  colors,
}: any): JSX.Element => {
  const wrapperClass = classNames(className ? className : styles.wrapper);

  const formattedData = parseChartLabels(data, field, value);

  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('div');

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
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
            `${tooltip.dataPoints[0].formattedValue} ${tooltip.dataPoints[0].dataset.label}` || '',
            `${
              chart.tooltip.dataPoints[0].dataset?.others
                ? chart.tooltip.dataPoints[0].dataset?.others[tooltipFields[0]].toFixed(1)
                : ''
            }`,
            // `${
            //   chart.tooltip.dataPoints[0].dataset?.others
            //     ? chart.tooltip.dataPoints[0].dataset?.others[tooltipFields[2]]
            //     : ''
            // }`,
          ]
        : [
            `${tooltip.dataPoints[0].formattedValue} ${tooltip.dataPoints[0].dataset.label}` || '',
            `${
              isUndefined(obj[tooltipFields[0]]) ? '' : Number(obj[tooltipFields[0]]).toFixed(1)
            }  ${isUndefined(obj[tooltipFields[1]]) ? '' : obj[tooltipFields[1]]}`,
            `${
              isUndefined(obj[tooltipFields[2]]) ? '' : Number(obj[tooltipFields[2]]).toFixed(1)
            } ${isUndefined(obj[tooltipFields[3]]) ? '' : obj[tooltipFields[3]]}`,
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
        padding: {
          right: 30,
        },
        display: legendDisplay,
        position: legendPosition,
        usePointStyle: true,
        onClick: () => null,
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
            size: font,
            weight: 400,
          },
        },
      },
    },
  };

  ChartJS.register(Legend, ArcElement, Tooltip);

  return (
    <div className={wrapperClass}>
      <h1 className={styles.wrapper__title}>{header}</h1>
      <div className={styles.chart}>
        <DoughnutJs data={optionData} options={options} width={width} />
      </div>
    </div>
  );
};

export default Doughnut;
