export interface IRangeSwipe {
  value: any;
  name?: string;
  tooltip: string;
  closed?: boolean;
  [rest: string]: any;
  filterName?: string;
  isPercent?: boolean;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  onChange: (prop: string | string[]) => void;
  callback?: (key?: string, value?: any) => void;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
