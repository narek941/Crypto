import { FormField } from '../../forms/types';

import { AddFormShape } from './types';

export const AccountTypeOptions = [
  {
    label: 'Administrator',
    value: 'ADMIN',
  },
  {
    label: 'Analyst',
    value: 'ANALYST',
  },
  {
    label: 'Viewer',
    value: 'VIEWER',
  },
];

export const addFormFields: FormField<keyof AddFormShape> = {
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
  emptyPassword: {
    name: 'emptyPassword',
    type: 'password',
    label: 'Password',
    id: 'addUser.password',
    placeholder: 'Enter Password',
  },
  accountType: {
    type: 'select',
    name: 'accountType',
    label: 'Account type',
    id: 'signIn.accountType',
    placeholder: 'Choose Type',
    options: AccountTypeOptions,
  },
};

export const addSchemaKeys = Object.keys(addFormFields) as (keyof AddFormShape)[];
