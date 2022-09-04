import { SubmitHandler } from 'react-hook-form';

export type InflowsFilterFormShape = {
  searchInflowID: any;
  selectInflowValueInBaseCurrency: any;
  selectInflowValue: any;
  selectInflowAsset: any;
  selectInflowType: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<InflowsFilterFormShape>;
}

export interface IAccountInflowFilterValue {
  minAmount: null | number;
  maxAmount: null | number;
  minAmountInBaseCurrency: null | number;
  maxAmountInBaseCurrency: null | number;
}
