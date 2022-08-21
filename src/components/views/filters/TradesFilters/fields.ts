import { sideOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  tradesDate: {
    name: 'selectTradesDate',
    id: 'filterForm.tradesDate',
    placeholder: 'Select Time',
  },

  tradesSide: {
    name: 'tradesSide',
    type: 'Select',
    id: 'filterForm.tradesSide',
    placeholder: 'Select Side',
    options: sideOptions,
  },

  tradesPair: {
    name: 'tradesPair',
    type: 'DualSelect',
    id: 'filterForm.tradesPair',
    placeholder: 'Select pairs',
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
    placeholder: 'Select Value',
  },

  tradesTotalPrice: {
    name: 'tradesTotalPrice',
    type: 'number',
    id: 'filterForm.tradesTotalPrice',
    placeholder: 'Select Total Price',
  },
  tradesValueInBaseCurrency: {
    name: 'tradesValueInBaseCurrency',
    type: 'number',
    id: 'filterForm.tradesValueInBaseCurrency',
    placeholder: 'Select Value, USDT',
  },
  tradesFee: {
    name: 'tradesFee',
    type: 'number',
    id: 'filterForm.tradesFee',
    placeholder: 'Select Fees',
  },
  tradesFeeInBaseCurrency: {
    name: 'tradesFeeInBaseCurrency',
    type: 'number',
    id: 'filterForm.tradesFeeInBaseCurrency',
    placeholder: 'Select Fees, USDT',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
