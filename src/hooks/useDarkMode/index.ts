import { useEffect } from 'react';

import { useAppDispatch } from 'hooks';
import { authActions } from 'store/authSlice';
import { BrowserStorageKeys, BrowserStorageService } from 'services';

const useDarkMode = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const activeMode = BrowserStorageService.get(BrowserStorageKeys.Mode) || 'dark';

    if (activeMode === 'dark') {
      dispatch(authActions.setDarkTheme());
    } else {
      dispatch(authActions.setLightTheme());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDarkMode;
