import { useDispatch } from 'react-redux';

import { setDarkTheme } from 'store/themeSlice/actions';

const useDarkMode = () => {
  const activeMode = localStorage.getItem('mode') || 'light';

  const dispatch = useDispatch();
  // document.querySelector('body')?.setAttribute('data-theme', activeMode);
  if (activeMode === 'dark') {
    dispatch(setDarkTheme());
  }
};

export default useDarkMode;
