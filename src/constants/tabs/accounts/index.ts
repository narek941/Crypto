import { FunctionComponent, SVGProps } from 'react';

import { BinanceFutureIcon, BinanceSpotIcon } from 'assets/icons';
import { AccountTabType } from 'components/views/AnalyticsTabs/types';

type AccountsTab = { id: string; name: string; Icon: FunctionComponent<SVGProps<SVGSVGElement>> };

const accountsTab: AccountsTab[] = [
  {
    id: AccountTabType.spot,
    name: 'Binance Spot',
    Icon: BinanceSpotIcon,
  },
  {
    id: AccountTabType.futures,
    name: 'Binance Futures',
    Icon: BinanceFutureIcon,
  },
];

export default accountsTab;
