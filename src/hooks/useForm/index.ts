import {
  Resolver,
  useForm as useReactHookForm,
  UseFormProps as UseReactHookFormProps,
} from 'react-hook-form';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { composeFormSchema } from './utils';
import { FieldShapeLookup, FormFieldNames, UseFormProps, UseFormReturnType } from './types';

const useForm = <K extends FormFieldNames, T extends FieldShapeLookup<K>>({
  schemaKeys,
  defaultValues,
  options,
}: UseFormProps<K, T>): UseFormReturnType<T> => {
  const schema = composeFormSchema<K>(schemaKeys);

  const defaultValuesMemo = useMemo(() => defaultValues, [defaultValues]);

  const formOptions: UseReactHookFormProps<T> = {
    // resolver: yupResolver(schema) as Resolver<T, any>,
    resolver: yupResolver(schema) as Resolver<T, Record<string, string>>,
    mode: 'all',
    defaultValues: defaultValuesMemo,
    ...options,
  };

  const formMethods = useReactHookForm(formOptions);

  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit,
    isValid: formMethods.formState.isValid,
    isSubmitting: formMethods.formState.isSubmitting,
  };
};

export default useForm;
