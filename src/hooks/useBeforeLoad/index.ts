import { useEffect, useRef } from 'react';

const useBeforeLoad = (fn: any) => {
  const cb = useRef(fn);
  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    const onBeforeLoad = (...args: any) => cb.current?.(...args);

    window.addEventListener('beforeunload', onBeforeLoad);

    return () => window.removeEventListener('beforeunload', onBeforeLoad);
  }, []);
};
export default useBeforeLoad;
