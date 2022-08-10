import { useDarkMode } from 'hooks';
import { Container, Header, Sidebar } from 'components';

import { ISeoProps } from './types';

const Seo = ({
  children,
  text,
  withHeader = true,
  isBackBtn = false,
  withMail = false,
}: ISeoProps) => {
  useDarkMode();

  return (
    <main className='wrapper'>
      {withHeader ? (
        <>
          <Sidebar />
          <div>
            <Header text={text} isBackBtn={isBackBtn} withMail={withMail} />
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
