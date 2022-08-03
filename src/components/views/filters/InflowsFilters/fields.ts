import { typeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { InflowsFilterFormShape } from './types';

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
    placeholder: 'Select asset',
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
