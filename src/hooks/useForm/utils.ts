import * as Yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { SchemaLike } from 'yup/lib/types';

import { FormFieldNames } from './types';

export const composeFormSchema = <K extends FormFieldNames>(fields: K[]): AnyObjectSchema => {
  const schemaMap: Record<FormFieldNames, SchemaLike> = {
    email: Yup.string()
      .email('* Enter email address to finish adding new user')
      .required('* Enter email address to finish adding new user'),
    emptyPassword: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      excludeEmptyString: true,
      message: '* This password is too weak',
    }),
    password: Yup.string().matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      '* This password is too weak',
    ),
    ///Add account
    apiKey: Yup.string(),
    maxRisk: Yup.number(),
    exchange: Yup.string(),
    rememberMe: Yup.bool(),
    apiSecret: Yup.string(),
    maxDrawdown: Yup.number(),
    maxPosition: Yup.number(),
    allowedPairs: Yup.array(),
    stopLossOrder: Yup.bool(),
    baseCurrency: Yup.string(),
    startCapital: Yup.string(),
    refreshInterval: Yup.string(),
    wrongCurrencyAlert: Yup.bool(),
    alertsDestinations: Yup.array(),
    name: Yup.string().required('* Enter user name to finish adding new user'),
    accountType: Yup.string().required('* Choose account type to finish adding new user'),

    //Orders filter
    selectFee: Yup.array(),
    searchID: Yup.string(),
    selectPair: Yup.array(),
    selectValue: Yup.array(),
    updatedTime: Yup.array(),
    selectSide: Yup.string(),
    selectShare: Yup.array(),
    creationTime: Yup.array(),
    creationDate: Yup.array(),
    selectPairEnd: Yup.string(),
    searchReceived: Yup.string(),
    selectPairStart: Yup.string(),
    selectFeeInBaseCurrency: Yup.array(),
    selectValueInBaseCurrency: Yup.array(),
    searchReceivedInBaseCurrency: Yup.string(),

    /// Wallets filter

    selectWalletAsset: Yup.string(),
    searchWalletValue: Yup.string(),
    searchWalletValueInBaseCurrency: Yup.string(),

    ///Inflow filter
    searchInflowID: Yup.string(),
    selectInflowValueInBaseCurrency: Yup.array(),
    selectInflowValue: Yup.array(),
    selectInflowAsset: Yup.string(),
    selectInflowType: Yup.string(),

    //History filter

    historyID: Yup.string(),
    historyPair: Yup.array(),
    historyValue: Yup.array(),
    historyUpdateTime: Yup.array(),
    historySide: Yup.string(),
    historyType: Yup.array(),
    historyPairEnd: Yup.string(),
    searchHistoryStop: Yup.string(),
    historyPairStart: Yup.string(),
    historyValueInBaseCurrency: Yup.array(),
    searchHistoryLimit: Yup.string(),
    searchHistoryModifiers: Yup.string(),

    ///Trades filter

    tradesDate: Yup.string(),
    tradesPair: Yup.string(),
    tradesSide: Yup.string(),
    tradesPrice: Yup.string(),
    tradesValue: Yup.string(),
    tradesTotalPrice: Yup.string(),
    tradesValueInBaseCurrency: Yup.string(),
    tradesFee: Yup.string(),
    tradesFeeInBaseCurrency: Yup.string(),
  };

  const schema = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: schemaMap[field],
    }),
    {},
  );

  return Yup.object(schema);
};
