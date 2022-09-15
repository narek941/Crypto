import { typeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { InflowsFilterFormShape } from './types';

export const inflowFilterFormFields: FormField<keyof InflowsFilterFormShape> = {
  selectInflowType: {
    name: 'selectInflowType',
    id: 'inflowFilterForm.selectInflowType',
    placeholder: 'Select Type',
    options: typeOptions,
    tooltip: 'transaction_type',
  },
  selectInflowAsset: {
    name: 'selectInflowAsset',
    id: 'inflowFilterForm.selectInflowAsset',
    placeholder: 'Select asset',
    tooltip: 'asset_name',
  },
  selectInflowValue: {
    name: 'selectInflowValue',
    id: 'inflowFilterForm.selectInflowValue',
    placeholder: 'Select Amount',
    tooltip: 'asset_amount',
  },
  selectInflowValueInBaseCurrency: {
    name: 'selectInflowValueInBaseCurrency',
    id: 'inflowFilterForm.selectInflowValueInBaseCurrency',
    placeholder: 'Select Amount, USDT',
    tooltip: 'amount_in_base_currency',
  },

  searchInflowID: {
    name: 'searchInflowID',
    id: 'inflowFilterForm.searchInflowID',
    placeholder: 'Enter ID',
    tooltip: 'id',
  },
};

export const inflowFilterSchemaKeys = Object.keys(
  inflowFilterFormFields,
) as (keyof InflowsFilterFormShape)[];
