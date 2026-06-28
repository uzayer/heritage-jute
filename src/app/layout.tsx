import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar8 } from "@/components/navbar8";
import { Footer7 } from "@/components/footer7";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteUrl, defaultOgImage } from "@/lib/site";
import { MotionProvider } from "@/components/motion/motion-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const siteTitle = "Heritage Jute Fibers — Bangladesh Jute Exporter";
const siteDescription =
  "Heritage Jute Fibers is a government-certified jute exporter based in Dhaka, Bangladesh. Supplying raw jute, yarn, cloth, bags, and rope to importers in 31 countries.";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Heritage Jute Fibers",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: "House 39, Flat 3-B, Road 12, Sector 10, Uttara Model Town",
    addressLocality: "Dhaka",
    postalCode: "1230",
    addressCountry: "BD",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+8801841111625",
    contactType: "sales",
    availableLanguage: ["English", "Bengali"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "jute exporter Bangladesh",
    "raw jute",
    "jute yarn",
    "hessian cloth",
    "sacking bags",
    "jute rope",
    "BJGEA",
    "Heritage Jute Fibers",
  ],
  authors: [{ name: "Heritage Jute Fibers", url: siteUrl }],
  creator: "Heritage Jute Fibers",
  publisher: "Heritage Jute Fibers",
  formatDetection: { email: true, address: true, telephone: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Heritage Jute Fibers",
    title: siteTitle,
    description: siteDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [defaultOgImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
        <Navbar8 />
        <MotionProvider>
          <main className="flex-1 pt-24">{children}</main>
        </MotionProvider>
        <Footer7 />
        <SpeedInsights />
      </body>
    </html>
  );
}
