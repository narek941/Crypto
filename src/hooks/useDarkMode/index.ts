import { useDispatch } from 'react-redux';

import { authActions } from 'store/authSlice';

const useDarkMode = () => {
  const activeMode = localStorage.getItem('mode') || 'dark';

  const dispatch = useDispatch();
  if (activeMode === 'light') {
    dispatch(authActions.setLightTheme());
  }
};

export default useDarkMode;
