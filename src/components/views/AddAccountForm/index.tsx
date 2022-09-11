import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useForm } from 'hooks';
import FormWrapper from 'components/forms/FormWrapper';
import { accountsSelectors } from 'store/accountsSlice';

import Wallet from './FormGroups/Wallet';
import { addAccountSchemaKeys } from './fields';
import TradeLimit from './FormGroups/TradeLimit';
import FormAction from './FormGroups/FormAction';
import BaseSetting from './FormGroups/BaseSetting';
import TradeSetting from './FormGroups/TradeSetting';
import { AddAccountFormShape, IAddAccount } from './types';

type AllowedPairsProps = {
  createdAt: string;
  deletedAt: string;
  id: number;
  tradingPair: {
    createdAt: string;
    deletedAt: string;
    from: any;
    id: number;
    name: string;
    to: any;
    updatedAt: string;
  };
  updatedAt: string;
};

const AddAccountForm = ({ onClick, isEditable = false }: IAddAccount) => {
  const { name, allowedPairs, alertsDestinations, wallets, baseCurrency } = useSelector(
    accountsSelectors.selectAccountById,
  );
  const accountTradingPairs = allowedPairs?.map((item: AllowedPairsProps) => item?.tradingPair);
  const addAccountFormDefaultValues = useMemo(
    () =>
      isEditable
        ? {
            name,
            allowedPairs: accountTradingPairs,

            alertsDestinations,
            exchange: 'Binance',
            baseCurrency: baseCurrency?.id,
            apiKey: wallets && wallets[0]?.apiKey,
            apiSecret: wallets && wallets[0]?.apiSecret,
            refreshInterval: wallets && wallets[0]?.refreshInterval,
            maxDrawdown: wallets && wallets[0].alertTriggers.maxDrawDown,
            maxRisk: wallets && wallets[0].alertTriggers.maxRiskPosition,
            maxPosition: wallets && wallets[0].alertTriggers.maxPositionSize,
            stopLossOrder: wallets && wallets[0].alertTriggers.stopLossOrderRequired,
            wrongCurrencyAlert: wallets && wallets[0].alertTriggers.wrongCurrencyAlertRequired,
          }
        : {
            baseCurrency: 516,
            refreshInterval: '3m',
            maxDrawdown: '20',
            maxPosition: 20,
            maxRisk: 100,
            stopLossOrder: true,
            exchange: 'Binance',

            allowedPairs: [
              {
                from: {
                  id: -1,
                },
                to: {
                  id: -1,
                },
              },
            ],
            alertsDestinations: [{ type: '', emailAddress: '', phoneNumber: '' }],
          },
    [alertsDestinations, allowedPairs, baseCurrency, isEditable, name, wallets],
  );
  const { formMethods, handleSubmit } = useForm<keyof AddAccountFormShape, AddAccountFormShape>({
    schemaKeys: addAccountSchemaKeys,
    defaultValues: addAccountFormDefaultValues,
  });

  useEffect(() => {
    if (isEditable) {
      formMethods.reset(addAccountFormDefaultValues);
    }
  }, [addAccountFormDefaultValues, formMethods, isEditable]);

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onClick)}>
      <BaseSetting formMethods={formMethods} />
      <Wallet formMethods={formMethods} />
      <TradeSetting formMethods={formMethods} />
      <TradeLimit formMethods={formMethods} />
      <FormAction formMethods={formMethods} />
    </FormWrapper>
  );
};

export default AddAccountForm;
