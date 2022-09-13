export interface IRange {
  name?: string;
  placeholder?: string;
  Icon?: any;
  onChange: (prop: string | string[]) => void;
  value: any;
  callback?: (key?: string, value?: any) => void;
  filterName?: string;
  closed?: boolean;
  min?: string | number | null;
  max?: string | number | null;
  isPercent?: boolean;
}
