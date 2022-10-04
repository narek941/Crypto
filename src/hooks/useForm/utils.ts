import * as Yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { SchemaLike } from 'yup/lib/types';

import { RoleType } from 'types/api';
import { alertType } from 'utils/formHelper';
import { passwordRegExp } from 'constants/Regexp';

import { FormFieldNames } from './types';

const formSchema = {
  tradingPairs: Yup.array(),

  from: Yup.object().shape({
    id: Yup.string()
      .required('* Choose currencies to finish adding account')
      .typeError('* Choose currencies to finish adding account')

      .test('test_value_is_selected', '', function (value) {
        if (value && value === '-1') {
          return this.createError({ message: `'* Choose currencies to finish adding account'` });
        }
        return true;
      }),
  }),
  to: Yup.object().shape({
    id: Yup.string().typeError('* Choose currencies to finish adding account'),
  }),
};

const formDestinationsSchema = Yup.object().shape(
  {
    type: Yup.string().required('* Choose destination and enter destination for account alerts'),
    phoneNumber: Yup.string().when('type', {
      is: alertType.TELEGRAM || alertType.SMS,
      then: Yup.string()
        .required('* Enter destination address for account alert ')
        .typeError('* Enter destination address for account alert '),
      otherwise: Yup.string().nullable(true),
      // .transform((_, val) => (val === Number(val) ? val : null)),
    }),

    emailAddress: Yup.string().when('type', {
      is: alertType.EMAIL,
      then: Yup.string().required('* Enter destination address for account alert '),
      otherwise: Yup.string().nullable(),
    }),
  },
  [['emailAddress', 'phoneNumber']],
);

export const composeFormSchema = <K extends FormFieldNames>(fields: K[]): AnyObjectSchema => {
  const schemaMap: Record<FormFieldNames, SchemaLike> = {
    isEditable: Yup.boolean(),

    email: Yup.string()
      .email('* Enter email address to finish adding new user')
      .required('* Enter email address to finish adding new user'),
    password: Yup.string().when('isEditable', {
      is: (isEditable: boolean) => isEditable === true,
      then: Yup.string().matches(passwordRegExp, {
        excludeEmptyString: true,
        message: '* This password is too weak',
      }),
      otherwise: Yup.string()
        .matches(passwordRegExp, '* This password is too weak')
        .required('* Enter password to finish adding new user'),
    }),
    confirmPassword: Yup.string().when('isEditable', {
      is: (isEditable: boolean) => isEditable === true,
      then: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      otherwise: Yup.string()
        .required('* Repeat password to finish adding new user')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    usersAccountType: Yup.string().required('* Choose account type to finish adding new user'),
    usersAccountList: Yup.array().when('usersAccountType', {
      is: (value: string) => value === RoleType.VIEWER,
      then: Yup.array().required('* Choose linked accounts'),
    }),

    accountType: Yup.string().required('* Choose account type to finish adding new user'),

    ///Add account
    apiKey: Yup.string().required('* Enter API key to finish adding account'),
    maxRisk: Yup.number()
      .required('* Enter Maximum risk position to finish adding account')
      .typeError('* Enter Maximum risk position to finish adding account')
      .max(100, 'Maximum position is 100')
      .min(0, 'Minimum position is 0'),
    exchange: Yup.string().required('* Choose exchange platform to finish adding account'),
    rememberMe: Yup.bool(),
    apiSecret: Yup.string().required('* Enter API secret to finish adding account'),
    maxDrawdown: Yup.string().required('* Enter Max drawdown to finish adding account'),
    maxPosition: Yup.number()
      .required('* Enter Maximum position size to finish adding account')
      .typeError('* Enter Maximum position size to finish adding account')
      .max(100, 'Maximum position is 100')
      .min(0, 'Minimum position is 0'),
    allowedPairs: Yup.array()
      .of(Yup.object().shape(formSchema))
      .required('* Choose currencies to finish adding account'),
    stopLossOrder: Yup.bool().required('* Choose Stop loss order to finish adding account'),
    baseCurrency: Yup.string().required('* Choose base currency to finish adding account'),
    // startCapital: Yup.string().required('* Enter start capital to finish adding account'),
    refreshInterval: Yup.string().required('* Choose refresh interval to finish adding account'),
    wrongCurrencyAlert: Yup.bool(),
    alertsDestinations: Yup.array().of(formDestinationsSchema),
    name: Yup.string()
      .trim()
      .required('* Enter account name to finish adding account')
      .max(256, 'Name must not exceed 256 symbols'),

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

    //alerts filter
    alertType: Yup.string(),
    alertID: Yup.string(),
    alertMessage: Yup.string(),
    alertCreationDate: Yup.string(),
    alertName: Yup.string(),

    //login

    login_email: Yup.string().required('* Enter your email to login'),
    login_password: Yup.string().required('* Enter your password to login'),
    login_rememberMe: Yup.bool(),

    // Account Filter
    accountName: Yup.string(),
    accountStatus: Yup.string(),
    accountAVGTrades: Yup.string(),
    accountId: Yup.string(),
    accountSeed: Yup.string(),
    accountCurrentCapital: Yup.string(),
    accountOpenProfit: Yup.string(),
    accountEarnedCapital: Yup.string(),

    //User filter
    userName: Yup.string(),
    userStatus: Yup.string(),
    userId: Yup.string(),
    userType: Yup.string(),
    userEmail: Yup.string(),

    ///export
    exportDateStart: Yup.string(),
    exportDateEnd: Yup.string(),
    exportDate: Yup.string(),

    ///inflow
    transactionType: Yup.string().required('* Choose Transaction type to finish adding record'),
    coinName: Yup.string().required('* Choose Coin name to finish adding record'),
    amount: Yup.string().required('* Enter API key to finish adding account'),
    date: Yup.string().required('* Choose Date to finish adding record'),
    time: Yup.string().required('* Choose Time to finish adding record'),
    fees: Yup.string().required('* Enter Fees  to finish adding record'),
    id: Yup.string(),
    api: Yup.string(),
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
