import React, { FC } from 'react';
import classNames from 'classnames';

import { colorType, ISection } from './types';
import styles from './Section.module.scss';

const Section: FC<ISection> = ({ children, className, color }) => {
  const getSectionClassName = (color: colorType): string => {
    const sectionClass: string = classNames(styles.section, className, {
      [styles['section-light']]: color === 'light',
    });
    return sectionClass;
  };

  const sectionClassName: string = getSectionClassName(color);
  return <section className={sectionClassName}>{children}</section>;
};

export default Section;
