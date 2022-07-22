import classNames from 'classnames';

import styles from './Tab.module.scss';

const Tab = ({ selectedTab, handleChange, name, id }: any): JSX.Element => {
  const tabClass = classNames(styles.tab, { [styles.tab__selected]: selectedTab === id });

  return (
    <span role='button' onClick={() => handleChange(id)} className={tabClass}>
      {name}
    </span>
  );
};

export default Tab;
