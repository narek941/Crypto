import { SubmitHandler } from 'react-hook-form';

export type AddUserFormShape = {
  name: string;
  email: string;
  password: string;
  accountType: string;
  emptyPassword: string;
};

export interface IAddUser {
  onClick: SubmitHandler<AddUserFormShape>;
  isEditable?: boolean;
}
