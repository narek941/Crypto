import { IOptionList } from 'types';

export interface IMultipleSelect {
  error?: any;
  name: string;
  label?: string;
  tooltip?: string;
  formMethods?: any;
  className?: string;
  defaultValues?: any;
  filterName?: string;
  withAction?: boolean;
  placeholder?: string;
  options?: IOptionList[];
  callback?: (key: string, value: any) => void;
}
