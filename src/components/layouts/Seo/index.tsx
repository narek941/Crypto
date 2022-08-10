import { Container, Header, Sidebar } from 'components';
import { authActions } from 'store/authSlice';
import { useAppDispatch } from 'hooks';

import { ISeoProps } from './types';

const Seo = ({ children, text, withHeader = true, isBackBtn = false }: ISeoProps) => {
  const dispatch = useAppDispatch();

  const activeMode = localStorage.getItem('mode') || 'dark';
  if (activeMode === 'dark') {
    dispatch(authActions.setDarkTheme());
  } else {
    dispatch(authActions.setLightTheme());
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
