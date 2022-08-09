import React, { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  value?: any;
  name?: string;
  label?: string;
  error?: string;
  isSmall?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  haveRightIcon?: boolean;
  innerClassName?: string;
  labelClassName?: string;
  isDisabledError?: boolean;
  type?: HTMLInputTypeAttribute;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightToggledIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange?: any;
  onFocus?: any;
}
