import { SubmitHandler } from 'react-hook-form';

export type AddInflowFormShape = {
  transactionType?: any;
  coinName?: any;
  amount?: any;
  time?: any;
  date?: any;
  fees?: any;
  api?: any;
  id?: any;
};

export interface IAddInflow {
  onClick: SubmitHandler<AddInflowFormShape>;
  handleClose: any;
  id?: number;
}
