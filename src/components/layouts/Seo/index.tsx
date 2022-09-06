import { useDarkMode } from 'hooks';
import { Container, Header, Sidebar } from 'components';

import { ISeoProps } from './types';

const Seo = ({
  children,
  text,
  withHeader = true,
  isBackBtn = false,
  withMail = false,
  to = -1,
}: ISeoProps) => {
  useDarkMode();

  return (
    <main className='wrapper'>
      {withHeader ? (
        <>
          <Sidebar />
          <div>
            <Header text={text} isBackBtn={isBackBtn} withMail={withMail} to={to} />
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
