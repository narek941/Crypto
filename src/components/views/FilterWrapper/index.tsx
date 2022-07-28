import { useRef, useState } from 'react';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import RangeSwipe from 'components/shared/Range';
import { CloseIcon, HandIcon, PercentIcon } from 'assets/icons';
import { Select } from 'components';

import Search from '../Search';

import styles from './FilterWrapper.module.scss';
const FilterWrapper = () => {
  const ref = useRef(null);
  const [isMore, setIsMore] = useState(false);

  const handleToggle = () => setIsMore(!isMore);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <DatePicker placeholder='Choose creation date' />
        </div>

        <div className={styles.item}>
          <DualSelect ref={ref} />
        </div>
        <div className={styles.item}>
          <Select
            options={[
              { label: 'Buy', value: 'Buy' },
              { label: 'Sell', value: 'Sell' },
            ]}
            placeholder='Buy'
            className={styles.select}
          />
        </div>
        <div className={styles.item}>
          <RangeSwipe />
        </div>
        <div className={styles.item}>
          <Search placeholder={'Enter Alert Message'} className={styles.search} />
        </div>

        {isMore && (
          <>
            <div className={styles.item}>
              <Search placeholder={'Enter ID'} className={styles.search} />
            </div>

            <div className={styles.item}>
              <DatePicker placeholder='Select created time' />
            </div>
            <div className={styles.item}>
              <RangeSwipe placeholder='Select value,USDT' />
            </div>

            <div className={styles.item}>
              <Search placeholder={'Select Received'} className={styles.search} />
            </div>
            <div className={styles.item}>
              <Search placeholder={'Select Received,USDT'} className={styles.search} />
            </div>
            <div className={styles.item}>
              <RangeSwipe placeholder='Select Fee' Icon={HandIcon} />
            </div>
            <div className={styles.item}>
              <RangeSwipe placeholder='Select Fee,USDT' Icon={HandIcon} />
            </div>
            <div className={styles.item}>
              <RangeSwipe placeholder='Select Share' Icon={PercentIcon} />
            </div>
            <div className={styles.item}>
              <DatePicker placeholder='Select updated time' />
            </div>
          </>
        )}
        <div className={styles.clear}>
          <div>Clear all</div>
          <div>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div role='button' onClick={handleToggle} className={styles.toggle}>
        Click Here to {isMore ? 'Hide' : 'Show'} Advanced Filters
      </div>
    </div>
  );
};

export default FilterWrapper;
