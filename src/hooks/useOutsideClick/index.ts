import { RefObject, useEffect } from 'react';

import { AnyEvent } from './types';

const useOnClickOutside = <T extends HTMLElement | null = HTMLElement | any>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
  useDataDropdownAttr?: boolean,
): void => {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;
      const checkDataAttr =
        useDataDropdownAttr && el ? el.getAttribute('data-dropdown') === 'true' : false;

      if (!el || el.contains(event.target as Node) || checkDataAttr) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, useDataDropdownAttr]);
};

export default useOnClickOutside;
