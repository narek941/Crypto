import styles from './EmptyData.module.scss';

const EmptyData = () => {
  return (
    <div className={styles.container}>
      <span>No data available in table!</span>
    </div>
  );
};
export default EmptyData;
