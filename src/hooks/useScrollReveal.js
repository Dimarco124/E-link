import { useEffect } from 'react';

/**
 * Hook to trigger scroll reveal animations.
 * Selects all elements with the '.reveal' class and adds '.active' when they enter the viewport.
 */
export default function useScrollReveal(pathname) {
  useEffect(() => {
    // 1. Immediately force scroll to top and remove 'active' from all reveal elements
    // This ensures we start from a clean state at the top of the new page
    window.scrollTo(0, 0);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => el.classList.remove('active'));

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    // 2. We wait a bit more and ensure scroll is at 0 before starting observation
    // This handles the race condition with React Router rendering and ScrollToTop
    const timeoutId = setTimeout(() => {
      // Force scroll to top if not already there (safety)
      // window.scrollTo(0, 0); 

      const observer = new IntersectionObserver(handleIntersect, observerOptions);
      const elementsToObserve = document.querySelectorAll('.reveal');

      elementsToObserve.forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 150); // Slightly longer delay for stability

    return () => clearTimeout(timeoutId);
  }, [pathname]);
}
