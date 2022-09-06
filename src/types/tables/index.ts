export interface HeadCell {
  id: string | number;
  label: string;
  value?: string;
  isSort?: boolean;
}

export type TableHeaderRow = {
  id: string | number;
  value?: string;
  label: string;
  withBaseCurrency?: boolean;
};
