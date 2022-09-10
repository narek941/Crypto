const parseAccountBody = (body: any): any => ({
  testnet: true,
  status: 'ACTIVE',
  name: body.name.trim(),
  // startCapitalInBaseCurrency: body.startCapital,
  baseCurrency: {
    id: body.baseCurrency,
  },
  allowedCurrencies: body?.allowedCurrencies,
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
  allowedPairs: body?.allowedPairs,
});

// const filterAllowedCurrency = (data: any, tradingPairs: any) => {
//   const allowedPairs: any[] = [];
//   const allowedCurrencies: any[] = [];
//   // eslint-disable-next-line no-console
//   console.log(data);
//   data?.map((item: any) => {
//     // eslint-disable-next-line no-console
//     console.log(item, 'item');
//     if (isUndefined(item.to.id) && !isUndefined(item.from.id)) {
//       allowedCurrencies.push({
//         currency: {
//           id: item?.to?.id,
//         },
//       });
//     } else if (!isUndefined(item.to.id) && !isUndefined(item.from.id)) {
//       allowedPairs.push({
//         tradingPair: {
//           id: tradingPairs.find(
//             (prop: any) => prop?.to?.id === item.to.id && item?.from?.id == prop?.from?.id,
//           )?.id,
//         },
//       });
//     }
//   });

//   return { allowedPairs, allowedCurrencies };
// };

const parseBody = {
  parseAccountBody,
};

export default parseBody;
