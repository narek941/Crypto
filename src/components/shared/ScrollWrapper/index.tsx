import styles from './ScrollWrapper.module.scss';

const ScrollWrapper = ({ children }: any) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ScrollWrapper;
