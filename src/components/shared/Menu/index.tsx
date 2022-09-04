import classNames from 'classnames';
import { useRef, useState } from 'react';

import { useOnClickOutside } from 'hooks';
import { DropDownIcon } from 'assets/icons';

import styles from './Menu.module.scss';
import { IMenu, MenuOption } from './types';

const Menu = ({ options, callback }: IMenu): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);
  const dropClass: string = classNames(styles.wrapper__select__dropdown, {
    [styles.wrapper__select__dropdown__open]: open && options.length > 1,
    [styles.wrapper__select__dropdown__disable]: options.length <= 1,
  });

  const optionClass = classNames(styles.wrapper__inner, {
    [styles.wrapper__inner__open]: open,
  });

  const handleSelect = (id: number) => {
    setSelected(id);
    handleClose();
    callback(id);
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };
  useOnClickOutside(ref, handleClose);
  return (
    <div className={styles.wrapper}>
      <div id='period' className={styles.wrapper__select} onClick={() => setOpen(true)}>
        <span>{options.find((item: MenuOption) => item.id === selected)?.label}</span>
        <DropDownIcon role='button' className={dropClass} />
      </div>
      <div className={optionClass} ref={ref}>
        {options.map(({ id, label }: MenuOption) => (
          <div
            key={id}
            className={styles.wrapper__select__options}
            onClick={() => handleSelect(id)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
