export interface IDatePicker {
  placeholder: string;
  formMethods: any;
  name: string;
  callback: (filterName: string, value: any) => void;
  filterName: string;
  clearAll: boolean;
  closed: boolean;
  min: number;
  max: number;
}
