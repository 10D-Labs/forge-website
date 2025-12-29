import { useEffect, useRef, useState, useCallback } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use requestAnimationFrame to batch state updates and prevent forced reflows
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      // Use rAF to batch the state update with the next paint cycle
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      observer.unobserve(entry.target);
    }
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(handleIntersection, { 
      threshold,
      // Use rootMargin to trigger slightly before element is visible
      rootMargin: '50px'
    });

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, handleIntersection]);

  return { ref, isVisible };
};
