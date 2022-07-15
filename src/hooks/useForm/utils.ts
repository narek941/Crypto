import * as Yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { SchemaLike } from 'yup/lib/types';

import { FormFieldNames } from './types';

export const composeFormSchema = <K extends FormFieldNames>(fields: K[]): AnyObjectSchema => {
  const schemaMap: Record<FormFieldNames, SchemaLike> = {
    email: Yup.string().required(),
    password: Yup.string().required(),
    rememberMe: Yup.bool().required(),
    name: Yup.string().required(),
    accountType: Yup.string(),
    baseCurrency: Yup.string(),
    startCapital: Yup.string(),
    exchange: Yup.string(),
    apiKey: Yup.string(),
    apiSecret: Yup.string(),
    maxDrawdown: Yup.string(),
    maxPosition: Yup.string(),
    maxRisk: Yup.string(),
    allowedFirstPairs: Yup.string(),
    allowedSecondPairs: Yup.string(),
    stopLossOrder: Yup.bool(),
    wrongCurrencyAlert: Yup.bool(),
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
