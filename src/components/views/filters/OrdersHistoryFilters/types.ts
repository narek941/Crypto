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
