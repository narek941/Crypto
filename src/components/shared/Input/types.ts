import React, { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  value?: any;
  onBlur?: any;
  name?: string;
  onFocus?: any;
  onChange?: any;
  label?: string;
  defaultValue?: any;
  isSmall?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  haveRightIcon?: boolean;
  innerClassName?: string;
  labelClassName?: string;
  error?: string | boolean | any;
  isDisabledError?: boolean;
  type?: HTMLInputTypeAttribute;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightToggledIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
