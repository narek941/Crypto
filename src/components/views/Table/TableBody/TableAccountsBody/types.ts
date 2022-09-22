import { RowsType } from '../../types';

type ChartActionData = {
  name: any;
  id: number;
  statistics: any;
  baseCurrency: any;
  syncStatus: string;
  startCapitalInBaseCurrency: any;
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
