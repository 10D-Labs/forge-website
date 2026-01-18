import { useCallback } from 'react';

interface ScrollOptions {
  center?: boolean;
  offset?: number;
}

export function useScrollToElement() {
  const scrollToElement = useCallback((elementId: string, options: ScrollOptions = {}) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;

    let targetPosition: number;

    if (options.center) {
      // Center the element in the viewport
      targetPosition = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
    } else {
      // Scroll to top of element with optional offset
      targetPosition = absoluteElementTop - (options.offset || 0);
    }

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }, []);

  return { scrollToElement };
}
