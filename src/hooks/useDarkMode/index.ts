import { useDispatch } from 'react-redux';

import { authActions } from 'store/authSlice';

const useDarkMode = () => {
  const activeMode = localStorage.getItem('mode') || 'light';

  const dispatch = useDispatch();
  // document.querySelector('body')?.setAttribute('data-theme', activeMode);
  if (activeMode === 'dark') {
    dispatch(authActions.setDarkTheme());
  }
};

export default useDarkMode;
