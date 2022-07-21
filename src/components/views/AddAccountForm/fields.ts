import { FormField } from '../../forms/types';

import { AddAccountFormShape } from './types';

export const currencyList = [
  { value: 'usdt', label: 'USDT' },
  { value: 'usdc', label: 'USDC' },
  { value: 'busd', label: 'BUSD' },
  { value: 'tusd', label: 'TUSD' },
];
export const alertList = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'telegram', label: 'Telegram' },
];
export const refreshIntervalList = [
  { value: '3m', label: '3m' },
  { value: '5m', label: '5m' },
  { value: '7m', label: '7m' },
  { value: '9m', label: '9m' },
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: '2h', label: '2h' },
  { value: '4h', label: '4h' },
  { value: '8h', label: '8h' },
  { value: '12h', label: '12h' },
  { value: '16h', label: '16h' },
  { value: '24h', label: '24h' },
];

export const addAccountFormFields: FormField<keyof AddAccountFormShape> = {
  name: {
    name: 'name',
    type: 'text',
    label: 'Name',
    id: 'addAccount.name',
    placeholder: 'Enter account name',
  },
  baseCurrency: {
    type: 'select',
    name: 'baseCurrency',
    label: 'Base currency',
    id: 'addAccount.baseCurrency',
    placeholder: 'USDT',
    options: [{ label: 'USDT', value: 'USDT' }],
  },
  startCapital: {
    type: 'text',
    name: 'startCapital',
    label: 'Start capital, base currency',
    id: 'addAccount.startCapital',
    placeholder: 'Enter start capital',
  },
  exchange: {
    type: 'select',
    name: 'exchange',
    label: 'Exchange',
    id: 'addAccount.exchange',
    placeholder: 'Binance',
    options: [{ label: 'Binance', value: 'Binance' }],
  },
  apiKey: {
    type: 'text',
    name: 'apiKey',
    label: 'Api key',
    id: 'addAccount.apiKey',
    placeholder: 'Enter API key',
  },
  apiSecret: {
    type: 'text',
    name: 'apiSecret',
    label: 'Api secret',
    id: 'addAccount.apiSecret',
    placeholder: 'Enter API secret',
  },
  refreshInterval: {
    type: 'select',
    name: 'refreshInterval',
    label: 'Refresh Interval',
    id: 'addAccount.refreshInterval',
    placeholder: 'Choose time interval',
    options: refreshIntervalList,
  },
  maxDrawdown: {
    type: 'text',
    name: 'maxDrawdown',
    label: 'Maximum drawdown, in %',
    id: 'addAccount.maxDrawdown',
    placeholder: 'Enter maximum drawdown',
  },
  maxPosition: {
    type: 'text',
    name: 'maxPosition',
    label: 'Maximum position size, in %',
    id: 'addAccount.maxPosition',
    placeholder: 'Enter maximum position size',
  },
  maxRisk: {
    type: 'text',
    name: 'maxRisk',
    label: 'Maximum risk position, in %',
    id: 'addAccount.maxRisk',
    placeholder: 'Enter maximum risk position',
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
  allowedPairs: {
    type: 'select',
    name: 'allowedPairs',
    id: 'addAccount.allowedPairs',
    placeholder: '',
    options: currencyList,
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
