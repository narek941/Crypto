import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { BurgerIcon, LogoIcon } from 'icons';
import useOnClickOutside from 'hooks/useOutsideClick';
import { navList } from 'utils/sidebar';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const handleDrawer = (): void => setOpen(!open);
  const handleClickOutside = (): void => setOpen(false);

  useOnClickOutside(ref, handleClickOutside);

  const renderList = navList.map(({ id, text, icon, linkTo }) => (
    <Link
      key={id}
      className={classNames(styles.list, {
        [styles.list__wrapper]: linkTo === location.pathname && open,
      })}
      to={linkTo}
    >
      <div
        className={classNames(styles.list, {
          [styles.list__open]: open,
          [styles.list__selected]: linkTo === location.pathname,
          [styles.list__selected__open]: linkTo === location.pathname && open,
        })}
      >
        <div
          className={classNames(styles.list__icon, {
            [styles.list__icon__open]: open,
          })}
        >
          {icon}
        </div>
        <div
          className={classNames(styles.list__text, {
            [styles.list__text__open]: open,
          })}
        >
          {text}
        </div>
      </div>
    </Link>
  ));

  const burgerClasses = classNames(styles.wrapper__burger, {
    [styles.wrapper__burger_open]: open,
  });

  const wrapperClasses = classNames(styles.wrapper, { [styles.wrapper__active]: open });

  return (
    <div ref={ref} className={wrapperClasses}>
      <div className={burgerClasses}>
        <BurgerIcon onClick={handleDrawer} />
        <LogoIcon />
      </div>
      <div className={styles.divider} />
      {renderList}
    </div>
  );
};
export default Sidebar;
