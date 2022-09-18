import { formHelper } from 'utils';

import { FormField } from '../../forms/types';

import { AddAccountFormShape } from './types';

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
    placeholder: 'Choose base currency',
    // options: [{ label: 'USDT', value: 'USDT' }],
  },
  // startCapital: {
  //   type: 'text',
  //   name: 'startCapital',
  //   label: 'Start capital, base currency',
  //   id: 'addAccount.startCapital',
  //   placeholder: 'Enter start capital',
  // },
  exchange: {
    type: 'select',
    name: 'exchange',
    label: 'Exchange',
    id: 'addAccount.exchange',
    placeholder: 'Binance',
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
    options: formHelper.refreshIntervalList,
  },
  maxDrawdown: {
    type: 'select',
    name: 'maxDrawdown',
    label: 'Maximum drawdown, in %',
    id: 'addAccount.maxDrawdown',
    placeholder: 'Enter maximum drawdown',
    options: formHelper.maximumPercentDropDown,
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
    placeholder: 'Choose currency',
  },
  alertsDestinations: {
    name: 'alertsDestinations',
    id: 'addAccount.alertsDestinations',
    placeholder: 'Choose destination',
    options: formHelper.alertList,
  },
};

export const addAccountSchemaKeys = Object.keys(
  addAccountFormFields,
) as (keyof AddAccountFormShape)[];
