import classNames from 'classnames';
import { useRef, useState } from 'react';

import { useOnClickOutside } from 'hooks';

import styles from './Menu.module.scss';
import { IMenu, MenuOption } from './types';

const Menu = ({ options, callback }: IMenu): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);
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
        {options.find((item: MenuOption) => item.id === selected)?.label}
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
