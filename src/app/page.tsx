import type { Metadata } from "next";
import { Hero78 } from "@/components/hero78";
import { Feature85 } from "@/components/feature85";
import { StatsSection } from "@/components/stats-2";
import ContentSection from "@/components/content-4";
import { Compliance7 } from "@/components/compliance7";
import FAQsTwo from "@/components/faqs-2";
import CallToAction from "@/components/call-to-action";
import { faqItems } from "@/lib/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero78
        heading="Bangladesh's Trusted Jute Exporter"
        subtext="Heritage Jute Fibers supplies raw jute, yarn, hessian cloth, sacking bags, and jute rope to importers in 31 countries — government-certified and ready to ship."
        primaryLabel="Browse Products"
        primaryHref="/products"
        secondaryLabel="WhatsApp"
        secondaryHref="https://wa.me/8801841111625"
      />
      <Feature85 />
      <StatsSection />
      <ContentSection />
      <Compliance7
        heading="Government Certified & Compliant"
        description="Heritage Jute Fibers is fully registered with Bangladesh's jute trade authorities and holds all required export certifications."
        features={[
          {
            title: "BJGEA Membership",
            description:
              "Registered member of the Bangladesh Jute Goods Exporters Association — the industry's primary trade body.",
          },
          {
            title: "Export Registration Certificate (ERC)",
            description:
              "ERC issued by the Export Promotion Bureau of Bangladesh, required for all legitimate export operations.",
          },
          {
            title: "Jute Ministry Approval",
            description:
              "Approved by the Bangladesh Ministry of Textiles and Jute, verifying compliance with national jute export regulations.",
          },
          {
            title: "Trade License",
            description:
              "Active trade license from Dhaka City Corporation — verifiable by any buyer or compliance team.",
          },
        ]}
        certifications={[
          {
            src: "/images/bd-government-seal.svg",
            alt: "Illustrative Bangladesh emblem (fictional, not an official seal)",
          },
        ]}
        complianceHeading="BJGEA · ERC · Jute Ministry"
        complianceDescription="All certifications are active and available for verification on request."
      />
      <FAQsTwo />
      <CallToAction
        heading="Ready to Source Jute?"
        description="Send us your product requirements and we'll respond within one business day. For urgent inquiries, WhatsApp is fastest."
        primaryLabel="WhatsApp"
        primaryHref="https://wa.me/8801841111625"
        secondaryLabel="Send an Inquiry"
        secondaryHref="/contact"
      />
    </>
  );
}
