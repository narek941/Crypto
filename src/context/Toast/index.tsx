import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { RootState } from 'types';

import { IToastContext, ToastContextProviderProps } from './types';

export const ToastContext = createContext<IToastContext | null>(null);

export const ToastContextProvider: React.FC<ToastContextProviderProps> = ({ children }) => {
  const { isDarkMode } = useSelector((state: RootState) => state.auth);
  const activeMode = isDarkMode ? 'dark' : 'light';

  return (
    <ToastContext.Provider
      value={{
        toast,
      }}
    >
      {children}
      <ToastContainer theme={activeMode} />
    </ToastContext.Provider>
  );
};
