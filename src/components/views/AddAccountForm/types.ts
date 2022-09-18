import { SubmitHandler } from 'react-hook-form';

export type AddAccountFormShape = {
  name: string;
  baseCurrency: any;
  exchange: number;
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

export type AllowedPairsProps = {
  createdAt: string;
  deletedAt: string;
  id: number;
  tradingPair: {
    createdAt: string;
    deletedAt: string;
    from: any;
    id: number;
    name: string;
    to: any;
    updatedAt: string;
  };
  updatedAt: string;
};

export interface ISelectGroup {
  removePair: (id: string) => void;
  id: string;
  secondInput?: 'select' | 'input';
  formMethods: any;
  leftInputName?: string;
  rightInputName?: string;
  index?: number;
}
