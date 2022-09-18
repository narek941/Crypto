import { IOptionList } from 'types';

export interface IDualSelect {
  formMethods?: any;
  name?: string;
  placeholder?: string;
  firstOptions: IOptionList[];
  secondOptions: IOptionList[];
  callback: (key: string, value: any) => void;
  filterName?: string;
  closed?: boolean;
  singleFilterName?: string;
  tooltip?: any;
}
