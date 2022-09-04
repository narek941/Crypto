import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  selectWalletAsset: any;
  searchWalletValue: any;
  searchWalletValueInBaseCurrency: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}

export interface IAccountRecordsFilterValue {
  minValue: null | number;
  maxValue: null | number;
  minBaseCurrencyValue: null | number;
  maxBaseCurrencyValue: null | number;
}
