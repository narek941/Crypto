export type AddAccountFormShape = {
  name: string;
  baseCurrency: string;
  startCapital: string;
  exchange: string;
  apiKey: string;
  apiSecret: string;
  maxDrawdown: string;
  maxPosition: string;
  maxRisk: string;
  allowedFirstPairs: string;
  allowedSecondPairs: string;
  alertValue: string;
  alertKey: string;
  stopLossOrder: boolean;
  wrongCurrencyAlert: boolean;
};
