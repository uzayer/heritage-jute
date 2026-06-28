"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const IMAGES: { src: string; alt: string }[] = [
  { src: "/images/gallery/Jute-Cloth.webp", alt: "Woven jute cloth" },
  { src: "/images/gallery/Hessian-Cloth-scaled.webp", alt: "Hessian cloth (burlap)" },
  {
    src: "/images/gallery/high-view-coffee-beans-burlap-sack-1-scaled.webp",
    alt: "Coffee beans in a jute burlap sack",
  },
  { src: "/images/gallery/Jute-Ropes.webp", alt: "Coiled jute rope" },
  {
    src: "/images/gallery/rough-rope-texture-composition-scaled.webp",
    alt: "Close-up of twisted jute rope texture",
  },
  { src: "/images/gallery/00.webp", alt: "Jute materials and products" },
  { src: "/images/gallery/web-photo_2.webp", alt: "Heritage Jute products" },
  {
    src: "/images/gallery/WhatsApp-Image-2025-06-12-at-11.20.41.webp",
    alt: "Jute production and materials",
  },
  {
    src: "/images/gallery/pexels-cottonbro-4829070-scaled.webp",
    alt: "Natural jute fibre texture",
  },
  {
    src: "/images/gallery/pexels-pixabay-57396-scaled.webp",
    alt: "Jute rope and crafting materials",
  },
  {
    src: "/images/gallery/pexels-skylar-kang-6044407-scaled.webp",
    alt: "Jute yarn and textile craft",
  },
  {
    src: "/images/gallery/pexels-sm-mostafijur-nasim-644778890-17778573.webp",
    alt: "Jute sacks stacked for storage or export",
  },
  {
    src: "/images/gallery/GetPaidStock.com-68550a3eb7c51.webp",
    alt: "Jute industry — raw and processed fibre",
  },
  {
    src: "/images/gallery/GetPaidStock.com-68550b921cce2.webp",
    alt: "Jute products and natural packaging",
  },
  {
    src: "/images/gallery/GetPaidStock.com-68550df27e501.webp",
    alt: "Jute fabrics and industrial supply",
  },
  {
    src: "/images/gallery/GetPaidStock.com-685575fec65d5.webp",
    alt: "Sustainable jute goods",
  },
];

interface Gallery7Props {
  className?: string;
}

const Gallery7 = ({ className }: Gallery7Props) => {
  const [plugins] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 768
      ? [AutoScroll({ speed: 0.9 })]
      : [],
  );

  return (
    <section
      className={cn("border-t border-muted-foreground/20", className)}
      aria-labelledby="gallery7-heading"
    >
      <div className="container border-x border-muted-foreground/20 px-6 py-10 md:py-14">
        <Reveal
          className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-x-12 md:gap-y-4"
          stagger={0.08}
          direction="none"
        >
          <div className="flex flex-col gap-6">
            <h2
              id="gallery7-heading"
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Product gallery
            </h2>
            <Link
              href="/products"
              className="inline-flex w-fit items-center font-medium text-primary hover:underline"
            >
              Browse our catalog <MoveRight className="ml-2 inline size-5" />
            </Link>
          </div>
          <div>
            <p className="text-sm text-muted-foreground md:text-base">
              From raw fibre to yarn, fabrics, bags, and rope — a snapshot of the
              range we export to buyers worldwide.
            </p>
          </div>
        </Reveal>
        <div className="-mx-6 max-w-[100vw] overflow-x-hidden md:-mx-6">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={plugins}
            className="pointer-events-none"
          >
            <CarouselContent className="-ml-3">
              {IMAGES.map(({ src, alt }, index) => (
                <CarouselItem key={src} className="basis-auto pl-3">
                  <div
                    className={cn(
                      "relative h-72 w-52 sm:h-80 sm:w-60",
                      index % 2 === 0 ? "mt-10" : "mt-4",
                    )}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="rounded-md object-cover"
                      sizes="(max-width: 639px) 208px, 240px"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Gallery7 };
