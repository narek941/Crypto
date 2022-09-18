import { useState, useEffect, useRef, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
import { usePrevious } from 'react-use';
import { isNull } from 'lodash';

import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';

export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA',
};

const HEIGHT = 300;

const TradingViewChart = ({
  id,
  type = CHART_TYPES.BAR,
  data,
  field,
  timeField,
  width,
  field2,
  baseCurrency,
  className,
}) => {
  const ref = useRef();
  const [chartCreated, setChartCreated] = useState(false);
  const dataPrev = usePrevious(data);

  const formattedData = useMemo(
    () =>
      data?.map((entry) => {
        return {
          time: !isNull(entry[timeField]) && moment.utc(entry[timeField]).format('YYYY-MM-DD'),
          value: parseFloat(entry[field]),
        };
      }),
    [data, field, timeField],
  );
  // adjust the scale based on the type of chart
  const topScale = type === CHART_TYPES.AREA ? 0.32 : 0.2;
  const darkMode = useAppSelector(authSelectors.selectIsDarkMode);
  const textColor = darkMode ? 'white' : 'black';
  const linesColor = darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(33, 33, 33, 0.16)';

  useEffect(() => {
    if (data !== dataPrev && chartCreated) {
      // remove the tooltip element
      const tooltip = document.getElementById('tooltip-id' + type);
      const node = document.getElementById('test-id' + type);
      node?.removeChild(tooltip);
      chartCreated.resize(0, 0);
      setChartCreated();
    }
  }, [chartCreated, data, dataPrev, type]);

  useEffect(() => {
    if (chartCreated) {
      if (darkMode) {
        chartCreated.applyOptions(darkOptions);
      } else {
        chartCreated.applyOptions(lightOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const darkOptions = {
    width: width,
    height: HEIGHT,
    layout: {
      backgroundColor: 'transparent',
      textColor: '#ffffff',
    },
    rightPriceScale: {
      scaleMargins: {
        top: topScale,
        bottom: 0,
      },
      borderVisible: false,
    },
    timeScale: {
      fixRightEdge: true,
      fixLeftEdge: true,
      borderVisible: true,
      borderColor: 'rgba(255, 255, 255, 0.12)',
    },

    grid: {
      horzLines: {
        color: linesColor,
        visible: true,
      },
      vertLines: {
        color: 'rgba(197, 203, 206, 0.5)',
        visible: false,
      },
    },
    crosshair: {
      horzLine: {
        visible: false,
        labelVisible: false,
      },
      vertLine: {
        visible: true,
        style: 0,
        width: 2,
        color: 'rgba(32, 38, 46, 0.1)',
        labelVisible: false,
      },
    },
    localization: {
      // priceFormatter: (val) => formattedNum(val, true),
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lightOptions = {
    width: width,
    height: HEIGHT,
    layout: {
      backgroundColor: 'transparent',
      textColor: '#000000',
    },
    rightPriceScale: {
      scaleMargins: {
        top: topScale,
        bottom: 0,
      },
      borderVisible: false,
    },
    timeScale: {
      borderVisible: true,
      borderColor: 'rgba(255, 255, 255, 0.12)',
      fixRightEdge: true,
      fixLeftEdge: true,
    },

    grid: {
      horzLines: {
        color: linesColor,
        visible: true,
      },
      vertLines: {
        color: 'rgba(197, 203, 206, 0.5)',
        visible: false,
      },
    },
    crosshair: {
      horzLine: {
        visible: false,
        labelVisible: false,
      },
      vertLine: {
        visible: true,
        style: 0,
        width: 2,
        color: 'rgba(32, 38, 46, 0.1)',
        labelVisible: false,
      },
    },
    localization: {
      // priceFormatter: (val) => formattedNum(val, true),
    },
  };

  useEffect(() => {
    if (!chartCreated && formattedData) {
      const chart = createChart(ref.current, darkMode ? darkOptions : lightOptions);

      const series = chart.addAreaSeries({
        topColor: 'transparent',
        bottomColor: 'transparent',
        lineColor: '#009688',
        lineWidth: 2,
        crosshairMarkerBackgroundColor: textColor,
      });

      series.setData(formattedData);
      const toolTip = document.createElement('div');
      toolTip.setAttribute('id', 'tooltip-id' + type);
      toolTip.className = className;
      ref.current.appendChild(toolTip);
      toolTip.style.display = 'block';

      chart.subscribeCrosshairMove(function (param) {
        if (
          param === undefined ||
          param.time === undefined ||
          param.point.x < 0 ||
          param.point.x > width ||
          param.point.y < 0 ||
          param.point.y > HEIGHT
        ) {
          toolTip.style.display = 'none';
        } else {
          const hoveredObject = data.filter((item) =>
            moment
              .utc(new Date(item.snapshotDate))
              .isSame(
                new Date(
                  moment.utc(param.time.year + '.' + param.time.month + '.' + param.time.day),
                ),
                'day',
              ),
          );

          const dateStr = moment
            .utc(param.time.year + '.' + param.time.month + '.' + param.time.day)
            .format('DD.MM.YYYY');
          var price = param.seriesPrices.get(series);
          const secondField = hoveredObject.map((item) => item[field2])
            ? hoveredObject.map((item) => item[field2])
            : '';

          const secondFieldValue = field2
            ? hoveredObject.map((item) => item.account.baseCurrency.name)
            : '';
          toolTip.innerHTML =
            `<div id={tooltip_wrapper}" style="background: rgba(46, 46, 46, 0.9);border-radius:4px; padding:12px; width:100%;height:100%; display:flex; flex-direction:column;gap:8px;" >` +
            `<div style="font-size: 12px; color:#ffffff">` +
            price +
            ' ' +
            baseCurrency +
            '</div>' +
            `<div style="font-size: 12px; color:#ffffff">` +
            secondField +
            ' ' +
            secondFieldValue +
            '</div>' +
            `<div style="font-size: 12px; color:rgba(171, 154, 183, 0.3);">` +
            dateStr +
            '</div>' +
            '</div>';
          var coordinate = series.priceToCoordinate(price);
          var shiftedCoordinate = param.point.x;
          var toolTipWidth = 80;
          var toolTipHeight = 80;
          var toolTipMargin = 0;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(ref.current.clientWidth - toolTipWidth, shiftedCoordinate),
          );
          var coordinateY =
            coordinate - toolTipHeight - toolTipMargin > 0
              ? coordinate - toolTipHeight - toolTipMargin
              : Math.max(
                  0,
                  Math.min(
                    ref.current.clientHeight - toolTipHeight - toolTipMargin,
                    coordinate + toolTipMargin,
                  ),
                );
          toolTip.style.display = 'block';
          toolTip.style.padding = '12px';
          toolTip.style.left = shiftedCoordinate + 'px';
          toolTip.style.top = coordinateY + 'px';
        }
      });

      setChartCreated(chart);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartCreated, formattedData, darkMode]);

  return (
    <div styles={{ positions: 'absolute' }}>
      <div ref={ref} id={'test-id' + type + id} />
    </div>
  );
};

export default TradingViewChart;
