"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { MotionCta } from "@/components/motion/cta-motion";
import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect } from "react";

const Globe = dynamic(
  () => import("@/components/ui/globe").then((m) => ({ default: m.Globe })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 mx-auto aspect-square w-full max-w-150 animate-pulse rounded-full bg-muted/40" />
    ),
  }
);

interface Hero249Props {
  className?: string;
}

const EXPORT_COUNTRIES = [
  "Italy", "Spain", "Slovenia", "Romania", "Poland", "Russia", "Morocco",
  "Malaysia", "Australia", "New Zealand", "India", "Pakistan", "Sri Lanka",
  "Myanmar", "Vietnam", "China", "South Korea", "Thailand", "Japan", "Fiji",
  "Timor-Leste", "South Africa", "Tanzania", "Egypt", "Tunisia", "Turkey",
  "Jordan", "Iran", "Mexico", "Peru", "Brazil",
];

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const Hero249 = ({ className }: Hero249Props) => {
  const [isXl, setIsXl] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1280px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const handler = (e: MediaQueryListEvent) => setIsXl(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const reduced = useReducedMotion();
  const yOff = reduced ? 0 : 12;
  const dur = reduced ? 0.05 : 0.42;
  const stagger = reduced ? 0 : 0.06;

  const sequenceContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: reduced ? 0 : 0.04,
      },
    },
  };

  const sequenceItem = {
    hidden: { opacity: 0, y: yOff },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  return (
    <section className={cn("", className)}>
      <div className="border-b">
        <div className="container grid xl:grid-cols-2 xl:gap-16">
          <motion.div
            className="flex flex-col justify-between gap-6 py-12"
            variants={sequenceContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              className="text-4xl font-medium tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl"
              variants={sequenceItem}
            >
              Bangladesh&apos;s Trusted Jute Exporter{" "}
              <span className="text-muted-foreground">
                shipping to 31 countries worldwide.
              </span>
            </motion.h1>
            <div className="flex max-w-xl flex-col gap-6">
              <motion.p
                className="text-muted-foreground md:text-lg"
                variants={sequenceItem}
              >
                Heritage Jute Fibers supplies raw jute, yarn, cloth, bags, and
                rope to importers, wholesalers, and manufacturers across six
                continents. Government certified, factory pricing, reliable
                shipping.
              </motion.p>
              <motion.p className="md:text-lg" variants={sequenceItem}>
                Established 2014 · BJGEA Member · ERC Certified · Jute Ministry
                Approved
              </motion.p>
              <motion.div
                variants={sequenceItem}
                className="flex flex-wrap gap-3"
              >
                <MotionCta>
                  <Button size="lg" className="w-fit" asChild>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </MotionCta>
                <MotionCta>
                  <Button size="lg" variant="outline" className="w-fit" asChild>
                    <a
                      href="https://wa.me/8801841111625"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </MotionCta>
              </motion.div>
            </div>
          </motion.div>
          {isXl && (
            <Reveal
              className="relative hidden xl:flex min-h-[320px] items-center justify-center"
              direction="none"
              delay={0.05}
            >
              <Globe className="static max-w-full" />
            </Reveal>
          )}
        </div>
      </div>
      <div className="border-b">
        <div className="container py-12">
          <Reveal
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            stagger={0.08}
            direction="none"
          >
            <div className="text-center text-sm lg:text-left lg:text-base">
              Exporting to 31 countries across 6 continents
            </div>
            <div className="min-w-0">
              <Marquee className="relative">
                <MarqueeContent>
                  {EXPORT_COUNTRIES.map((country, index) => (
                    <MarqueeItem key={index}>
                      <span className="mx-6 text-sm font-medium text-muted-foreground opacity-80">
                        {country}
                      </span>
                    </MarqueeItem>
                  ))}
                </MarqueeContent>
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
              </Marquee>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export { Hero249 };
