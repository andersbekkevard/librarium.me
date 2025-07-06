import { Variants } from "framer-motion";

// Animation variants for common patterns
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const fadeInBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

// Container variant for staggered animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

// Animation configurations
export const defaultTransition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  duration: 0.6,
};

export const smoothTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
};

export const bounceTransition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

// Viewport configuration for scroll animations
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3,
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", damping: 15, stiffness: 300 },
};

export const hoverLift = {
  y: -5,
  transition: { type: "spring", damping: 15, stiffness: 300 },
};