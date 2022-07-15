import React from 'react';

import { FormErrorBoxProps } from './types';

const FormErrorBox: React.FC<FormErrorBoxProps> = ({ errors, className }) => (
  <div className={className}>
    <div>{errors}</div>
  </div>
);

export default FormErrorBox;
