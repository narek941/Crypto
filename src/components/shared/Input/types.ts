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
  viewOnly?: boolean;
  isDisabledError?: boolean;
  type?: HTMLInputTypeAttribute;
  error?: string | boolean | any;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightToggledIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
