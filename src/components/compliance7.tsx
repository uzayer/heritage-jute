import Image from "next/image";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface Feature {
  title: string;
  description: string;
}

interface Certification {
  src: string;
  alt: string;
}

interface Compliance7Props {
  heading?: string;
  description?: string;
  features?: Feature[];
  certifications?: Certification[];
  complianceHeading?: string;
  complianceDescription?: string;
  /** Anchor id for in-page links (e.g. <a href="/about#certifications">). */
  sectionId?: string;
  className?: string;
}

const defaultFeatures = [
  {
    title: "Advanced API Framework",
    description:
      "Robust APIs designed for effortless integration and accelerated deployment cycles.",
  },
  {
    title: "Always-On Support",
    description:
      "Continuous technical assistance to ensure your systems operate without interruption.",
  },
  {
    title: "Protected Data Storage",
    description:
      "Enterprise-level data storage infrastructure with robust security protocols and streamlined data management.",
  },
  {
    title: "Industry Compliance Ready",
    description:
      "Built to meet international standards ensuring complete regulatory confidence.",
  },
];

const defaultCertifications = [
  {
    src: "/images/bd-government-seal.svg",
    alt: "Illustrative Bangladesh emblem (fictional, not an official seal)",
  },
];

const FeatureItem = ({ title, description }: Feature) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">{title}</p>
      <p className="font-medium text-muted-foreground">{description}</p>
    </div>
  );
};

const Compliance7 = ({
  heading = "Enterprise-Grade Cloud Infrastructure Platform",
  description = "A comprehensive cloud infrastructure solution built for modern enterprises, delivering exceptional security and performance at scale.",
  features = defaultFeatures,
  certifications = defaultCertifications,
  complianceHeading = "Security and Scalability",
  complianceDescription = "Platform engineered for maximum security and unlimited growth potential, pursuing SOC2 Type 2 and ISO27001 certifications.",
  sectionId,
  className,
}: Compliance7Props = {}) => {
  return (
    <section id={sectionId} className={cn("py-32", className)}>
      <div className="container">
        <div className="relative grid lg:grid-cols-2">
          <div className="absolute top-0 h-5 w-full">
            <DottedGlowBackground
              radius={1.2}
              gap={6}
              speedMin={0.2}
              speedMax={5}
              speedScale={1}
              darkColor="rgba(255, 255, 255, 0.7)"
            />
          </div>
          <div className="absolute bottom-0 h-5 w-full">
            <DottedGlowBackground
              radius={1.2}
              gap={6}
              speedMin={0.2}
              speedMax={5}
              speedScale={1}
              darkColor="rgba(255, 255, 255, 0.7)"
            />
          </div>

          <div className="flex flex-col">
            <div className="border border-dashed bg-gradient-to-b from-foreground/10 to-background p-10 sm:p-20">
              <Reveal direction="none">
                <FeatureItem title={heading} description={description} />
              </Reveal>
            </div>
            <Reveal
              stagger={0.06}
              className="grid gap-10 border border-t-0 border-dashed p-10 sm:p-20 md:grid-cols-2"
            >
              {features.map((feature) => (
                <div key={feature.title}>
                  <FeatureItem
                    title={feature.title}
                    description={feature.description}
                  />
                </div>
              ))}
            </Reveal>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-20 border border-l-0 border-dashed bg-gradient-to-tr from-foreground/10 to-background to-30% p-10 sm:p-20 dark:from-foreground/20">
            <Reveal direction="none">
              <div className="flex items-center gap-4 sm:gap-10">
                {certifications.map((certification) => {
                  return (
                    <div
                      key={certification.src}
                      className="flex items-center justify-center"
                    >
                      <Image
                        src={certification.src}
                        alt={certification.alt}
                        width={176}
                        height={176}
                        className="size-36 object-contain sm:size-44"
                        unoptimized
                      />
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="flex flex-col gap-2 text-center">
                <p className="text-4xl font-semibold">{complianceHeading}</p>
                <p className="font-medium text-muted-foreground">
                  {complianceDescription}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compliance7 };
