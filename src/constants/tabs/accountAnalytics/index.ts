import { TabType } from 'components/views/AnalyticsTabs/types';

type AccountAnalyticsTab = { id: string; name: string };

const accountAnalyticsTabs: AccountAnalyticsTab[] = [
  {
    id: TabType.orders,
    name: 'Open orders',
  },
  {
    id: TabType.wallet,
    name: 'Wallet',
  },
  {
    id: TabType.inflow,
    name: 'Inflows & Outflows',
  },
  {
    id: TabType.history,
    name: 'Orders History',
  },
  {
    id: TabType.trades,
    name: 'Trades',
  },
  {
    id: TabType.alerts,
    name: 'Alerts',
  },
];

export default accountAnalyticsTabs;
