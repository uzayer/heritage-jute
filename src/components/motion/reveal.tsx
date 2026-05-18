"use client";

import * as React from "react";
import { Children, isValidElement } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Animation direction. `none` will only fade.
   */
  direction?: RevealDirection;
  /**
   * Distance in pixels for directional offset.
   */
  distance?: number;
  /**
   * Delay in seconds.
   */
  delay?: number;
  /**
   * Duration in seconds.
   */
  duration?: number;
  /**
   * Only animate once when entering viewport.
   */
  once?: boolean;
  /**
   * When true, allow the animation to replay when the section re-enters the
   * viewport (sets `viewport.once` to false).
   */
  replay?: boolean;
  /**
   * How much of the element should be visible before triggering.
   * Use a number (0..1) or `"some"` / `"all"`.
   */
  amount?: number | "some" | "all";
  /**
   * Root margin for viewport trigger, e.g. `"-80px 0px"`.
   */
  margin?: string;
  /**
   * When set (> 0), each direct child is wrapped with staggered motion using
   * `staggerChildren` (seconds between children).
   */
  stagger?: number;
  /**
   * Extra delay before the stagger sequence starts (seconds).
   */
  staggerDelay?: number;
  /**
   * When true, skip all animation and render children immediately.
   * Use for above-the-fold content to avoid hiding LCP elements.
   */
  eager?: boolean;
}

type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

function getOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 16,
  delay = 0,
  duration = 0.5,
  once = true,
  replay = false,
  amount = "some",
  margin = "-80px 0px",
  stagger,
  staggerDelay = 0,
  eager = false,
}: RevealProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const viewportOnce = replay ? false : once;
  const isInView = useInView(rootRef, {
    once: viewportOnce,
    amount,
    margin: margin as UseInViewOptions["margin"],
  });
  const useStagger =
    typeof stagger === "number" && stagger > 0 && !shouldReduceMotion;

  if (eager || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getOffset(direction, distance);
  const ease = [0.21, 0.47, 0.32, 0.98] as const;

  if (useStagger) {
    const containerVariants: Variants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: staggerDelay + delay,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, ...offset },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration, ease },
      },
    };

    return (
      <motion.div
        ref={rootRef}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {Children.map(children, (child, index) => {
          const key = isValidElement(child) && child.key != null
            ? String(child.key)
            : `reveal-stagger-${index}`;
          return (
            <motion.div key={key} variants={itemVariants}>
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    show: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={rootRef}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
