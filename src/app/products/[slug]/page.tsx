import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ProductSpecs2 } from "@/components/product-specs2";
import { defaultOgImage, siteUrl } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  const path = `/products/${product.slug}`;
  const title = `${product.name} — Heritage Jute Fibers`;

  return {
    title,
    description: product.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: product.shortDescription,
      url: path,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.shortDescription,
      images: [defaultOgImage.url],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/products/${product.slug}` },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: `${siteUrl}${product.image.src}`,
    brand: { "@type": "Brand", name: "Heritage Jute Fibers" },
    category: product.category,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <div className="border-muted-foreground/20">
        <div className="container max-w-5xl border-x border-muted-foreground/20 py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <Reveal direction="none" eager>
              <div className="mb-2 text-sm text-muted-foreground">
                <a href="/products" className="hover:underline">
                  Products
                </a>{" "}
                / {product.category}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {product.shortDescription}
              </p>
              <div className="mt-6 flex gap-3">
                <Button asChild>
                  <a
                    href="https://wa.me/8801841111625"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Request a Quote
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal
              className="relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted"
              direction="none"
              delay={0.05}
              eager
            >
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </Reveal>
          </div>
        </div>
      </div>
      <ProductSpecs2 title="Specifications" specGroups={product.specGroups} />
    </div>
  );
}
