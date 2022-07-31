import { FormField } from '../../../forms/types';

import { InflowsFilterFormShape } from './types';

export const typeOptions = [
  { label: 'Inflow', value: 'DEPOSIT' },
  { label: 'Outflow', value: 'WITHDRAWAL' },
];

export const inflowFilterFormFields: FormField<keyof InflowsFilterFormShape> = {
  selectInflowType: {
    name: 'selectInflowType',
    id: 'inflowFilterForm.selectInflowType',
    placeholder: 'Select Type',
    options: typeOptions,
  },
  selectInflowAsset: {
    name: 'selectInflowAsset',
    id: 'inflowFilterForm.selectInflowAsset',
    placeholder: 'Select Asset',
  },
  selectInflowValue: {
    name: 'selectInflowValue',
    id: 'inflowFilterForm.selectInflowValue',
    placeholder: 'Enter Amount',
  },
  selectInflowValueInBaseCurrency: {
    name: 'selectInflowValueInBaseCurrency',
    id: 'inflowFilterForm.selectInflowValueInBaseCurrency',
    placeholder: 'Enter Amount, USDT',
  },

  searchInflowID: {
    name: 'searchInflowID',
    id: 'inflowFilterForm.searchInflowID',
    placeholder: 'Enter ID',
  },
};

export const inflowFilterSchemaKeys = Object.keys(
  inflowFilterFormFields,
) as (keyof InflowsFilterFormShape)[];
