import { AccountTypeOptions } from 'utils/filterHelper';

import { FormField } from '../../forms/types';

import { AddUserFormShape } from './types';

export const addUserFormFields: FormField<keyof AddUserFormShape> = {
  name: {
    name: 'name',
    type: 'text',
    label: 'Name',
    id: 'addUser.name',
    placeholder: 'Enter Name',
  },
  email: {
    name: 'email',
    type: 'text',
    id: 'addUser.email',
    label: 'Email Address',
    placeholder: 'Enter Email',
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    id: 'addUser.password',
    placeholder: 'Enter Password',
  },
  confirmPassword: {
    name: 'confirmPassword',
    type: 'password',
    label: 'Repeat Password',
    id: 'addUser.confirmPassword',
    placeholder: 'Confirm Password',
  },
  usersAccountType: {
    name: 'usersAccountType',
    label: 'Account type',
    id: 'addUser.usersAccountType',
    placeholder: 'Choose Type',
    options: AccountTypeOptions,
  },
  usersAccountList: {
    name: 'usersAccountList',
    id: 'addUser.usersAccountList',
    placeholder: 'Choose Accounts',
  },
};

export const addSchemaKeys = Object.keys(addUserFormFields) as (keyof AddUserFormShape)[];
