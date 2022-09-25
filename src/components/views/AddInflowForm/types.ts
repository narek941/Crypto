import { SubmitHandler } from 'react-hook-form';

export type AddInflowFormShape = {
  transactionType: string;
  coinName: string;
  amount?: string;
  time: string;
  fees?: string;
};

export interface IAddInflow {
  onClick: SubmitHandler<AddInflowFormShape>;
  handleClose: any;
}
