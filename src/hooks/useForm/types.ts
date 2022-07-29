import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { UseFormProps as UseReactHookFormProps, UseFormReturn } from 'react-hook-form';

export type FormFieldNames =
  | 'name'
  | 'email'
  | 'apiKey'
  | 'maxRisk'
  | 'exchange'
  | 'searchID'
  | 'password'
  | 'selectFee'
  | 'apiSecret'
  | 'selectSide'
  | 'updateTime'
  | 'selectPair'
  | 'rememberMe'
  | 'selectShare'
  | 'maxDrawdown'
  | 'maxPosition'
  | 'accountType'
  | 'selectValue'
  | 'creationTime'
  | 'baseCurrency'
  | 'startCapital'
  | 'creationDate'
  | 'allowedPairs'
  | 'stopLossOrder'
  | 'selectPairEnd'
  | 'emptyPassword'
  | 'searchReceived'
  | 'refreshInterval'
  | 'selectPairStart'
  | 'wrongCurrencyAlert'
  | 'alertsDestinations'
  | 'selectValueInBaseCurrency'
  | 'searchReceivedInBaseCurrency'
  | 'selectFeeInBaseCurrency';

export type FieldShapeLookup<K extends FormFieldNames> = {
  [P in K]?: Record<FormFieldNames, unknown>[P];
};

export type UseFormProps<K extends FormFieldNames, T extends FieldShapeLookup<K>> = {
  schemaKeys: K[];
  defaultValues?: UseReactHookFormProps<T>['defaultValues'];
  options?: Omit<UseReactHookFormProps<T>, 'defaultValues'>;
  mode?: any;
};

export type UseFormReturnType<T> = {
  isValid: boolean;
  isSubmitting: boolean;
  formMethods: UseFormReturn<T, unknown>;
  handleSubmit: UseFormHandleSubmit<T>;
};
