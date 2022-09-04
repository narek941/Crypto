export interface IDateRangePicker {
  placeholder: string;
  formMethods: any;
  name: string;
  callback: () => void;
  filterName: string;
  clearAll: boolean;
  closed: boolean;
  min: number;
  max: number;
}
