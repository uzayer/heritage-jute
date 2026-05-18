import {
  Wheat,
  Scissors,
  Layers,
  ShoppingBag,
  Archive,
  Settings2,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const reasons = [
  {
    title: "Raw Materials",
    description:
      "Raw jute, jute sliver (Tossa), and cut jute fiber in multiple grades — BTD, BTC, BTR, BWD, BWC — for yarn spinning and industrial processing.",
    icon: <Wheat className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />,
  },
  {
    title: "Yarn",
    description:
      "Jute yarn in count range 8–96 lbs (275–3310 Tex), single or multi-ply. Qualities: Sacking, Hessian, CB, CRM, CTR, CRX. Natural, bleached, or dyed finishes.",
    icon: (
      <Scissors
        className="size-7 shrink-0 md:size-8"
        strokeWidth={1.5}
      />
    ),
  },
  {
    title: "Fabrics & Cloth",
    description:
      "Hessian cloth (burlap) and sacking cloth in widths 24–52 inches, weights 200–305 GSM. Also jute carpet backing. Available in bales of 500–2,000 yards.",
    icon: (
      <Layers className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />
    ),
  },
  {
    title: "Bags & Packaging",
    description:
      "Hessian bags, sacking sacks, and general jute bags for grain, coffee, cocoa, and agricultural storage. Custom sizes, GSM, and private labeling available.",
    icon: (
      <ShoppingBag
        className="size-7 shrink-0 md:size-8"
        strokeWidth={1.5}
      />
    ),
  },
  {
    title: "Rope & Twine",
    description:
      "Jute rope in 6–42 mm diameter for packaging, tying, and gardening. Jute twine in sacking, hessian, and CB qualities. Packed 25 kg per roll.",
    icon: <Archive className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />,
  },
  {
    title: "Custom Orders",
    description:
      "Bespoke dimensions, private labeling, and specific grade mixes. Container loads (20' FCL = 13 MT, 40' FCL = 24–26 MT). Payment: LC at Sight, T/T, CAD.",
    icon: (
      <Settings2
        className="size-7 shrink-0 md:size-8"
        strokeWidth={1.5}
      />
    ),
  },
];

interface Feature85Props {
  className?: string;
}

const Feature85 = ({ className }: Feature85Props) => {
  return (
    <section className={cn("", className)}>
      <div className="border-t">
        <div>
          <div className="relative container overflow-hidden border-x border-muted-foreground/20 py-32">
            <div className="isolate mx-auto flex max-w-3xl flex-col gap-20">
              <div className="bg absolute -top-1 -left-[1px] -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_100%_120%_at_50%_50%,transparent_20%,#000_100%)] bg-[size:64px_64px] opacity-20 [clip-path:inset(0px_0px_50%_0px)]"></div>
              <Reveal direction="none" eager>
                <h2 className="text-center text-3xl md:text-5xl">
                  Our Jute Product Range
                </h2>
              </Reveal>
              <Reveal direction="none" delay={0.05} eager>
                <Image
                  src="/images/gallery/Raw-Jute.webp"
                  alt="Raw jute fibre in graded bales — starting point for yarn, fabrics, bags, and rope"
                  width={630}
                  height={450}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="max-h-64 w-full rounded-xl border border-border/60 bg-muted object-cover shadow-sm grayscale"
                />
              </Reveal>
              <Reveal delay={0.1} eager>
                <p className="text-center text-xl md:text-3xl">
                  From raw fibre to finished bags — 11 product lines serving
                  importers across 31 countries.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="border-t border-muted-foreground/20">
            <div className="container border-x border-muted-foreground/20 px-0">
              <Reveal
                stagger={0.06}
                className="grid gap-px bg-muted-foreground/20 md:grid-cols-2 lg:grid-cols-3"
              >
                {reasons.map((reason, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-muted px-6 pt-8 pb-8 md:flex-col md:gap-0 md:px-8 md:pt-16"
                  >
                    {reason.icon}
                    <div>
                      <h3 className="mb-2 md:mt-6 md:text-lg">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
          <div>
            <div className="border-x border-t border-muted-foreground/20">
              <div className="container border-x border-muted-foreground/20 py-16"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature85 };
