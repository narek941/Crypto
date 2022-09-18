import { useTranslation } from 'react-i18next';

import '../../../i18';
import styles from './Copyright.module.scss';

const Copyright = (): JSX.Element => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return <div className={styles.copyright}>{t('copy_right', { currentYear })}</div>;
};
export default Copyright;
