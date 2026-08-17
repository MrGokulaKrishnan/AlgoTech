import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "up" | "fade" | "scale";
};

export const FadeIn = ({ children, className, delay = 0, duration = 0.5, variant = "up" }: FadeInProps) => {
  const variants = variant === "up" ? fadeUpVariants : variant === "scale" ? scaleUpVariants : fadeInVariants;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};
export const StaggerContainer = ({ children, className, staggerDelay = 0.1 }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={fadeUpVariants} transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
    {children}
  </motion.div>
);

export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);
