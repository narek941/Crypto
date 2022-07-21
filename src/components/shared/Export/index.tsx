import { FC } from 'react';
import classNames from 'classnames';

import { ExportIcon } from 'assets/icons';

import { IExport } from './types';
import styles from './Export.module.scss';

const Export: FC<IExport> = ({ className, text = 'export', onClick }) => {
  const exportClass: string = classNames(styles.export, className);

  return (
    <div className={exportClass} role='button' onClick={onClick}>
      <ExportIcon />
      <span>{text}</span>
    </div>
  );
};

export default Export;
