import { FormField } from '../../forms/types';

import { SignInFormShape } from './types';

export const signInFormFields: FormField<keyof SignInFormShape> = {
  login_email: {
    id: 'signIn.email',
    name: 'login_email',
    placeholder: 'Enter Email',
  },

  login_password: {
    id: 'signIn.password',
    name: 'login_password',
    type: 'password',
    placeholder: 'Enter Password',
  },
  login_rememberMe: {
    id: 'signIn.rememberMe',
    name: 'login_rememberMe',
    label: 'Remember Me',
    type: 'checkbox',
  },
};

export const signInSchemaKeys = Object.keys(signInFormFields) as (keyof SignInFormShape)[];
