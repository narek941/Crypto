export const LineChartLabels = [
  'Jan',
  '',
  'Mar',
  '',
  'May',
  '',
  'Jul',
  '',
  'Sep',
  '',
  'Nov',
  '',
  'Jan',
  '',
  'Mar',
  '',
  'May',
  '',
  'Jul',
  '',
  'Sep',
  '',
  'Nov',
  '',
  'Jan',
  '',
  'Mar',
  '',
  'May',
  '',
  'Jul',
  '',
  'Sep',
  '',
  'Nov',
  '',
  'Jan',
  '',
  'Mar',
  '',
  'May',
  '',
  'Jul',
  '',
  'Sep',
  '',
  'Nov',
  '',
];

export const accountsAnalyticsLineChart = [
  {
    data: {
      LineChartLabels,
      datasets: [
        {
          data: [50, 44, 59, 59, 67, 70, 74, 62, 76, 71, 72, 68, 81, 77, 78, 75, 58, 58, 51],
          borderColor: '#009688',
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
  {
    data: {
      LineChartLabels,
      datasets: [
        {
          data: [50, 44, 59, 59, 67, 70, 74, 62, 76, 71, 72, 68, 81, 77, 78, 75, 58, 58, 51],
          borderColor: '#009688',
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
];

const accountsAnalyticsChart = {
  lineChart: accountsAnalyticsLineChart,
};

export default accountsAnalyticsChart;
