import { sideOptions, typeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

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
    placeholder: 'Last Operation Time',
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
    options: typeOptions,
  },

  historyValue: {
    name: 'historyValue',
    id: 'filterForm.historyValue',
    placeholder: 'Enter Value',
  },

  historyID: {
    name: 'historyID',
    type: 'Search',
    id: 'filterForm.historyID',
    placeholder: 'Enter ID',
  },

  historyValueInBaseCurrency: {
    name: 'historyValueInBaseCurrency',
    type: 'select',
    id: 'filterForm.historyValueInBaseCurrency',
    placeholder: 'Enter value, USDT',
  },
  searchHistoryStop: {
    name: 'searchHistoryStop',
    type: 'Search',
    id: 'filterForm.searchHistoryStop',
    placeholder: 'Stop price',
  },
  searchHistoryLimit: {
    name: 'searchHistoryLimit',
    type: 'Search',
    id: 'filterForm.searchHistoryLimit',
    placeholder: 'Limit price',
  },

  searchHistoryModifiers: {
    name: 'searchHistoryModifiers',
    type: 'Search',
    id: 'filterForm.searchHistoryModifiers',
    placeholder: 'Enter Modifiers',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
