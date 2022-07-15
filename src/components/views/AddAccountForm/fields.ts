import { FormField } from '../../forms/types';

import { AddAccountFormShape } from './types';

const pairsList = ['usdt', 'usdc', 'busd', 'tusd'];
const alertList = ['email', 'sms', 'telegram'];

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
    options: ['USDT'],
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
    options: ['Binance'],
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
    type: 'checkbox',
    name: 'stopLossOrder',
    label: 'Stop-loss-order required',
    id: 'addAccount.stopLossOrder',
    placeholder: '',
  },
  wrongCurrencyAlert: {
    type: 'checkbox',
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
    options: pairsList,
  },
  allowedSecondPairs: {
    type: 'select',
    name: 'allowedSecondPairs',
    id: 'addAccount.allowedSecondPairs',
    placeholder: '',
    options: pairsList,
  },

  alertKey: {
    type: 'select',
    name: 'alertKey',
    id: 'addAccount.alertKey',
    placeholder: '',
    options: alertList,
  },
  alertValue: {
    type: 'text',
    label: '',
    name: 'alertValue',
    id: 'addAccount.alertValue',
    placeholder: '',
  },
};

export const addAccountSchemaKeys = Object.keys(
  addAccountFormFields,
) as (keyof AddAccountFormShape)[];
