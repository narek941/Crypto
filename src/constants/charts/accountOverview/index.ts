export const chartColor = [
  '#6794DC',
  '#6771DC',
  '#8067DC',
  '#C767DC',
  '#D0358F',
  '#67B7DC',
  '#14AB6C',
  '#FE8463',
  '#D7504B',
];

export const accountOverviewChart = [
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
