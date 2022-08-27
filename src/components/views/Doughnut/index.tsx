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
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';

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
      const titleLines =
        [`${tooltip.dataPoints[0].formattedValue} ${tooltip.dataPoints[0].dataset.label}`] || [];

      const bodyLines = !chart.tooltip.dataPoints[0].label.includes('others')
        ? [
            `${formattedData.others[tooltipFields[0].toString()]}`,
            `${formattedData.others[tooltipFields[2].toString()]}`,
          ]
        : [
            `${
              isUndefined(obj[tooltipFields[0]]) ? '' : Number(obj[tooltipFields[0]]).toFixed(1)
            }  ${isUndefined(obj[tooltipFields[1]]) ? '' : obj[tooltipFields[1]]}`,
            `${
              isUndefined(obj[tooltipFields[2]]) ? '' : Number(obj[tooltipFields[2]]).toFixed(1)
            } ${isUndefined(obj[tooltipFields[3]]) ? '' : obj[tooltipFields[3]]}`,
          ];

      const tableHead = document.createElement('thead');

      titleLines.forEach((title: any) => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = '0';

        const th = document.createElement('th');
        th.style.borderWidth = '0';
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body: any) => {
        const span = document.createElement('span');
        span.style.borderWidth = '2px';
        span.style.marginRight = '10px';
        span.style.height = '10px';
        span.style.width = '10px';
        span.style.display = 'inline-block';

        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = '0';

        const td = document.createElement('td');
        td.style.borderWidth = '0';

        const text = document.createTextNode(body);

        td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const optionData = {
    labels: formattedData.label.map(({ key, value }: any) => `${key} - ${value}%`),
    datasets: [
      {
        label: '%',
        data: formattedData.label.map(({ value }: any) => value),
        backgroundColor: colors,
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
