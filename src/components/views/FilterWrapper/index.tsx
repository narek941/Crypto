import { useRef, useState } from 'react';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import RangeSwipe from 'components/shared/Range';
import { CloseIcon } from 'assets/icons';

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
          <DatePicker />
        </div>

        <div className={styles.item}>
          <DualSelect ref={ref} />
        </div>

        <div className={styles.search}>
          <Search placeholder={'Select value'} />
        </div>

        {isMore && (
          <>
            <div className={styles.item}>
              <RangeSwipe />
            </div>
            <div className={styles.item}>
              <Search placeholder={'Enter ID'} />
            </div>
            <div className={styles.item}>
              <Search placeholder={'Enter Alert Message'} />
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
      <div role='button' onClick={handleToggle}>
        Click Here to Show Advanced Filters
      </div>
    </div>
  );
};

export default FilterWrapper;
