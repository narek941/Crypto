export interface IModalProps {
  open: boolean;
  modalList: any[];
  id: number | null;
  syncStatus: string;
  accountName: string;
  baseCurrency?: string;
  exchangePlatform: string;
  setOpen: (arg: boolean) => void;
}
