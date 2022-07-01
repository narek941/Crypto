declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  const className: string;
  const onClick: () => void;

  export default { src, className, onClick };
}
