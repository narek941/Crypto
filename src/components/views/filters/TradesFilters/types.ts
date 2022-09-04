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
  minTradeTime: null | number | string | any;
  maxTradeTime: null | number | string | any;
  minPrice: null | number | string;
  maxPrice: null | number | string;
  minTotalPrice: null | number | string;
  maxTotalPrice: null | number | string;
  minTotalPriceInBaseCurrency: null | number | string;
  maxTotalPriceInBaseCurrency: null | number | string;
  minAmount: null | number | string;
  maxAmount: null | number | string;
  minFees: null | number | string;
  maxFees: null | number | string;
  minFeesInBaseCurrency: null | number | string;
  maxFeesInBaseCurrency: null | number | string;
}
