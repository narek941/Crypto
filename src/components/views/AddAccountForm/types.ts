import { SubmitHandler } from 'react-hook-form';

export type AddAccountFormShape = {
  name: string;
  baseCurrency: string;
  startCapital: string;
  exchange: string;
  apiKey: string;
  apiSecret: string;
  refreshInterval: number;
  maxDrawdown: string;
  maxPosition: string;
  maxRisk: string;
  allowedPairs: any[];
  alertValue: string;
  alertKey: string;
  stopLossOrder: boolean;
  wrongCurrencyAlert: boolean;
};

export interface IAddAccount {
  onclick: SubmitHandler<AddAccountFormShape>;
  isEditable?: boolean;
}
