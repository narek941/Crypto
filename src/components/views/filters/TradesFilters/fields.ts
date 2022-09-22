import { sideOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  tradesDate: {
    name: 'selectTradesDate',
    id: 'filterForm.tradesDate',
    placeholder: 'Select Time',
    tooltip: 'transaction_date_and_time',
  },

  tradesSide: {
    name: 'tradesSide',
    type: 'Select',
    id: 'filterForm.tradesSide',
    placeholder: 'Select Side',
    options: sideOptions,
    tooltip: 'side',
  },

  tradesPair: {
    name: 'tradesPair',
    type: 'DualSelect',
    id: 'filterForm.tradesPair',
    placeholder: 'Select Symbol',
    tooltip: 'coin_pair_name',
  },

  tradesPrice: {
    name: 'tradesPrice',
    type: 'number',
    id: 'filterForm.tradesPrice',
    placeholder: 'Select Price',
  },
  tradesValue: {
    name: 'tradesValue',
    type: 'number',
    id: 'filterForm.tradesValue',
    placeholder: 'Select Amount',
    tooltip: 'value',
  },

  tradesTotalPrice: {
    name: 'tradesTotalPrice',
    type: 'number',
    id: 'filterForm.tradesTotalPrice',
    placeholder: 'Select Total Price',
    tooltip: 'price_per_coin_in_base_currency',
  },
  tradesValueInBaseCurrency: {
    name: 'tradesValueInBaseCurrency',
    type: 'number',
    id: 'filterForm.tradesValueInBaseCurrency',
    placeholder: 'Select Total price, USDT',
    tooltip: 'value_in_base_currency',
  },
  tradesFee: {
    name: 'tradesFee',
    type: 'number',
    id: 'filterForm.tradesFee',
    placeholder: 'Select Fees',
    tooltip: 'fees',
  },
  tradesFeeInBaseCurrency: {
    name: 'tradesFeeInBaseCurrency',
    type: 'number',
    id: 'filterForm.tradesFeeInBaseCurrency',
    placeholder: 'Select Fees, USDT',
    tooltip: 'fees_in_base_currency',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
