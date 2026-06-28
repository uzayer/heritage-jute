import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BACKGROUND_SRC =
  "/images/gallery/pexels-sm-mostafijur-nasim-644778890-17778573.webp";

interface Hero78Props {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

const Hero78 = ({
  heading = "Bangladesh's Trusted Jute Exporter",
  subtext = "Heritage Jute Fibers supplies raw jute, yarn, hessian cloth, sacking bags, and jute rope to importers in 31 countries — government-certified and ready to ship.",
  primaryLabel = "Browse Products",
  primaryHref = "/products",
  secondaryLabel = "WhatsApp Us",
  secondaryHref = "https://wa.me/8801841111625",
  className,
}: Hero78Props) => {
  return (
    <section
      className={cn(
        "dark relative flex h-svh max-h-[1400px] w-full overflow-hidden font-sans md:h-svh -mt-24",
        className,
      )}
    >
      <img
        src={BACKGROUND_SRC}
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 z-0 size-full object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 z-10 bg-black/45" />
      <div className="relative z-30 m-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-5 lg:max-w-4xl">
        <h1 className="text-center text-4xl font-semibold leading-tight text-white md:text-6xl xl:text-[4.4rem]">
          {heading}
        </h1>
        <p className="text-center text-base text-white/90 md:text-lg">
          {subtext}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="h-fit w-fit rounded-full border-0 bg-white px-7 py-4 text-sm font-medium leading-tight text-stone-900 hover:bg-white/90"
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button
            asChild
            className="h-fit w-fit rounded-full border border-white/70 bg-white/10 px-7 py-4 text-sm font-medium leading-tight text-white hover:bg-white/20"
          >
            <a href={secondaryHref} target="_blank" rel="noreferrer">
              {secondaryLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero78 };
