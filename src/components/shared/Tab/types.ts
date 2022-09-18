import { FunctionComponent, SVGProps } from 'react';

export interface ITab {
  selectedTab: string;
  handleChange: (id: string) => void;
  name?: string;
  id: string;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>> | any;
  withBorder?: boolean;
}
