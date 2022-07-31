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
  | 'updatedTime'
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
  | 'selectFeeInBaseCurrency'
  | 'searchWalletValueInBaseCurrency'
  | 'searchWalletValue'
  | 'selectWalletAsset'
  | 'selectInflowType'
  | 'selectInflowAsset'
  | 'selectInflowValue'
  | 'selectInflowValueInBaseCurrency'
  | 'searchInflowID'
  | 'historyID'
  | 'historyPair'
  | 'historyValue'
  | 'historyUpdateTime'
  | 'historySide'
  | 'historyType'
  | 'historyPairEnd'
  | 'historyPairStart'
  | 'searchHistoryStop'
  | 'historyValueInBaseCurrency'
  | 'searchHistoryLimit'
  | 'searchHistoryModifiers'
  | 'tradesDate'
  | 'tradesPair'
  | 'tradesSide'
  | 'tradesPrice'
  | 'tradesValue'
  | 'tradesTotalPrice'
  | 'tradesValueInBaseCurrency'
  | 'tradesFee'
  | 'tradesFeeInBaseCurrency'
  | 'alertType'
  | 'alertID'
  | 'alertMessage'
  | 'alertCreationDate';

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
