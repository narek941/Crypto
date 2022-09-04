const parseAccountBody = (body: any): any => ({
  status: 'ACTIVE',
  name: body.name.trim(),
  // startCapitalInBaseCurrency: body.startCapital,
  baseCurrency: {
    id: body.baseCurrency,
  },
  allowedCurrencies: [
    {
      id: 1,
      currency: {
        id: 508,
      },
    },
  ],
  wallets: [
    {
      platform: {
        id: 1,
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
    },
  ],
  alertsDestinations: body.alertsDestinations,
  allowedPairs: body.allowedPairs,
});

const parseBody = {
  parseAccountBody,
};

export default parseBody;
