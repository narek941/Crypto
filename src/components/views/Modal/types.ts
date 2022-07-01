export interface ModalProps {
  onClose: () => any;
  show: boolean;
  modalData?: any;
  size?: 's' | 'm' | 'l';
  backgroundStyles?: boolean;
  className?: string;
}
