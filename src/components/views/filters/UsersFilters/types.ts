import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  userName: string;
  userStatus: string;
  userId: string;
  userType: string;
  userEmail: string;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}
