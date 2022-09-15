import { isUndefined } from 'lodash';

const parseAccountBody = (body: any, tradingPairs: any): any => ({
  testnet: true,
  status: 'ACTIVE',
  name: body.name.trim(),
  // startCapitalInBaseCurrency: body.startCapital,
  baseCurrency: {
    id: body.baseCurrency,
  },
  allowedCurrencies: filterAllowedCurrency(body?.allowedPairs, tradingPairs).allowedCurrencies,
  wallets: [
    {
      platform: {
        id: 1,
      },
      apiKey: body.apiKey,
      apiSecret: body.apiSecret,
      refreshInterval: body.refreshInterval,
      alertTriggers: {
        maxDrawDown: Number(body.maxDrawdown),
        maxPositionSize: body.maxPosition,
        maxRiskPosition: body.maxRisk,
        longTradeAllowed: true,
        shortTradeAllowed: true,
        stopLossOrderRequired: body.stopLossOrder,
      },
    },
  ],
  alertsDestinations: body.alertsDestinations,
  allowedPairs: filterAllowedCurrency(body?.allowedPairs, tradingPairs).allowedPairs,
});

const filterAllowedCurrency = (data: any, tradingPairs: any) => {
  const allowedPairs: any[] = [];
  const allowedCurrencies: any[] = [];

  data?.map((item: any) => {
    if (isUndefined(item?.to?.id)) {
      allowedCurrencies.push({
        currency: {
          id: item?.from?.id,
        },
      });
    } else if (!isUndefined(item?.to?.id) && !isUndefined(item?.from?.id)) {
      const pair = tradingPairs.find(
        ({ to, from }: any) =>
          to?.id === Number(item?.to?.id) && from?.id === Number(item?.from?.id),
      );
      allowedPairs.push({ tradingPair: { id: pair?.id } });
    }
  });

  return { allowedPairs, allowedCurrencies };
};

const parseBody = {
  parseAccountBody,
};

export default parseBody;
