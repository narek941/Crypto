import { useTranslation } from 'react-i18next';

import { LoaderIcon } from 'assets/icons';
import { useLockBodyScroll } from 'hooks';

import styles from './Loader.module.scss';
import '../../../i18';

const Loader = () => {
  const { t } = useTranslation();
  useLockBodyScroll();

  return (
    <div className={styles.loader}>
      <div className={styles.loader__wrapper}>
        <p className={styles.loader__wrapper__title}>{t('Loading')}...</p>
        <div className={styles.loader__wrapper__icon}>
          <LoaderIcon className={styles.loader__spinner} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
