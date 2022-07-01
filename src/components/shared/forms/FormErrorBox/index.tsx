import React from 'react';

import { FormErrorBoxProps } from './types';

const FormErrorBox: React.FC<FormErrorBoxProps> = ({ errors }) => (
  <div>
    <div>{errors}</div>
  </div>
);

export default FormErrorBox;
