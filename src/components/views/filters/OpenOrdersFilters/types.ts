import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  selectPair: any;
  searchID: any;
  selectFee: any;
  selectSide: any;
  updatedTime: any;
  selectShare: any;
  selectValue: any;
  creationDate: any;
  creationTime: any;
  selectPairEnd?: any;
  searchReceived: any;
  selectPairStart?: any;
  selectFeeInBaseCurrency: any;
  selectValueInBaseCurrency: any;
  searchReceivedInBaseCurrency: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}
