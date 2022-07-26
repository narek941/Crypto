import { RowsType } from '../../types';

type ChartActionData = {
  id: number;
  statistics: any;
  startCapitalInBaseCurrency: any;
};

export interface ITableAccountBodyProps {
  open: boolean;
  rows: RowsType[];
  handleClose?: () => void;
  toggleAlertOpen?: () => void;
  handleBlock: (id: number) => void;
  handleUnblock: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
  handleChartAction?: (data: ChartActionData) => void;
}
