import { useEffect } from "react";

/* Fades elements with [data-reveal] in as they scroll into view */
export const useReveal = (rootRef) => {
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [rootRef]);
};
