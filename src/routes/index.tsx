import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Brain, Target, ArrowRight } from "lucide-react";
import { Nav, scrollToSection, sections } from "@/components/portfolio/Nav";
import freshnestShot from "@/assets/freshnest-screenshot.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muneeb Ullah Khan — Web Developer | Client Acquisition | Aspiring AI Professional" },
      {
        name: "description",
        content:
          "Portfolio of Muneeb Ullah Khan: web development, client acquisition, and a growing interest in artificial intelligence.",
      },
      {
        property: "og:title",
        content: "Muneeb Ullah Khan — Web Developer | Client Acquisition | Aspiring AI Professional",
      },
      {
        property: "og:description",
        content:
          "Building websites, developing client acquisition skills, and learning about artificial intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const focusAreas = [
  { icon: Code2, title: "Web Development", body: "Creating responsive websites and landing pages." },
  {
    icon: Target,
    title: "Client Acquisition & Lead Generation",
    body: "Researching potential clients and developing personalised outreach strategies.",
  },
  {
    icon: Brain,
    title: "Aspiring AI Professional",
    body: "Learning AI concepts and exploring their practical applications — presented here as a learning interest, not an established service.",
  },
];

const planned = ["E-commerce Store", "Restaurant Website", "Marketing Agency Website"];

function HeroVisual() {
  const steps = ["Research", "Outreach", "Connect"];
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md">
      <div className="rounded-xl border border-navy-line bg-navy p-4 shadow-soft">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-navy-line" />
          <span className="h-2 w-2 rounded-full bg-navy-line" />
          <span className="h-2 w-2 rounded-full bg-navy-line" />
        </div>
        <div className="mt-4 h-3 w-2/3 rounded bg-navy-line" />
        <div className="mt-2 h-3 w-1/2 rounded bg-navy-line" />
        <div className="mt-3 h-6 w-24 rounded bg-primary" />
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-md border border-navy-line" />
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span className="flex-1 rounded-md border border-navy-line px-2 py-2 text-center text-xs font-medium text-navy-muted">
              {s}
            </span>
            {i < steps.length - 1 && <span className="h-px w-4 bg-teal-light" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  return (
    <div className="theme-portfolio min-h-screen overflow-x-hidden">
      <Nav />

      <section id="home" className="scroll-mt-14 bg-navy px-6 py-20 text-navy-foreground md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="reveal text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">
              Web Development · AI &amp; Automation
            </p>
            <h1 className="reveal mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              Thoughtful websites. Practical AI solutions.
            </h1>
            <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-navy-muted">
              I&rsquo;m Muneeb Ullah Khan, developing websites, exploring AI-powered workflows, and building
              practical skills in client acquisition.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-foreground"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="inline-flex items-center rounded-lg border border-navy-line px-6 py-3 text-sm font-semibold transition-colors hover:border-navy-muted"
              >
                About Me
              </button>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section id="about" className="scroll-mt-14 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="About" title="A practical approach to learning" />
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&rsquo;m interested in how websites, AI and automation can make everyday business tasks
              simpler. I learn by building real projects &mdash; structuring layouts, writing clear
              content, and checking how pages work on phones and large screens.
            </p>
            <p>
              I&rsquo;m also exploring AI integrations and automated workflows, and studying lead
              generation: understanding which businesses need a stronger online presence and how to
              reach them with relevant, personal outreach. This site documents that work as it develops.
            </p>
          </div>
        </div>
      </section>

      <section id="expertise" className="scroll-mt-14 border-t px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Expertise" title="Areas of focus" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {focusAreas.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-xl border bg-card p-7 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-14 border-t px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Projects" title="Selected projects" />
          <article className="mt-12 grid overflow-hidden rounded-xl border bg-card shadow-soft md:grid-cols-2">
            <div className="border-b bg-muted md:border-b-0 md:border-r">
              <img
                src={freshnestShot}
                alt="Screenshot of the FreshNest Cleaning concept website homepage"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                Concept Project
              </span>
              <h3 className="mt-5 text-2xl font-bold">FreshNest Cleaning</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                A service-business website concept presenting cleaning services and a quotation-request
                interface.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                The quote form is demo-only: no information is sent or stored.
              </p>
              <Link
                to="/freshnest"
                className="group mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-foreground"
              >
                View Live Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {planned.map((t) => (
              <article key={t} className="rounded-xl border border-dashed bg-card p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Planned</span>
                <h3 className="mt-3 font-semibold">{t}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-14 border-t px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Get in touch</h2>
          <p className="mt-6 text-lg text-muted-foreground">Contact details will be added soon.</p>
        </div>
      </section>

      <footer className="bg-navy px-6 py-10 text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <p className="font-display font-semibold">Muneeb Ullah Khan</p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {sections.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="text-sm text-navy-muted transition-colors hover:text-navy-foreground"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
