import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler } from 'react-hook-form';

import { useForm } from 'hooks';
import FormWrapper from 'components/forms/FormWrapper';

import { AddAccountFormShape } from './types';
import { addAccountSchemaKeys } from './fields';
import BaseSetting from './FormGroups/BaseSetting';
import Wallet from './FormGroups/Wallet';
import TradeLimit from './FormGroups/TradeLimit';
import FormAction from './FormGroups/FormAction';
import TradeSetting from './FormGroups/TradeSetting';
export interface IAdd {
  onclick: SubmitHandler<AddAccountFormShape>;
}

const AddAccountForm = ({ onclick }: IAdd) => {
  const { formMethods, handleSubmit, isValid } = useForm<
    keyof AddAccountFormShape,
    AddAccountFormShape
  >({
    schemaKeys: addAccountSchemaKeys,
  });
  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onclick)}>
        <BaseSetting formMethods={formMethods} />
        <Wallet formMethods={formMethods} />
        <TradeSetting formMethods={formMethods} />
        <TradeLimit formMethods={formMethods} />
        <FormAction formMethods={formMethods} isValid={isValid} />
      </FormWrapper>
    </>
  );
};

export default AddAccountForm;
