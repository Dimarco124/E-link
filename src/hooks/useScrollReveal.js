import { useEffect } from 'react';

/**
 * Hook to trigger scroll reveal animations.
 * Selects all elements with the '.reveal' class and adds '.active' when they enter the viewport.
 */
export default function useScrollReveal(pathname) {
  useEffect(() => {
    // 1. Reset state on navigation
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
          // Once revealed, we stop observing this specific element instance
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Function to observe all current reveal elements
    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        // Only observe if it doesn't already have 'active' class (optimization)
        if (!el.classList.contains('active')) {
          observer.observe(el);
        }
      });
    };

    // 2. Initial observation
    observeAll();

    // 3. Setup MutationObserver to handle React re-renders/dynamic content
    // This is CRITICAL for components that change state (like Services cards)
    const mutationObserver = new MutationObserver((mutations) => {
      let needsReObserve = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.type === 'childList') {
          needsReObserve = true;
        }
      });
      if (needsReObserve) observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);
}
