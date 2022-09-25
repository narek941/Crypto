import { FunctionComponent, SVGProps } from 'react';

import { BinanceFutureCoinIcon, BinanceFutureIcon, BinanceSpotIcon } from 'assets/icons';
import { AccountTabType } from 'components/views/Table/TableToolbar/types';

export type AccountsTab = {
  id: string;
  name: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  platformId: number;
};

const accountsTab: AccountsTab[] = [
  {
    id: AccountTabType.BINANCE,
    name: 'Binance Spot',
    Icon: BinanceSpotIcon,
    platformId: 1,
  },
  {
    id: AccountTabType.BINANCE_FUTURES_USDTM,
    name: 'USDT-M',
    Icon: BinanceFutureIcon,
    platformId: 2,
  },
  {
    id: AccountTabType.BINANCE_FUTURES_COINM,
    name: 'COIN-M',
    Icon: BinanceFutureCoinIcon,
    platformId: 3,
  },
];

export default accountsTab;
