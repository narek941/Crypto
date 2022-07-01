import React from 'react';

import styles from './Copyright.module.scss';

const Copyright = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={styles.copyright}
    >{`Copyright ©${currentYear} Teroxx – All rights reserved`}</div>
  );
};
export default Copyright;
