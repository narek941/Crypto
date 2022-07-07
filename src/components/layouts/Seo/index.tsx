import React from 'react';
import { useDispatch } from 'react-redux';

import Sidebar from 'components/views/Sidebar';
import Header from 'components/views/Header';
import Container from 'components/shared/Container';
import { setDarkTheme, setLightTheme } from 'store/themeSlice/actions';

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
