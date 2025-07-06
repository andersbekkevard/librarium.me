import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: threshold 
  });

  return { ref, isInView };
};

// Hook for reduced motion preferences
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount: number, delay = 0.1) => {
  const [animationStates, setAnimationStates] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );

  const triggerStaggeredAnimation = () => {
    animationStates.forEach((_, index) => {
      setTimeout(() => {
        setAnimationStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      }, index * delay * 1000);
    });
  };

  const resetAnimation = () => {
    setAnimationStates(new Array(itemCount).fill(false));
  };

  return { animationStates, triggerStaggeredAnimation, resetAnimation };
};