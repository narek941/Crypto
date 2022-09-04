import { sideOptions, ordersTypeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  historyPair: {
    name: 'historyPair',
    type: 'DualSelect',
    id: 'filterForm.historyPair',
    placeholder: 'Select Pair',
  },

  historyUpdateTime: {
    name: 'selectHistoryUpdateTime',
    id: 'filterForm.historyUpdateTime',
    placeholder: 'Select Last Operation Time',
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
    options: ordersTypeOptions,
  },

  historyValue: {
    name: 'historyValue',
    type: 'number',
    id: 'filterForm.historyValue',
    placeholder: 'Select Value',
  },

  historyID: {
    name: 'historyID',
    type: 'Search',
    id: 'filterForm.historyID',
    placeholder: 'Enter ID',
  },

  historyValueInBaseCurrency: {
    name: 'historyValueInBaseCurrency',
    type: 'number',
    id: 'filterForm.historyValueInBaseCurrency',
    placeholder: 'Select Value, USDT',
  },

  searchHistoryStop: {
    name: 'searchHistoryStop',
    type: 'number',
    id: 'filterForm.searchHistoryStop',
    placeholder: 'Select Stop Price',
  },
  searchHistoryLimit: {
    name: 'searchHistoryLimit',
    type: 'number',
    id: 'filterForm.searchHistoryLimit',
    placeholder: 'Select Limit Price',
  },

  searchHistoryModifiers: {
    name: 'searchHistoryModifiers',
    type: 'Search',
    id: 'filterForm.searchHistoryModifiers',
    placeholder: 'Enter Modifiers',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
