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
  | 'exportDateEnd'
  | 'exportDateStart'
  | 'exportDate'
  | 'selectFee'
  | 'apiSecret'
  | 'selectSide'
  | 'updatedTime'
  | 'isEditable'
  | 'isEditable'
  | 'selectPair'
  | 'rememberMe'
  | 'selectShare'
  | 'maxDrawdown'
  | 'maxPosition'
  | 'accountType'
  | 'selectValue'
  | 'creationTime'
  | 'baseCurrency'
  | 'creationDate'
  | 'allowedPairs'
  | 'stopLossOrder'
  | 'selectPairEnd'
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
  | 'usersAccountList'
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
  | 'alertCreationDate'
  | 'login_email'
  | 'login_password'
  | 'login_rememberMe'
  | 'accountName'
  | 'accountStatus'
  | 'accountAVGTrades'
  | 'accountId'
  | 'accountSeed'
  | 'accountCurrentCapital'
  | 'accountOpenProfit'
  | 'accountEarnedCapital'
  | 'userName'
  | 'userStatus'
  | 'userId'
  | 'userType'
  | 'userEmail'
  | 'confirmPassword'
  | 'alertName'
  | 'transactionType'
  | 'coinName'
  | 'amount'
  | 'time'
  | 'fees'
  | 'usersAccountType';

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
