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
import { AddAccountFormShape, AllowedPairsProps, IAddAccount } from './types';

const AddAccountForm = ({ onClick, isEditable = false }: IAddAccount) => {
  const { name, allowedPairs, alertsDestinations, wallets, baseCurrency, allowedCurrencies } =
    useSelector(accountsSelectors.selectAccountById);
  const accountTradingPairs = allowedPairs?.map((item: AllowedPairsProps) => item?.tradingPair);
  const accountCurrencies = allowedCurrencies?.map((item: any) => {
    return {
      from: {
        id: item?.currency?.id,
      },
    };
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currencyData = accountCurrencies
    ? [...accountTradingPairs, ...accountCurrencies]
    : accountTradingPairs;

  const addAccountFormDefaultValues = useMemo(
    () =>
      isEditable
        ? {
            name,
            alertsDestinations,
            baseCurrency: baseCurrency?.id,
            apiKey: wallets && wallets[0]?.apiKey,
            allowedPairs: currencyData && currencyData,
            exchange: wallets && wallets[0].platform.id,
            apiSecret: wallets && wallets[0]?.apiSecret,
            refreshInterval: wallets && wallets[0]?.refreshInterval,
            maxDrawdown: wallets && wallets[0].alertTriggers.maxDrawDown,
            maxRisk: wallets && wallets[0].alertTriggers.maxRiskPosition,
            maxPosition: wallets && wallets[0].alertTriggers.maxPositionSize,
            stopLossOrder: wallets && wallets[0].alertTriggers.stopLossOrderRequired,
            wrongCurrencyAlert: wallets && wallets[0].alertTriggers.wrongCurrencyAlertRequired,
          }
        : {
            baseCurrency: 521,
            refreshInterval: '3m',
            maxDrawdown: '20',
            maxPosition: 20,
            maxRisk: 100,
            stopLossOrder: true,
            exchange: 1,

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
