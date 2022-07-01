import React from 'react';
import classNames from 'classnames';

import { FontStyles } from 'constants/index';

import { ITypographyProps } from './types';

const Typography: React.FC<ITypographyProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  children,
  tagName = 'p',
  className = '',
  align = 'left',
  type = 'Regular',
  variant = 'Text',
  color = 'white',
  ...rest
}) => {
  const alignKey = FontStyles[`text_${align}` as keyof typeof FontStyles];
  const fontKey = FontStyles[`${variant}${type}` as keyof typeof FontStyles];

  const classes = classNames(alignKey, fontKey, {
    [className]: className,
  });

  const Tag = tagName;

  return (
    <Tag {...rest} style={{ color, ...rest.style }} className={classes}>
      {children}
    </Tag>
  );
};

export default Typography;
