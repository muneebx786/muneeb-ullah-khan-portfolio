import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  SprayCan,
  Home,
  Truck,
  ClipboardList,
  FileText,
  CalendarCheck,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import heroImage from "@/assets/freshnest-hero.jpg";

export const Route = createFileRoute("/freshnest")({
  head: () => ({
    meta: [
      { title: "FreshNest Cleaning — Concept Website | Muneeb Ullah Khan" },
      {
        name: "description",
        content:
          "A concept home-cleaning website built as a portfolio demonstration: services, how it works, FAQs and a demo quote request form.",
      },
      { property: "og:title", content: "FreshNest Cleaning — Concept Website" },
      {
        property: "og:description",
        content:
          "Fictional home-cleaning business website designed and built by Muneeb Ullah Khan as a portfolio concept project.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/freshnest" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/freshnest" }],
  }),
  component: FreshNestPage,
});

const navLinks = [
  { id: "services", label: "Services" },
  { id: "how-it-works", label: "How It Works" },
  { id: "faqs", label: "FAQs" },
  { id: "quote", label: "Request a Quote" },
];

const services = [
  {
    icon: Home,
    title: "Regular Home Cleaning",
    body: "A recurring visit that keeps the everyday areas in order.",
    items: [
      "Dusting surfaces, shelves and skirting",
      "Kitchen counters, sink and appliance exteriors",
      "Bathroom sanitising: basin, toilet, shower and mirrors",
      "Vacuuming and mopping all floors",
      "Emptying bins and a general tidy-up",
    ],
  },
  {
    icon: SprayCan,
    title: "Deep Cleaning",
    body: "A detailed top-to-bottom clean for the areas routine visits skim over.",
    items: [
      "Inside the oven, fridge and microwave",
      "Tile grout, tap limescale and shower screens",
      "Cupboard fronts, door frames and light switches",
      "Behind and underneath movable furniture",
      "Window interiors, sills and tracks",
    ],
  },
  {
    icon: Truck,
    title: "Move-In / Move-Out Cleaning",
    body: "An empty-property clean, ready for handover or your first night in.",
    items: [
      "Cupboards and wardrobes cleaned inside and out",
      "Full kitchen and bathroom degrease and sanitise",
      "Walls spot-cleaned, marks and scuffs addressed",
      "Floors throughout vacuumed and washed",
      "Final walk-through check before we leave",
    ],
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us what you need",
    body: "Share your property size, the type of clean you are after, and anything needing extra attention.",
  },
  {
    icon: FileText,
    title: "Receive a personalised quote",
    body: "We review the details and come back with a quote matched to the scope of the work.",
  },
  {
    icon: CalendarCheck,
    title: "Choose your cleaning appointment",
    body: "Pick a date and time that suits your week, and confirm when you are happy with it.",
  },
];

const faqs = [
  {
    q: "Do you bring your own cleaning supplies?",
    a: "In this concept, FreshNest arrives with all equipment and products included, with fragrance-free and plant-based options available on request if a household prefers them.",
  },
  {
    q: "How do I book a clean?",
    a: "You would send your details through the quote request form, receive a personalised quote, then confirm a date and time that works for you.",
  },
  {
    q: "What is the difference between a regular and a deep clean?",
    a: "A regular clean maintains the spaces you use daily. A deep clean goes further into the detail work — inside appliances, grout, cupboard interiors and the areas behind furniture.",
  },
  {
    q: "Can I combine different cleaning types?",
    a: "Yes. A common pattern would be starting with a one-off deep clean, then continuing with regular visits to keep the home in that condition.",
  },
  {
    q: "What if I need to change or cancel an appointment?",
    a: "Appointments would be rescheduled by contacting the team ahead of the booked slot. The exact notice period would be set out by the business.",
  },
];

const serviceTypes = [
  "Regular Home Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Not sure yet",
];

const propertySizes = [
  "Studio / 1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4 bedrooms",
  "5+ bedrooms",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function FreshNestNav() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("top")}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          FreshNest Cleaning
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.slice(0, 3).map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("quote")}
            className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Request a Quote
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="freshnest-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="freshnest-mobile-menu"
          className="border-t bg-background px-6 pb-5 pt-2 md:hidden"
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full rounded-lg px-3 py-3 text-left text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-base font-semibold tracking-normal"
        >
          {q}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>
      {open && <p className="pb-6 pr-10 leading-relaxed text-muted-foreground">{a}</p>}
    </div>
  );
}

type FormState = {
  name: string;
  email: string;
  serviceType: string;
  propertySize: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  serviceType: "",
  propertySize: "",
  message: "",
};

function QuoteForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) next.name = "Please enter your name.";
    else if (name.length > 100) next.name = "Please keep this under 100 characters.";

    if (!email) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Please enter a valid email address.";
    else if (email.length > 255) next.email = "Please keep this under 255 characters.";

    if (!form.serviceType) next.serviceType = "Please choose a service type.";
    if (!form.propertySize) next.propertySize = "Please choose a property size.";

    if (!message) next.message = "Please add a short message.";
    else if (message.length > 1000) next.message = "Please keep this under 1000 characters.";

    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center shadow-soft">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <p className="mt-6 text-xl font-semibold">
          Demo complete. A real website would now send this inquiry to the business.
        </p>
        <p className="mt-3 text-muted-foreground">
          Nothing was sent or saved &mdash; this form exists to demonstrate the flow.
        </p>
        <button
          onClick={() => {
            setForm(emptyForm);
            setErrors({});
            setDone(false);
          }}
          className="mt-8 inline-flex items-center rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Try the demo again
        </button>
      </div>
    );
  }

  const fieldClass = (key: keyof FormState) =>
    `mt-2 w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25 ${
      errors[key] ? "border-destructive" : ""
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-card p-6 md:p-10">
      <p className="rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground">
        Portfolio demo: no information is sent or stored. Please use sample details.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="fn-name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="fn-name"
            value={form.name}
            maxLength={120}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Sample Name"
            aria-invalid={!!errors.name}
            className={fieldClass("name")}
          />
          {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="fn-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="fn-email"
            type="email"
            value={form.email}
            maxLength={260}
            onChange={(e) => set("email", e.target.value)}
            placeholder="sample@example.com"
            aria-invalid={!!errors.email}
            className={fieldClass("email")}
          />
          {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="fn-service" className="text-sm font-semibold">
            Service type
          </label>
          <select
            id="fn-service"
            value={form.serviceType}
            onChange={(e) => set("serviceType", e.target.value)}
            aria-invalid={!!errors.serviceType}
            className={fieldClass("serviceType")}
          >
            <option value="">Select a service</option>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="mt-2 text-sm text-destructive">{errors.serviceType}</p>
          )}
        </div>

        <div>
          <label htmlFor="fn-size" className="text-sm font-semibold">
            Property size
          </label>
          <select
            id="fn-size"
            value={form.propertySize}
            onChange={(e) => set("propertySize", e.target.value)}
            aria-invalid={!!errors.propertySize}
            className={fieldClass("propertySize")}
          >
            <option value="">Select a size</option>
            {propertySizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.propertySize && (
            <p className="mt-2 text-sm text-destructive">{errors.propertySize}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="fn-message" className="text-sm font-semibold">
            Message
          </label>
          <textarea
            id="fn-message"
            rows={5}
            value={form.message}
            maxLength={1000}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us what the home needs and any areas to focus on."
            aria-invalid={!!errors.message}
            className={fieldClass("message")}
          />
          {errors.message && <p className="mt-2 text-sm text-destructive">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:w-auto"
      >
        Request a Quote
      </button>
    </form>
  );
}

function FreshNestPage() {
  return (
    <div className="theme-freshnest min-h-screen font-sans" id="top">
      <div className="border-b bg-surface px-6 py-2.5">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-xs text-muted-foreground sm:text-sm">
          <span>Concept project &mdash; fictional business, built for portfolio demonstration.</span>
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to portfolio
          </Link>
        </div>
      </div>

      <FreshNestNav />

      {/* Hero */}
      <section className="px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              Home cleaning
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              A cleaner home. More time for you.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              FreshNest handles the regular upkeep, the detailed deep cleans and the empty-property
              turnarounds &mdash; with the supplies, the checklist and the careful finish all
              included. You tell us what the home needs, and we take it from there.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("quote")}
                className="rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Request a Quote
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="rounded-lg border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                See services
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="A bright, freshly cleaned living room with natural light and plants"
              width={1536}
              height={1024}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 border-t bg-surface px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold md:text-4xl">Services</h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Three ways to work with us, each with a clear scope so you know exactly what is covered.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map(({ icon: Icon, title, body, items }) => (
              <article
                key={title}
                className="flex flex-col rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
                <ul className="mt-6 space-y-3 border-t pt-6">
                  {items.map((i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{i}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <article key={title} className="rounded-2xl border bg-card p-8">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl font-bold text-accent">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="scroll-mt-24 border-t bg-surface px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">FAQs</h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          <p className="mt-6 leading-relaxed text-muted-foreground">
            These answers are illustrative sample content written for a fictional business. They
            describe how FreshNest would work, not the policies of a real cleaning company.
          </p>
          <div className="mt-10 rounded-2xl border bg-card px-6 md:px-8">
            {faqs.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="scroll-mt-24 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">Request a Quote</h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Share a few details about the home and the kind of clean you need.
          </p>
          <div className="mt-10">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-surface px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="flex items-center gap-2 font-display text-base font-bold">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </span>
                FreshNest Cleaning
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                FreshNest Cleaning is a fictional business created for portfolio demonstration.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Concept website designed by Muneeb Ullah Khan.</p>
            <Link to="/" className="font-semibold text-primary hover:underline">
              Back to portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
