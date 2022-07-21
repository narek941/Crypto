import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { UseFormProps as UseReactHookFormProps, UseFormReturn } from 'react-hook-form';

export type FormFieldNames =
  | 'email'
  | 'password'
  | 'emptyPassword'
  | 'rememberMe'
  | 'name'
  | 'accountType'
  | 'baseCurrency'
  | 'startCapital'
  | 'exchange'
  | 'apiKey'
  | 'apiSecret'
  | 'refreshInterval'
  | 'maxDrawdown'
  | 'maxPosition'
  | 'maxRisk'
  | 'stopLossOrder'
  | 'wrongCurrencyAlert'
  | 'allowedPairs'
  | 'alertKey'
  | 'alertValue';

export type FieldShapeLookup<K extends FormFieldNames> = {
  [P in K]?: Record<FormFieldNames, unknown>[P];
};

export type UseFormProps<K extends FormFieldNames, T extends FieldShapeLookup<K>> = {
  schemaKeys: K[];
  defaultValues?: UseReactHookFormProps<T>['defaultValues'];
  options?: Omit<UseReactHookFormProps<T>, 'defaultValues'>;
};

export type UseFormReturnType<T> = {
  isValid: boolean;
  isSubmitting: boolean;
  formMethods: UseFormReturn<T, unknown>;
  handleSubmit: UseFormHandleSubmit<T>;
};
