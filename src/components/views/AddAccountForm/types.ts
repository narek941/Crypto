import { SubmitHandler } from 'react-hook-form';

export type AddAccountFormShape = {
  name: string;
  baseCurrency: any;
  exchange: string;
  apiKey: string;
  apiSecret: string;
  refreshInterval: string;
  maxDrawdown: string;
  maxPosition: number;
  maxRisk: number;
  allowedPairs: any[];
  alertsDestinations: any[];
  stopLossOrder: boolean;
  wrongCurrencyAlert: boolean;
};

export interface IAddAccount {
  onClick: SubmitHandler<AddAccountFormShape>;
  isEditable?: boolean;
}
