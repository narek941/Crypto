import { FormProvider } from 'react-hook-form';

import { FormWrapperProps } from './types';

const FormWrapper = <T extends Record<string, unknown>>({
  formMethods,
  children,
  onSubmit,
}: FormWrapperProps<T>): JSX.Element => (
  <FormProvider {...formMethods}>
    <form autoComplete='off' onSubmit={onSubmit}>
      {children}
    </form>
  </FormProvider>
);

export default FormWrapper;
