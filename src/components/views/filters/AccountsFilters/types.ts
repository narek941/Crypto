import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  accountName: string;
  accountStatus: string;
  accountAVGTrades: any;
  accountId: string;
  accountSeed: any;
  accountCurrentCapital: any;
  accountOpenProfit: any;
  accountEarnedCapital: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}

export interface IAccountsFilterValue {
  minCurrentOpenProfitInPercent: number | null | string;
  maxCurrentOpenProfitInPercent: number | null | string;
}
