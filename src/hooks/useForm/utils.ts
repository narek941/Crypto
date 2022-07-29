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
    apiKey: Yup.string(),
    maxRisk: Yup.number(),
    exchange: Yup.string(),
    rememberMe: Yup.bool(),
    searchID: Yup.string(),
    selectFee: Yup.array(),
    apiSecret: Yup.string(),
    selectSide: Yup.string(),
    selectPair: Yup.string(),
    updateTime: Yup.string(),
    maxDrawdown: Yup.number(),
    maxPosition: Yup.number(),
    allowedPairs: Yup.array(),
    selectShare: Yup.array(),
    stopLossOrder: Yup.bool(),
    selectValue: Yup.array(),
    baseCurrency: Yup.string(),
    creationDate: Yup.string(),
    startCapital: Yup.string(),
    creationTime: Yup.string(),
    selectPairEnd: Yup.string(),
    searchReceived: Yup.string(),
    selectPairStart: Yup.string(),
    refreshInterval: Yup.string(),
    wrongCurrencyAlert: Yup.bool(),
    alertsDestinations: Yup.array(),
    selectFeeInBaseCurrency: Yup.array(),
    selectValueInBaseCurrency: Yup.array(),
    searchReceivedInBaseCurrency: Yup.string(),
    name: Yup.string().required('* Enter user name to finish adding new user'),
    accountType: Yup.string().required('* Choose account type to finish adding new user'),
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
