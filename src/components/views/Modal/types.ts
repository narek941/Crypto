export interface IModalProps {
  setOpen: (arg: boolean) => void;
  open: boolean;
  modalList: any[];
  id: number | null;
  baseCurrency?: string;
}
