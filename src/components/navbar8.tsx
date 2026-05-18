"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url?: string;
  className?: string;
  links?: {
    label: string;
    description?: string;
    url: string;
    image?: string;
  }[];
}

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
  pathname: string;
}

const LOGO = {
  url: "/",
  src: "/logo.svg",
  alt: "Heritage Jute Fibers",
};

const NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    url: "/products",
    links: [
      {
        label: "Raw Materials",
        description: "Raw jute, jute sliver, and cut jute fiber in multiple grades.",
        url: "/products/raw-jute",
        image: "/images/gallery/Raw-Jute.webp",
      },
      {
        label: "Yarn",
        description: "Single and multi-ply jute yarn, 8–96 lbs count, natural or dyed.",
        url: "/products/jute-yarn",
        image: "/images/gallery/Jute-Yarn.webp",
      },
      {
        label: "Fabrics & Cloth",
        description: "Hessian and sacking cloth, 24–52 inch widths, 200–305 GSM.",
        url: "/products/hessian-cloth",
        image: "/images/gallery/Hessian-Cloth-scaled.webp",
      },
      {
        label: "Bags & Packaging",
        description: "Hessian bags, sacking sacks, and custom jute bags for bulk goods.",
        url: "/products/jute-bag",
        image: "/images/gallery/high-view-coffee-beans-burlap-sack-1-scaled.webp",
      },
      {
        label: "Rope & Twine",
        description: "Jute rope 6–42 mm and twine for packaging, tying, and gardening.",
        url: "/products/jute-rope",
        image: "/images/gallery/Jute-Ropes.webp",
      },
    ],
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];

const MOBILE_NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    className: "col-span-2",
    links: [
      { label: "Raw Materials", url: "/products/raw-jute" },
      { label: "Yarn", url: "/products/jute-yarn" },
      { label: "Fabrics & Cloth", url: "/products/hessian-cloth" },
      { label: "Bags & Packaging", url: "/products/jute-bag" },
      { label: "Rope & Twine", url: "/products/jute-rope" },
    ],
  },
  {
    title: "Company",
    className: "",
    links: [
      { label: "About Us", url: "/about" },
      { label: "Certifications", url: "/about#certifications" },
      { label: "Contact", url: "/contact" },
    ],
  },
];

const NAV_BUTTONS: {
  label: string;
  url: string;
  variant:
    | "ghost"
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary";
}[] = [
  {
    label: "WhatsApp",
    url: "https://wa.me/8801841111625",
    variant: "default",
  },
];

const SOCIAL_LINKS: { label: string; url: string }[] = [];

const MOBILE_BREAKPOINT = 1024;

interface Navbar8Props {
  className?: string;
}

const Navbar8 = ({ className }: Navbar8Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
  };

  return (
    <section className={cn("", className)}>
      <div className="fixed top-0 z-500 w-full bg-background border-b">
        <div className="container">
          <div className="flex items-center justify-between gap-3.5 py-5">
            <a href={LOGO.url} className="flex items-center">
              <img
                src={LOGO.src}
                alt={LOGO.alt}
                width={1500}
                height={200}
                className="h-11 w-auto sm:h-12"
              />
            </a>
            <NavigationMenu className="hidden lg:flex [&>div:nth-child(2)]:left-1/2 [&>div:nth-child(2)]:-translate-x-1/2">
              <NavigationMenuList>
                {NAVIGATION.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                    pathname={pathname}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3.5">
              {NAV_BUTTONS.map((button, index) => (
                <Button
                  key={`nav-button-${index}`}
                  variant={button.variant}
                  asChild
                >
                  <a href={button.url}>{button.label}</a>
                </Button>
              ))}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={handleMobileMenu}>
                  <Menu className="size-5.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigationMenu open={open} setOpen={setOpen} />
    </section>
  );
};

