import React from 'react';

import Container from 'components/shared/Container';

import { PageContentProps } from './types';

const PageContent: React.FC<PageContentProps> = ({ children, className }) => {
  return (
    <main className={className}>
      <Container>{children}</Container>
    </main>
  );
};

export default PageContent;
