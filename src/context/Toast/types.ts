import { toast } from 'react-toastify';

export interface IToastContext {
  toast: typeof toast;
}
export interface ToastContextProviderProps {
  children: JSX.Element;
}
