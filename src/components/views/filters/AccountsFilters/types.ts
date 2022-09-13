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
  maxCurrentCapitalInBaseCurrency: number | null | string;
  maxCurrentOpenProfitInBaseCurrency: number | null | string;
  maxEarnedCapitalInBaseCurrency: number | null | string;
  maxEarnedCapitalInPercent: number | null | string;
  maxNumberDailyTransactions: number | null | string;
  maxProductivityInPercent: number | null | string;
  maxRefreshDate: number | null | string;
  maxStatsStartCapitalInBaseCurrency: number | null | string;
  minCurrentCapitalInBaseCurrency: number | null | string;
  minCurrentOpenProfitInBaseCurrency: number | null | string;
  minEarnedCapitalInBaseCurrency: number | null | string;
  minEarnedCapitalInPercent: number | null | string;
  minNumberDailyTransactions: number | null | string;
  minProductivityInPercent: number | null | string;
  minRefreshDate: number | null | string;
  minStatsStartCapitalInBaseCurrency: number | null | string;
}
