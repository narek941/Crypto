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
    rememberMe: Yup.bool(),
    name: Yup.string().required('* Enter user name to finish adding new user'),
    accountType: Yup.string().required('* Choose account type to finish adding new user'),
    baseCurrency: Yup.string(),
    startCapital: Yup.string(),
    exchange: Yup.string(),
    apiKey: Yup.string(),
    apiSecret: Yup.string(),
    refreshInterval: Yup.string(),
    maxDrawdown: Yup.number(),
    maxPosition: Yup.number(),
    maxRisk: Yup.number(),
    allowedPairs: Yup.array(),
    stopLossOrder: Yup.bool(),
    wrongCurrencyAlert: Yup.bool(),
    alertValue: Yup.string(),
    alertKey: Yup.string(),
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
