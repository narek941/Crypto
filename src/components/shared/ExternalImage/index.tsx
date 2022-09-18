import { FC } from 'react';
import classNames from 'classnames';

import styles from './ExternalImage.module.scss';
import { IExternalImageProps } from './types';

const ExternalImage: FC<IExternalImageProps> = (props) => {
  const { src, className, alt, height, width } = props;

  return (
    <div className={classNames(styles.image, className)}>
      <img className={className} src={src} alt={alt} width={width} height={height} />
    </div>
  );
};
export default ExternalImage;
