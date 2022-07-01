import { FormField } from '../../shared/forms/types';

import { AddUserFormShape } from './types';

export const addUserFormFields: FormField<keyof AddUserFormShape> = {
  name: {
    id: 'addUser.name',
    name: 'name',
    label: 'Name',
    placeholder: 'Enter Name',
  },

  email: {
    id: 'addUser.email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email',
  },

  password: {
    id: 'addUser.password',
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter Password',
  },
  accountType: {
    id: 'signIn.accountType',
    name: 'accountType',
    label: 'Account type',
    type: 'select',
    placeholder: 'Choose Type',
  },
};

export const addUserSchemaKeys = Object.keys(addUserFormFields) as (keyof AddUserFormShape)[];