const DesktopMenuItem = ({ item, index, pathname }: DesktopMenuItemProps) => {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const productsActive =
    item.links !== undefined && pathname.startsWith("/products");

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    if (item.links && imagesRef.current[index]) {
      imagesRef.current.forEach((img, i) => {
        img.classList.toggle("opacity-100", i === index);
        img.classList.toggle("opacity-0", i !== index);
      });
    }
  };

  const handleMouseLeave = () => {
    imagesRef.current.forEach((img) => {
      img.classList.remove("opacity-100");
      img.classList.add("opacity-0");
    });
    imagesRef.current[0].classList.add("opacity-100");
  };

  if (item.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="relative bg-transparent">
          <span className="relative z-10">{item.title}</span>
          {productsActive && (
            <motion.span
              layoutId="nav-indicator"
              className="pointer-events-none absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-2xl !p-0">
          <div className="grid min-h-[18.75rem] w-[45.25rem] grid-cols-[22.5rem_1fr] gap-4 p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              {item.links.map((link, index) => (
                <Image
                  key={index}
                  ref={(el) => {
                    if (el) {
                      imagesRef.current[index] = el as unknown as HTMLImageElement;
                    }
                  }}
                  src={link.image!}
                  alt={link.label}
                  width={360}
                  height={360}
                  sizes="360px"
                  loading="lazy"
                  className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${index === 0 ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div>
              <div className="p-4 leading-normal">
                {item.url ? (
                  <a
                    href={item.url}
                    className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80"
                  >
                    <span className="font-bold">{item.title}</span>
                    <span className="text-muted-foreground" aria-hidden="true">
                      •
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      See All →
                    </span>
                  </a>
                ) : (
                  <span className="font-bold">{item.title}</span>
                )}
              </div>
              <ul>
                {item.links.map((link, index) => (
                  <li key={`desktop-nav-sublink-${index}`}>
                    <a
                      href={link.url}
                      className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-muted"
                      data-index={index}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div>
                        <h3 className="leading-normal font-medium">
                          {link.label}
                        </h3>
                        <p className="leading-normal text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  const linkActive =
    item.url !== undefined &&
    (pathname === item.url ||
      (item.url !== "/" && pathname.startsWith(`${item.url}/`)));

  return (
    <NavigationMenuItem
      key={`desktop-menu-item-${index}`}
      value={`${index}`}
      className={`${navigationMenuTriggerStyle()} bg-transparent`}
    >
      <NavigationMenuLink
        href={item.url!}
        className="relative flex h-full w-full items-center justify-center px-4 py-2"
      >
        <span className="relative z-10">{item.title}</span>
        {linkActive && (
          <motion.span
            layoutId="nav-indicator"
            className="pointer-events-none absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MobileNavigationMenu = ({ open, setOpen }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="inset-0 z-600 h-dvh w-full bg-primary text-primary-foreground [&>button]:hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container pb-12">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex justify-end pt-5">
              <SheetClose asChild>
                <Button
                  size="icon"
                  className="size-9 rounded-full bg-muted/20 hover:bg-muted/20"
                >
                  <X className="size-5.5" />
                </Button>
              </SheetClose>
            </div>
            <div className="flex h-full flex-col justify-between gap-30 pt-24">
              <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10">
                {MOBILE_NAVIGATION.map((item, index) =>
                  renderMobileMenuItem(item, index),
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <div className="text-xs text-primary-foreground/70 uppercase">
                  SOCIAL
                </div>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link, index) => (
                    <a
                      key={`social-link-${index}`}
                      href={link.url}
                      className="text-primary-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  return (
    <div
      className={`flex flex-col gap-4 text-primary-foreground ${item.className}`}
      key={`mobile-menu-item-${index}`}
    >
      <div className="text-xs text-primary-foreground/70 uppercase">
        {item.title}
      </div>
      <ul className="flex flex-col gap-3">
        {item.links?.map((link, i) => (
          <li key={`mobile-nav-link-${i}`}>
            <a
              href={link.url}
              className={`text-primary-foreground ${index === 0 ? "text-2xl" : "text-base"} leading-normal font-medium`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Navbar8 };
