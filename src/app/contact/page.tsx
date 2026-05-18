import type { Metadata } from "next";
import { Contact11 } from "@/components/contact11";

import { submitContactInquiry } from "./actions";
import { defaultOgImage } from "@/lib/site";

const ogTitle = "Contact Heritage Jute Fibers — Send an Inquiry";
const ogDescription =
  "Get in touch with Heritage Jute Fibers. Send an inquiry, WhatsApp us, or call. House 39, Flat 3-B, Road 12, Sector 10, Uttara Model Town, Dhaka-1230, Bangladesh.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: "/contact",
    images: [defaultOgImage],
  },
  twitter: {
    title: ogTitle,
    description: ogDescription,
    images: [defaultOgImage.url],
  },
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Heritage Jute Fibers",
  url: "https://heritagejute.com",
  telephone: "+8801841111625",
  email: "info@heritagejute.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House 39, Flat 3-B, Road 12, Sector 10, Uttara Model Town",
    addressLocality: "Dhaka",
    postalCode: "1230",
    addressCountry: "BD",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <Contact11
        title="Contact Heritage Jute Fibers"
        description="Ready to source jute? Send us your product requirements and we'll respond within one business day. For urgent inquiries, WhatsApp is fastest."
        corporateHeading="Office"
        addressLine1="House 39, Flat 3-B, Road 12, Sector 10"
        addressLine2="Uttara Model Town, Dhaka-1230, Bangladesh"
        contactHeading="Get in touch"
        phone="+880 1841-111625"
        email="info@heritagejute.com"
        web={{ label: "heritagejute.com", url: "https://www.heritagejute.com" }}
        socialHeading="Follow us"
        socialLinks={[{ network: "linkedin", url: "https://www.linkedin.com" }]}
        formHeading="Send an Inquiry"
        successMessage="Thank you — we'll respond within one business day."
        submitLabel="Send Inquiry"
        submittingLabel="Sending…"
        onSubmit={submitContactInquiry}
      />
    </>
  );
}
