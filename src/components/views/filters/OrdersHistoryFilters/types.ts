import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  historyPair: any;
  historyUpdateTime: any;
  historySide: any;
  historyType: any;
  historyValue: any;
  historyID: any;
  historyValueInBaseCurrency: any;
  searchHistoryStop: any;
  searchHistoryLimit: any;
  searchHistoryModifiers: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}

export interface IAccountOrdersFilterValue {
  minValue: null | number;
  maxValue: null | number;
  minLastOperationTime: null | any;
  maxLastOperationTime: null | any;
  minValueInBaseCurrency: null | number;
  maxValueInBaseCurrency: null | number;
  minStopPrice: null | number;
  maxStopPrice: null | number;
  minLimitPrice: null | number;
  maxLimitPrice: null | number;
}
