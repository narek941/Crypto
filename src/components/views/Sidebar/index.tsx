import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { BurgerIcon, LogoIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';
import { navList } from 'utils/sidebar';
import { Routes } from 'types';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const burgerClasses = classNames(styles.wrapper__burger, {
    [styles.wrapper__burger_open]: open,
  });

  const wrapperClasses = classNames(styles.wrapper, { [styles.wrapper__active]: open });

  const listIconClasses = classNames(styles.list__icon, {
    [styles.list__icon__open]: open,
  });

  const listText = classNames(styles.list__text, {
    [styles.list__text__open]: open,
  });

  const handleDrawer = (): void => setOpen(!open);
  const handleClickOutside = (): void => setOpen(false);

  useOnClickOutside(ref, handleClickOutside);

  const renderList = navList.map(({ id, text, Icon, linkTo }) => (
    <Link
      key={id}
      className={classNames(styles.list, {
        [styles.list__wrapper]:
          linkTo === Routes.Dashboard
            ? location.pathname === linkTo
            : location.pathname.includes(linkTo) && open,
      })}
      to={linkTo}
    >
      <div
        className={classNames(styles.list, {
          [styles.list__open]: open,
          [styles.list__selected]:
            linkTo === Routes.Dashboard
              ? location.pathname === linkTo
              : location.pathname.includes(linkTo),
          [styles.list__selected__open]:
            linkTo === Routes.Dashboard
              ? location.pathname === linkTo && open
              : location.pathname.includes(linkTo) && open,
        })}
      >
        <div className={listIconClasses}>
          <Icon />
        </div>
        <div className={listText}>{text}</div>
      </div>
    </Link>
  ));

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
