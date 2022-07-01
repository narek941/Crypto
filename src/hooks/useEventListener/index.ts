import { RefObject, useEffect, useRef } from 'react';

const useEventListener = <
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
  element?: RefObject<T>,
): void => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;

    if (!targetElement || !targetElement.addEventListener) {
      return;
    }

    const eventListener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    return (): void => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
