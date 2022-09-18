export interface ITableSearch {
  name: string;
  type: string;
  className: string;
  tooltip: string;
  closed: boolean;
  clearAll: boolean;
  filterName: string;
  onFocus: () => void;
  placeholder: string;
  [rest: string]: any;
  debouncedTime: number;
  callback: (filterName: string, state: any) => void;
}
