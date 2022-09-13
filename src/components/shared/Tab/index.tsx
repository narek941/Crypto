import classNames from 'classnames';

import styles from './Tab.module.scss';
import { ITab } from './types';

const Tab = ({ selectedTab, handleChange, name, id, Icon }: ITab): JSX.Element => {
  const tabClass = classNames(styles.tab, { [styles.tab__selected]: selectedTab === id });

  return (
    <span role='button' onClick={() => handleChange(id)} className={tabClass}>
      <Icon />
      {name}
    </span>
  );
};

export default Tab;
