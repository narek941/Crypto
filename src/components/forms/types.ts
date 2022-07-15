import { HTMLInputTypeAttribute, SyntheticEvent } from 'react';

import { FormFieldNames } from 'hooks/useForm/types';

export type FormField<T extends FormFieldNames> = {
  [FieldName in T]: {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
  };
};
export interface IFormGroup {
  children: JSX.Element | string;
  space?: 's' | 'm' | 'l';

  className?: string;
  onClick?: (e: SyntheticEvent) => void;
  disabled?: boolean;
}
