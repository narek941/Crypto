import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const sideOptions = [
  { label: 'BUY', value: 'BUY' },
  { label: 'SELL', value: 'SELL' },
];

export const filterFormFields: FormField<keyof FilterFormShape> = {
  historyPair: {
    name: 'historyPair',
    type: 'DualSelect',
    id: 'filterForm.historyPair',
    placeholder: 'Select pairs',
  },

  historyUpdateTime: {
    name: 'selectHistoryUpdateTime',
    id: 'filterForm.historyUpdateTime',
    placeholder: 'Choose creation date',
  },

  historySide: {
    name: 'historySide',
    type: 'Select',
    id: 'filterForm.historySide',
    placeholder: 'Select Side',
    options: sideOptions,
  },
  historyType: {
    name: 'historyType',
    type: 'Select',
    id: 'filterForm.historyType',
    placeholder: 'Select Type',
    options: sideOptions,
  },

  historyValue: {
    name: 'historyValue',
    id: 'filterForm.historyValue',
    placeholder: 'history Value',
  },

  historyID: {
    name: 'historyID',
    type: 'Search',
    id: 'filterForm.historyID',
    placeholder: 'Search BY ID',
  },

  historyValueInBaseCurrency: {
    name: 'historyValueInBaseCurrency',
    type: 'select',
    id: 'filterForm.historyValueInBaseCurrency',
    placeholder: 'Select value, USDT',
  },
  searchHistoryStop: {
    name: 'searchHistoryStop',
    type: 'Search',
    id: 'filterForm.searchHistoryStop',
    placeholder: 'Select Stop',
  },
  searchHistoryLimit: {
    name: 'searchHistoryLimit',
    type: 'Search',
    id: 'filterForm.searchHistoryLimit',
    placeholder: 'Select Received, USDT',
  },

  searchHistoryModifiers: {
    name: 'searchHistoryModifiers',
    type: 'Search',
    id: 'filterForm.searchHistoryModifiers',
    placeholder: 'Select Received, USDT',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
