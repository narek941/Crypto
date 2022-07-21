export const isServer = typeof window === 'undefined';

export const parseAddAccount = (body: any) => ({
  name: body.name,
  startCapitalInBaseCurrency: body.startCapital,
  wallets: [
    {
      platform: {
        id: 5,
      },
      apiKey: body.apiKey,
      apiSecret: body.apiSecret,
      refreshInterval: body.refreshInterval,
      alertTriggers: {
        maxDrawDown: body.maxDrawdown,
        maxPositionSize: body.maxPosition,
        maxRiskPosition: body.maxRisk,
        longTradeAllowed: true,
        shortTradeAllowed: true,
        stopLossOrderRequired: body.stopLossOrder,
      },
      // statistic: {
      //   currentCapitalInBtc: 0,
      //   profitLoss: 0,
      //   refreshDate: '2022-05-20T13:05:55.901Z',
      //   currentCapitalInBaseCurrency: 0,
      //   profitLossInBaseCurrency: 0,
      // },
    },
  ],
  baseCurrency: {
    id: 1,
  },
  alertsDestinations: body.alertsDestinations,
  allowedCurrencies: [
    {
      currency: {
        id: 6,
      },
    },
  ],
  allowedPairs: body.allowedPairs,
  statistics: {
    startCapitalInBaseCurrency: '',
    currentCapitalInBaseCurrency: '0',
    capitalRefreshDate: '',
    currentOpenProfitInBaseCurrency: '',
    earnedCapitalInBaseCurrency: '',
    earnedCapitalInPercent: '',
    productivityInPercent: '',
    id: 7,
  },
  status: 'ACTIVE',
});
