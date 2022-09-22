import { useEffect, useState } from 'react';
import { Paper, TableContainer, Tooltip } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { accountAnalyticsTabs } from 'constants/index';
import {
  Tab,
  OrdersTable,
  TradesTable,
  InflowsTable,
  WalletsTable,
  OrdersHistoryTable,
  AnalyticsAlertTable,
} from 'components';
import { BinanceFutureIcon, BinanceSpotIcon, FilterIcon } from 'assets/icons';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { useAppDispatch } from 'hooks';

import { FutureTabType } from '../Table/TableToolbar/types';

import styles from './AnalyticsTabs.module.scss';
import { TabType } from './types';

const AnalyticsTabs = (): JSX.Element => {
  const exchangeTab = [
    {
      id: FutureTabType.DAPI,
      Icon: BinanceSpotIcon,
    },
    {
      id: FutureTabType.FAPI,
      Icon: BinanceFutureIcon,
    },
  ];
  const [showExchangeTab, setShowExchangeTab] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { t } = useTranslation();
  const { platform } = useSelector(accountsSelectors.selectAccountByIdPlatform);

  const handleTabUpdateChange = (id: string) => {
    const type = searchParams.get('type') || '';

    setSearchParams({ tab: id, type });
  };

  const handleExchangeTabUpdateChange = (id: string) => {
    const tab = searchParams.get('tab') || '';

    setSearchParams({ tab, type: id });
  };

  const handleFilter = () => setOpenFilter(!openFilter);

  useEffect(() => {
    setOpenFilter(false);

    const exchangeIsNeeded =
      searchParams.get('tab') === TabType.history ||
      searchParams.get('tab') === TabType.orders ||
      searchParams.get('tab') === TabType.inflow ||
      searchParams.get('tab') === TabType.trades;

    setShowExchangeTab(platform === '2' && exchangeIsNeeded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('tab')]);

  useEffect(() => {
    dispatch(accountsActions.platformApiTypeUpdate({ api: searchParams.get('type') }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('type')]);

  const renderTable = () => {
    switch (searchParams.get('tab')) {
      case TabType.wallet:
        return <WalletsTable filterVisible={openFilter} />;
      case TabType.inflow:
        return <InflowsTable filterVisible={openFilter} />;
      case TabType.history:
        return <OrdersHistoryTable filterVisible={openFilter} />;
      case TabType.trades:
        return <TradesTable filterVisible={openFilter} />;
      case TabType.alerts:
        return <AnalyticsAlertTable filterVisible={openFilter} />;
      case TabType.orders:
        return <OrdersTable filterVisible={openFilter} />;
      default:
        return <OrdersTable filterVisible={openFilter} />;
    }
  };

  return (
    <TableContainer component={Paper} className={styles.table}>
      <div className={styles.tabs__wrapper}>
        <div className={styles.tabs}>
          {accountAnalyticsTabs.map(({ id, name }) => (
            <Tab
              selectedTab={searchParams.get('tab') || TabType.orders}
              handleChange={handleTabUpdateChange}
              id={id}
              name={name}
              key={id}
            />
          ))}
        </div>
        <div className={styles.toolbar__filter}>
          {showExchangeTab && (
            <div className={styles.toolbar__exchange}>
              {exchangeTab.map(({ id, Icon }) => (
                <Tab
                  selectedTab={searchParams.get('type') || FutureTabType.FAPI}
                  handleChange={handleExchangeTabUpdateChange}
                  id={id}
                  key={id}
                  Icon={Icon}
                  withBorder={false}
                />
              ))}
            </div>
          )}
          <Tooltip followCursor={true} placement='bottom' title={t('filters')}>
            <FilterIcon onClick={handleFilter} />
          </Tooltip>
        </div>
      </div>
      {renderTable()}
    </TableContainer>
  );
};

export default AnalyticsTabs;
