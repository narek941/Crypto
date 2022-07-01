import { FormField } from '../../shared/forms/types';

import { SignInFormShape } from './types';

export const signInFormFields: FormField<keyof SignInFormShape> = {
  email: {
    id: 'signIn.email',
    name: 'email',
    placeholder: 'Enter Email',
  },

  password: {
    id: 'signIn.password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter Password',
  },
  rememberMe: {
    id: 'signIn.rememberMe',
    name: 'rememberMe',
    label: 'Remember Me',
    type: 'checkbox',
  },
};

export const signInSchemaKeys = Object.keys(signInFormFields) as (keyof SignInFormShape)[];
