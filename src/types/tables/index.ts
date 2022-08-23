export interface HeadCell {
  id: any;
  label: string;
  value?: string;
  isSort?: boolean;
}

export type TableHeaderRow = {
  id: any;
  value?: string;
  label: string;
  withBaseCurrency?: boolean;
};
