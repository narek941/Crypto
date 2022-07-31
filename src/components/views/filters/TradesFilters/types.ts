import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  tradesDate: any;
  tradesPair: any;
  tradesSide: any;
  tradesPrice: any;
  tradesValue: any;
  tradesTotalPrice: any;
  tradesValueInBaseCurrency: any;
  tradesFee: any;
  tradesFeeInBaseCurrency: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}
