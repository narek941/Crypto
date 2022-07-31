import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const sideOptions = [
  { label: 'BUY', value: 'BUY' },
  { label: 'SELL', value: 'SELL' },
];

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
    type: 'Search',
    id: 'filterForm.tradesPrice',
    placeholder: 'Enter Price',
  },
  tradesValue: {
    name: 'tradesValue',
    type: 'Search',
    id: 'filterForm.tradesValue',
    placeholder: 'Enter Value',
  },

  tradesTotalPrice: {
    name: 'tradesTotalPrice',
    type: 'Search',
    id: 'filterForm.tradesTotalPrice',
    placeholder: 'Enter Value',
  },
  tradesValueInBaseCurrency: {
    name: 'tradesValueInBaseCurrency',
    type: 'Search',
    id: 'filterForm.tradesValueInBaseCurrency',
    placeholder: 'Enter Value',
  },
  tradesFee: {
    name: 'tradesFee',
    type: 'Search',
    id: 'filterForm.tradesFee',
    placeholder: 'Enter Value',
  },
  tradesFeeInBaseCurrency: {
    name: 'tradesFeeInBaseCurrency',
    type: 'Search',
    id: 'filterForm.tradesFeeInBaseCurrency',
    placeholder: 'Enter Value',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
