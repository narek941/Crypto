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

export interface IAccountTradesFilterValue {
  minTradeTime: null | number;
  maxTradeTime: null | number;
  minPrice: null | number;
  maxPrice: null | number;
  minTotalPrice: null | number;
  maxTotalPrice: null | number;
  minTotalPriceInBaseCurrency: null | number;
  maxTotalPriceInBaseCurrency: null | number;
  minAmount: null | number;
  maxAmount: null | number;
  minFees: null | number;
  maxFees: null | number;
  minFeesInBaseCurrency: null | number;
  maxFeesInBaseCurrency: null | number;
}
