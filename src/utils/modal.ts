import { chartColor } from './chart';

export const modalList = [
  {
    id: 1,
    key: 'Seed Capital',
    value: '5.567,567',
  },
  {
    id: 2,
    key: 'Current open profit, USDT',
    value: '647.567,567',
  },
  {
    id: 3,
    key: 'Earned capital, USDT',
    value: '-318,4848',
  },
  {
    id: 4,
    key: 'Performance',
    value: '144%',
  },
  {
    id: 5,
    key: 'Current Capital, USDT',
    value: '18.567,567',
    info: 'Updated at 21.01.2022 16:21:01',
  },
];

export const modalChartList = [
  {
    id: 1,
    header: 'Trading Pairs Chart',
    data: {
      labels: [
        'USDT/BTC - 20% ',
        'XRP/USDC - 18%',
        'XRP/USDT - 15%',
        'BTC/ETH - 15%',
        'BNB/XRP - 10%',
        'ETH/XRP - 10%',
        'BNB/XRP - 5%',
        'ETH/XRP - 5%',
      ],
      datasets: [
        {
          label: 'Trading Pairs Chart',
          data: [20, 18, 15, 15, 10, 10, 5, 5],
          customTooltips: true,
          backgroundColor: chartColor,
          borderWidth: 0,
        },
      ],
    },
  },
  {
    id: 2,
    header: 'Asset Chart',
    data: {
      labels: [
        'USDT/BTC - 20% ',
        'XRP/USDC - 18%',
        'XRP/USDT - 15%',
        'BTC/ETH - 15%',
        'BNB/XRP - 10%',
        'ETH/XRP - 10%',
        'BNB/XRP - 5%',
        'ETH/XRP - 5%',
        'Others - 2%',
      ],
      datasets: [
        {
          label: 'Trading Pairs Chart',
          data: [20, 18, 15, 15, 10, 10, 5, 5, 2],
          customTooltips: true,
          backgroundColor: chartColor,
          borderWidth: 0,
        },
      ],
    },
  },
];
