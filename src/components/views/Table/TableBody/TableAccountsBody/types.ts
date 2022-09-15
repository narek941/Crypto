import { RowsType } from '../../types';

type ChartActionData = {
  id: number;
  statistics: any;
  startCapitalInBaseCurrency: any;
  baseCurrency: any;
  name: any;
};

export interface ITableAccountBodyProps {
  open: boolean;
  rows: RowsType[];
  handleClose?: () => void;
  toggleAlertOpen?: () => void;
  handleBlock: (id: number) => Promise<void>;
  handleUnblock: (id: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleChartAction?: (data: ChartActionData) => void;
}
