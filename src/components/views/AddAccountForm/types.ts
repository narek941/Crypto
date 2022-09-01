import { SubmitHandler } from 'react-hook-form';

export type AddAccountFormShape = {
  name: string;
  baseCurrency: string;
  exchange: string;
  apiKey: string;
  apiSecret: string;
  refreshInterval: number;
  maxDrawdown: string;
  maxPosition: string;
  maxRisk: string;
  allowedPairs: any[];
  alertsDestinations: any[];
  stopLossOrder: boolean;
  wrongCurrencyAlert: boolean;
};

export interface IAddAccount {
  onClick: SubmitHandler<AddAccountFormShape>;
  isEditable?: boolean;
}
