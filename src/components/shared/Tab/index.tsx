import classNames from 'classnames';

import styles from './Tab.module.scss';
import { ITab } from './types';

const Tab = ({
  selectedTab,
  handleChange,
  name,
  id,
  Icon,
  withBorder = true,
}: ITab): JSX.Element => {
  const tabClass = classNames(styles.tab, {
    [styles.tab__selected]: selectedTab === id,
    [styles.tab__border]: !withBorder,
    [styles.tab__selected__border]: !withBorder,
  });

  return (
    <span role='button' onClick={() => handleChange(id)} className={tabClass}>
      {Icon && <Icon />}
      {name && name}
    </span>
  );
};

export default Tab;
