import { useSyncExternalStore } from 'react';

// Subscribes to a CSS media query so JS-only behaviour (like the mobile cart drawer) matches the CSS breakpoint.
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches
  );
}
