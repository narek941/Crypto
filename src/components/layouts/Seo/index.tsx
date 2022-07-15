import { useDispatch } from 'react-redux';

import { setDarkTheme, setLightTheme } from 'store/themeSlice/actions';
import { Container, Header, Sidebar } from 'components';

import { ISeoProps } from './types';

const Seo = ({ children, text, withHeader = true, isBackBtn = false }: ISeoProps) => {
  const dispatch = useDispatch();

  const activeMode = localStorage.getItem('mode') || 'light';
  if (activeMode === 'dark') {
    dispatch(setDarkTheme());
  } else {
    dispatch(setLightTheme());
  }

  return (
    <main className='wrapper'>
      {withHeader ? (
        <>
          <Sidebar />
          <div>
            <Header text={text} isBackBtn={isBackBtn} />
            <Container>{children}</Container>
          </div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </main>
  );
};

export default Seo;
