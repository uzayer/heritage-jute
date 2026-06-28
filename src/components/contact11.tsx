"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  GlobeIcon,
  LoaderIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

interface ContactFormDetailsProps {
  title: string;
  description: string;
  phone: string;
  email: string;
  web: { label: string; url: string };
  formHeading: string;
  corporateHeading: string;
  addressLine1: string;
  addressLine2: string;
  contactHeading: string;
  socialHeading: string;
  socialLinks: {
    network: "facebook" | "twitter" | "linkedin";
    url: string;
  }[];
  successMessage: string;
  submitLabel: string;
  submittingLabel: string;
  className?: string;
}

interface Contact11Props extends ContactFormDetailsProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}
type Props = Partial<Contact11Props>;

const defaultProps: Contact11Props = {
  title: "Contact Us",
  description:
    "Building with shadcn/ui and Tailwind? Ask us about blocks, components, or copy-paste sections—we read every message.",
  phone: "+1 (555) 010-2400",
  email: "hello@shadcnblocks.com",
  web: {
    label: "shadcnblocks.com",
    url: "https://www.shadcnblocks.com",
  },
  corporateHeading: "Corporate office",
  addressLine1: "1200 Framework Boulevard",
  addressLine2: "San Francisco, CA 94102, United States",
  contactHeading: "Get in touch",
  socialHeading: "Follow us",
  socialLinks: [
    { network: "facebook", url: "https://www.facebook.com" },
    { network: "twitter", url: "https://x.com" },
    { network: "linkedin", url: "https://www.linkedin.com" },
  ],
  formHeading: "Inquiries",
  successMessage: "Thanks — we will get back to you shortly.",
  submitLabel: "Send message",
  submittingLabel: "Sending…",
};

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  company: z.string().optional(),
  employees: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XTwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SOCIAL_ICON = {
  facebook: FacebookIcon,
  twitter: XTwitterIcon,
  linkedin: LinkedInIcon,
} as const;

const SOCIAL_LABEL: Record<
  ContactFormDetailsProps["socialLinks"][number]["network"],
  string
> = {
  facebook: "Facebook",
  twitter: "X",
  linkedin: "LinkedIn",
};

const Contact11 = (props: Props) => {
  const {
    title,
    description,
    corporateHeading,
    addressLine1,
    addressLine2,
    phone,
    email,
    web,
    contactHeading,
    socialHeading,
    socialLinks,
    formHeading,
    successMessage,
    submitLabel,
    submittingLabel,
    className,
    onSubmit,
  } = { ...defaultProps, ...props };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      employees: "",
      message: "",
    },
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log("Form submitted:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSubmitted(true);
      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 4500);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-col gap-4 text-left" direction="none">
            <h1 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground lg:text-xl lg:text-balance">
              {description}
            </p>
          </Reveal>

          <div className="mt-10 flex gap-10 max-md:flex-col md:mt-16 md:gap-0 md:divide-x md:divide-border">
            <div className="space-y-10 md:pr-10">
              <Reveal direction="none" delay={0.05}>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-balance">
                    {corporateHeading}
                  </h2>
                  <p className="mt-3 font-medium tracking-tight text-muted-foreground">
                    {addressLine1}
                    <br />
                    {addressLine2}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-balance">
                    {contactHeading}
                  </h2>
                  <div className="mt-3 flex flex-col gap-6">
                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center gap-3 font-medium tracking-tight text-muted-foreground hover:text-foreground"
                    >
                      <PhoneIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="group-hover:underline">{phone}</span>
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-center gap-3 font-medium tracking-tight text-muted-foreground hover:text-foreground"
                    >
                      <MailIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="group-hover:underline">{email}</span>
                    </a>
                    <a
                      href={web.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${web.label} (opens in new tab)`}
                      className="group flex items-center gap-3 font-medium tracking-tight text-muted-foreground hover:text-foreground"
                    >
                      <GlobeIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="group-hover:underline">{web.label}</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-balance">
                    {socialHeading}
                  </h2>
                  <div className="mt-3 flex gap-6">
                    {socialLinks.map((link) => {
                      const Icon = SOCIAL_ICON[link.network];
                      return (
                        <a
                          key={`${link.network}-${link.url}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${SOCIAL_LABEL[link.network]} (opens in new tab)`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Icon className="size-6" aria-hidden />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex-1 md:pl-10">
              <Reveal direction="none" delay={0.05}>
                <h2 className="text-lg font-semibold tracking-tight text-balance">
                  {formHeading}
                </h2>
              </Reveal>

              {isSubmitted && (
                <div
                  className={cn(
                    "mt-5 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center transition-opacity duration-500",
                    showSuccess ? "opacity-100" : "opacity-0",
                  )}
                >
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {successMessage}
                  </p>
                </div>
              )}

              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="mt-5"
              >
                <FieldGroup className="gap-6">
                  <Controller
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Full name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Jordan Rivera"
                          className="bg-background"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Work email address{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="you@company.com"
                          className="bg-background"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Company name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="Optional"
                          className="bg-background"
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="employees"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Number of employees
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="e.g. 10–50"
                          className="bg-background"
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Your message{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Tell us what you are building…"
                          className="min-h-[120px] resize-none bg-background"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {form.formState.errors.root && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <LoaderIcon
                          className="size-4 animate-spin"
                          aria-hidden
                        />
                      ) : null}
                      {form.formState.isSubmitting
                        ? submittingLabel
                        : submitLabel}
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact11 };
