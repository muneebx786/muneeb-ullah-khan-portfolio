import { createFileRoute } from "@tanstack/react-router";
import { Code2, Bot, Target, ArrowRight } from "lucide-react";
import { Nav, scrollToSection } from "@/components/portfolio/Nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muneeb Ullah Khan — Web Development, AI & Client Acquisition" },
      {
        name: "description",
        content:
          "Portfolio of Muneeb Ullah Khan: web development, AI automation, and client acquisition and lead generation.",
      },
      {
        property: "og:title",
        content: "Muneeb Ullah Khan — Web Development, AI & Client Acquisition",
      },
      {
        property: "og:description",
        content:
          "Building practical skills in web development, exploring AI automation, and developing client acquisition strategies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const focusAreas = [
  {
    icon: Code2,
    title: "Web Development",
    body: "Building responsive websites and landing pages.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    body: "Exploring AI integrations and workflows that simplify repetitive tasks.",
  },
  {
    icon: Target,
    title: "Client Acquisition & Lead Generation",
    body: "Researching prospects and developing personalised outreach strategies.",
  },
];

const projects = [
  {
    title: "Service Business Website",
    body: "A planned multi-section website for a local service business, focused on clear structure and responsive layout.",
  },
  {
    title: "Lead Inquiry Automation",
    body: "A planned workflow that routes and organises incoming inquiries automatically.",
  },
  {
    title: "AI Project Demo",
    body: "A planned demo exploring how an AI integration can handle a repetitive task.",
  },
  {
    title: "Lead Research & Outreach Case Study",
    body: "A planned write-up documenting prospect research and a personalised outreach approach.",
  },
];

const footerLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "focus", label: "Areas of Focus" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Home */}
      <section id="home" className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-36 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent blur-3xl opacity-60"
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Muneeb Ullah Khan
          </p>
          <h1 className="reveal mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Web Development, <span className="text-gradient-accent">AI</span> & Client Acquisition
          </h1>
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I&rsquo;m building practical skills in web development, exploring AI automation, and
            developing strategies to help businesses connect with potential clients.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center rounded-lg border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              About Me
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t bg-surface px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,1fr)_1.4fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">About Me</h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I learn best by working on real, practical projects. Right now that means building
              websites and landing pages from scratch, improving how I structure layouts, and paying
              attention to how a page reads on both a phone and a large screen.
            </p>
            <p>
              Alongside that, I&rsquo;m exploring AI technologies and automation &mdash; testing how
              tools and integrations can take over repetitive steps in a workflow instead of doing
              them manually.
            </p>
            <p>
              I also spend time researching potential clients: understanding what kind of businesses
              need a better online presence, and how to reach them with a message that is relevant
              rather than generic. This site is where I&rsquo;ll document that work as it takes
              shape.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Focus */}
      <section id="focus" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold md:text-4xl">Areas of Focus</h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {focusAreas.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t bg-surface px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold md:text-4xl">Projects</h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            These are planned portfolio projects &mdash; none of them are finished yet. Each card
            describes what I intend to build, and I&rsquo;ll replace it with the real work once
            it&rsquo;s done.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-dashed bg-background/60 p-8 transition-colors hover:border-primary/40"
              >
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Coming Soon
                </span>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Contact</h2>
          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-primary" />
          <p className="mt-8 text-lg text-muted-foreground">
            Contact details will be added soon.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-base font-semibold">Muneeb Ullah Khan</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
