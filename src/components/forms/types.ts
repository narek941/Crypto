import { HTMLInputTypeAttribute, SyntheticEvent } from 'react';

import { FormFieldNames } from 'hooks/useForm/types';
import { Option } from 'components/shared/Select/types';

export type FormField<T extends FormFieldNames> = {
  [FieldName in T]: {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    type?: HTMLInputTypeAttribute;
    options?: Option[];
    checked?: boolean;
    Icon?: any;
    tooltip?: string;
  };
};

export interface IFormGroup {
  children: JSX.Element | string;
  space?: 's' | 'm' | 'l';
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
  disabled?: boolean;
}
