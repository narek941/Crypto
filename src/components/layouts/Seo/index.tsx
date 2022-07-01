import React from 'react';

import Sidebar from 'components/views/Sidebar';
import Header from 'components/views/Header';
import Container from 'components/shared/Container';

import { ISeoProps } from './types';

const Seo = ({ children, text, withHeader = true, isBackBtn = false }: ISeoProps) => (
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

export default Seo;
