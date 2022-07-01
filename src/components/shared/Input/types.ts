import React, { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  value?: any;
  name?: string;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  haveRightIcon?: boolean;
  innerClassName?: string;
  labelClassName?: string;
  type?: HTMLInputTypeAttribute;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightToggledIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
