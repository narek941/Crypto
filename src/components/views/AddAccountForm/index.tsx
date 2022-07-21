import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import { useForm } from 'hooks';
import FormWrapper from 'components/forms/FormWrapper';
import { RootState } from 'types';

import { AddAccountFormShape, IAddAccount } from './types';
import { addAccountSchemaKeys } from './fields';
import BaseSetting from './FormGroups/BaseSetting';
import Wallet from './FormGroups/Wallet';
import TradeLimit from './FormGroups/TradeLimit';
import FormAction from './FormGroups/FormAction';
import TradeSetting from './FormGroups/TradeSetting';

const AddAccountForm = ({ onclick, isEditable = false }: IAddAccount) => {
  const { name, startCapitalInBaseCurrency } = useSelector(
    (state: RootState) => state.accounts.accountById,
  );

  const { wallets } = useSelector((state: RootState) => state.accounts.accountById);
  // const { alertDestinations } = useSelector((state: RootState) => state.accounts.accountById);

  const { formMethods, handleSubmit, isValid } = useForm<
    keyof AddAccountFormShape,
    AddAccountFormShape
  >({
    schemaKeys: addAccountSchemaKeys,
    defaultValues: isEditable
      ? {
          name: name,
          startCapital: startCapitalInBaseCurrency,
          exchange: wallets && wallets[0]?.platform?.name,
          apiKey: wallets && wallets[0]?.apiKey,
          apiSecret: wallets && wallets[0]?.apiSecret,
          refreshInterval: wallets && wallets[0]?.refreshInterval,
          // alertKey: alertDestinations?.type,
          // alertValue: alertDestinations?.email,
          maxDrawdown: wallets && wallets[0].alertTriggers.maxDrawDown,
          maxRisk: wallets && wallets[0].alertTriggers.maxRiskPosition,
          maxPosition: wallets && wallets[0].alertTriggers.maxPositionSize,
          stopLossOrder: wallets && wallets[0].alertTriggers.stopLossOrderRequired,
          wrongCurrencyAlert: wallets && wallets[0].alertTriggers.wrongCurrencyAlertRequired,
        }
      : {
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
        },
  });

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onclick)}>
      <BaseSetting defaultValues formMethods={formMethods} />
      <Wallet defaultValues formMethods={formMethods} />
      <TradeSetting defaultValues formMethods={formMethods} />
      <TradeLimit defaultValues formMethods={formMethods} />
      <FormAction defaultValues formMethods={formMethods} isValid={isValid} />
    </FormWrapper>
  );
};

export default AddAccountForm;
