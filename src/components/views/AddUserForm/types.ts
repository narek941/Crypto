import { SubmitHandler } from 'react-hook-form';

export type AddUserFormShape = {
  name: string;
  email: string;
  password: string;
  usersAccountType: string;
  emptyPassword: string;
  confirmPassword: string;
  usersAccountList: any;
};

export interface IAddUser {
  onClick: SubmitHandler<AddUserFormShape>;
  isEditable?: boolean;
}
