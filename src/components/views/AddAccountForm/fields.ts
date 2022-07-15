import { FormField } from '../../forms/types';

import { AddAccountFormShape } from './types';

export const addAccountFormFields: FormField<keyof AddAccountFormShape> = {
  name: {
    name: 'name',
    type: 'text',
    label: 'Name',
    id: 'addAccount.name',
    placeholder: 'Enter Name',
  },
  baseCurrency: {
    type: 'select',
    name: 'baseCurrency',
    label: 'Base currency',
    id: 'addAccount.baseCurrency',
    placeholder: 'USDT',
    options: ['1', '2'],
  },
  startCapital: {
    type: 'text',
    name: 'startCapital',
    label: 'Start capital, base currency',
    id: 'addAccount.startCapital',
    placeholder: '',
  },
  exchange: {
    type: 'select',
    name: 'exchange',
    label: 'Exchange',
    id: 'addAccount.exchange',
    placeholder: 'Binance',
    options: ['1', '2'],
  },
  apiKey: {
    type: 'text',
    name: 'apiKey',
    label: 'Api key',
    id: 'addAccount.apiKey',
    placeholder: '',
  },
  apiSecret: {
    type: 'text',
    name: 'apiSecret',
    label: 'Api secret',
    id: 'addAccount.apiSecret',
    placeholder: '',
  },
  maxDrawdown: {
    type: 'text',
    name: 'maxDrawdown',
    label: 'Maximum drawdown, in %',
    id: 'addAccount.maxDrawdown',
    placeholder: '',
  },
  maxPosition: {
    type: 'text',
    name: 'maxPosition',
    label: 'Maximum position size, in %',
    id: 'addAccount.maxPosition',
    placeholder: '',
  },
  maxRisk: {
    type: 'text',
    name: 'maxRisk',
    label: 'Maximum risk position, in %',
    id: 'addAccount.maxRisk',
    placeholder: '',
  },
  stopLossOrder: {
    type: 'radio',
    name: 'stopLossOrder',
    label: 'Stop-loss-order required',
    id: 'addAccount.stopLossOrder',
    placeholder: '',
  },
  wrongCurrencyAlert: {
    type: 'radio',
    name: 'wrongCurrencyAlert',
    label: 'Wrong currency alert required',
    id: 'addAccount.wrongCurrencyAlert',
    placeholder: '',
  },
  allowedFirstPairs: {
    type: 'select',
    name: 'allowedFirstPairs',
    id: 'addAccount.allowedFirstPairs',
    placeholder: '',
    options: ['1', '2'],
  },
  allowedSecondPairs: {
    type: 'select',
    name: 'allowedSecondPairs',
    id: 'addAccount.allowedSecondPairs',
    placeholder: '',
    options: ['1', '2', '3'],
  },
};

export const addAccountSchemaKeys = Object.keys(
  addAccountFormFields,
) as (keyof AddAccountFormShape)[];
