export interface ILink {
  children: JSX.Element | string;
  className?: string;
  to: string;
  size?: 's' | 'm' | 'l';
  color?: 'secondary' | 'primary';
}
