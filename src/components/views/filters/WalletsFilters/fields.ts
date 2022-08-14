import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const walletFilterFormFields: FormField<keyof FilterFormShape> = {
  selectWalletAsset: {
    name: 'selectWalletAsset',
    type: 'select',
    id: 'walletFilterForm.selectWalletAsset',
    placeholder: 'Select Asset',
  },

  searchWalletValue: {
    name: 'searchWalletValue',
    type: 'number',
    id: 'walletFilterForm.selectSide',
    placeholder: 'Select Value',
  },
  searchWalletValueInBaseCurrency: {
    name: 'searchWalletValueInBaseCurrency',
    type: 'number',
    id: 'walletFilterForm.selectSide',
    placeholder: 'Select Value, USDT',
  },
};

export const filterSchemaKeys = Object.keys(walletFilterFormFields) as (keyof FilterFormShape)[];
