import { SubmitHandler } from 'react-hook-form';

export type AddFormShape = {
  name: string;
  email: string;
  password: string;
  accountType: string;
  emptyPassword: string;
};

export interface IAddUser {
  onClick: SubmitHandler<AddFormShape>;
  isEditable?: boolean;
}
