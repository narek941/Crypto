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
    placeholder: 'Select Amount',
  },
  searchWalletValueInBaseCurrency: {
    name: 'searchWalletValueInBaseCurrency',
    type: 'number',
    id: 'walletFilterForm.selectSide',
    placeholder: 'Select Amount, USDT',
  },
};

export const filterSchemaKeys = Object.keys(walletFilterFormFields) as (keyof FilterFormShape)[];
