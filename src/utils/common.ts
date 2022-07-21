import { currencyList } from 'components/views/AddAccountForm/fields';

export const isServer = typeof window === 'undefined';

export const parseAddAccount = (body: any) =>
  JSON.stringify({
    name: body.name,
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
        statistic: {
          currentCapitalInBtc: 0,
          profitLoss: 0,
          refreshDate: '2022-05-20T13:05:55.901Z',
          currentCapitalInBaseCurrency: 0,
          profitLossInBaseCurrency: 0,
        },
      },
    ],
    baseCurrency: {
      id: 1,
    },
    alertsDestinations: [
      {
        type: body.alertKey0,
        emailAddress: body.alertValue0,
        phoneNumber: '',
      },
    ],
    allowedCurrencies: [
      {
        currency: {
          id: 6,
        },
      },
    ],
    allowedPairs: [
      {
        from: {
          id: currencyList.indexOf(body.allowedFirstPairs0),
        },
        to: {
          id: currencyList.indexOf(body.allowedSecondPairs0),
        },
      },
    ],
    statistic: {
      startCapitalInBaseCurrency: 1,
      currentCapitalInBaseCurrency: 2,
      capitalRefreshDate: '2022-05-20T13:05:55.902Z',
      currentOpenProfitInBaseCurrency: 1,
      earnedCapitalInBaseCurrency: 1,
      earnedCapitalInPercent: 1,
      productivityInPercent: 1,
    },
    status: 'ACTIVE',
  });
