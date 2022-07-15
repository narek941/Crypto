import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormWrapperProps<T extends Record<string, unknown>> = {
  formMethods: UseFormReturn<T>;
  children: ReactNode;
  onSubmit: () => void;
};
