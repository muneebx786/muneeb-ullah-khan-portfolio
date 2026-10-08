import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Plus, Check, Asterisk } from "lucide-react";
import "@/components/agency/agency.css";

export const Route = createFileRoute("/agency")({
  head: () => ({
    meta: [
      { title: "FORM & FIELD — Creative Agency Concept | Muneeb Ullah Khan" },
      {
        name: "description",
        content:
          "A fictional creative marketing agency concept with service exploration, sample project briefs and an interactive inquiry demo.",
      },
    ],
  }),
  component: Agency,
});
const services = [
  {
    title: "Brand strategy",
    text: "Find the idea that makes a brand distinct, then give it a voice people understand.",
    items: [
      "Positioning & audience research",
      "Messaging & tone of voice",
      "Visual identity direction",
    ],
  },
  {
    title: "Digital experiences",
    text: "Turn a first impression into an intuitive journey, from landing page to next step.",
    items: ["Website design & development", "Landing page concepts", "Responsive interface design"],
  },
  {
    title: "Content & campaigns",
    text: "Build a consistent story across the places where a brand meets its audience.",
    items: ["Campaign creative direction", "Social content concepts", "Editorial planning"],
  },
];
const projects = [
  {
    name: "OLIO",
    category: "Branding",
    tone: "olive",
    subtitle: "Everyday essentials. A fresh perspective.",
    brief: "Imagine a considered identity for a fictional botanical personal-care brand.",
    approach:
      "Pair an earthy palette with confident typography and a simple packaging system that feels calm and approachable.",
    deliverables:
      "Visual identity concept, packaging mockup, colour palette and typography direction.",
  },
  {
    name: "KINETIC",
    category: "Web Design",
    tone: "orange",
    subtitle: "A digital home for a life in motion.",
    brief: "Create a clear website direction for a fictional independent movement studio.",
    approach:
      "Use bold editorial type, a simple class-discovery journey and a strong next-step button to guide the visitor.",
    deliverables: "Homepage concept, responsive layout direction and class-discovery interface.",
  },
  {
    name: "OFFSCRIPT",
    category: "Campaigns",
    tone: "purple",
    subtitle: "An invitation to do things differently.",
    brief: "Develop a launch campaign direction for a fictional creative community event.",
    approach:
      "Build a modular poster system using expressive type, a recognisable colour palette and short, memorable messages.",
    deliverables: "Campaign concept, poster system and sample social creative.",
  },
];
const filters = ["All", "Branding", "Web Design", "Campaigns"];
const budgets = ["Exploring options", "Under PKR 100,000", "PKR 100,000–250,000", "PKR 250,000+"];
const initial = { name: "", email: "", service: "", budget: "", message: "", consent: false };
type Values = typeof initial;
const faqs = [
  [
    "Is FORM & FIELD a real agency?",
    "No. FORM & FIELD is a fictional agency created as a portfolio project by Muneeb Ullah Khan. Its brands, project briefs and visual concepts are illustrative.",
  ],
  [
    "Can I send an actual project inquiry here?",
    "This form is an interactive demo. Nothing is sent or stored. For a real inquiry, use Back to Portfolio and the contact links on Muneeb's main website.",
  ],
  [
    "Are these real client projects?",
    "No. OLIO, KINETIC and OFFSCRIPT are self-initiated fictional concepts. They demonstrate visual direction and design thinking, not client results.",
  ],
  [
    "What happens when I complete the form?",
    "The page checks your sample details and shows a demo summary. No email is sent, no booking is made and no payment is collected. Your entries disappear when you leave or refresh the page.",
  ],
];
function ProjectArt({ tone, name }: { tone: string; name: string }) {
  return (
    <div className={`ff-art ff-art-${tone}`} aria-hidden="true">
      {tone === "olive" ? (
        <>
          <span className="ff-art-label">A little care. Every day.</span>
          <div className="ff-bottle">
            <span>
              {name.toLowerCase()}
              <small>
                BOTANICAL WASH
                <br />A DAILY RITUAL / 250 ML
              </small>
            </span>
          </div>
          <div className="ff-orbit" />
          <span className="ff-art-bottom">NATURE, IN GOOD FORM.</span>
        </>
      ) : tone === "orange" ? (
        <>
          <div className="ff-browser">
            <div className="ff-browser-top">
              <b>kinetic®</b>
              <span>MOVE WITH PURPOSE ↗</span>
            </div>
            <strong>
              Find your
              <br />
              <i>own rhythm.</i>
            </strong>
            <div className="ff-motion">
              <span />
              <span />
              <span />
            </div>
            <span className="ff-mini-cta">Explore the studio ↗</span>
          </div>
        </>
      ) : (
        <>
          <div className="ff-poster">
            <span>AN EXPERIMENT IN CONNECTION</span>
            <strong>
              OFF
              <br />
              SCRIPT<span>↗</span>
            </strong>
            <small>
              MAKE SPACE FOR
              <br />A DIFFERENT PERSPECTIVE.
            </small>
          </div>
          <span className="ff-poster-sticker">
            NEW
            <br />
            IDEAS
            <br />
            WELCOME
          </span>
        </>
      )}
    </div>
  );
}
function Agency() {
  const [mobile, setMobile] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState<{ service: string; budget: string } | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);
  const change = (key: keyof Values, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof Values, string>> = {};
    if (!form.name.trim()) next.name = "Enter a sample name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid sample email.";
    if (!services.some((s) => s.title === form.service)) next.service = "Choose a service.";
    if (form.budget && !budgets.includes(form.budget))
      next.budget = "Choose one of the sample budget ranges.";
    if (form.message.trim().length < 20)
      next.message = "Add at least 20 characters about your sample project.";
    if (!form.consent) next.consent = "Please acknowledge that this is a demo.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`ff-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setDone({ service: form.service, budget: form.budget || "Not specified" });
    setForm(initial);
  }
  const error = (key: keyof Values) =>
    errors[key] ? (
      <span id={`ff-${key}-error`} className="ff-error">
        {errors[key]}
      </span>
    ) : null;
  const field = (key: keyof Values) => ({
    id: `ff-${key}`,
    name: key,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `ff-${key}-error` : undefined,
  });
  return (
    <div className="ff-page">
      <a href="#ff-main" className="ff-skip">
        Skip to content
      </a>
      <div className="ff-concept-bar">
        <span>FICTIONAL AGENCY · PORTFOLIO CONCEPT</span>
        <Link to="/">
          <ArrowLeft size={12} /> Back to Portfolio
        </Link>
      </div>
      <header className="ff-header ff-wrap">
        <a className="ff-logo" href="#ff-main" aria-label="Form and Field home">
          FORM<span>&</span>FIELD
          <Asterisk size={29} />
        </a>
        <button
          ref={menuRef}
          className="ff-menu-toggle"
          onClick={() => setMobile(!mobile)}
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
          aria-controls="ff-nav"
        >
          {mobile ? <X /> : <Menu />}
        </button>
        <nav
          id="ff-nav"
          className={mobile ? "ff-nav is-open" : "ff-nav"}
          aria-label="Agency navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMobile(false);
              menuRef.current?.focus();
            }
          }}
        >
          {[
            ["work", "Selected work"],
            ["services", "Services"],
            ["process", "Our process"],
            ["inquiry", "Let’s talk"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#ff-${id}`}
              onClick={() => setMobile(false)}
              className={id === "inquiry" ? "ff-nav-cta" : ""}
            >
              {label}
              {id === "inquiry" && <ArrowUpRight size={16} />}
            </a>
          ))}
        </nav>
      </header>
      <main id="ff-main">
        <section className="ff-hero ff-wrap">
          <div className="ff-hero-meta">
            <span>
              <i /> INDEPENDENT THINKING. CONNECTED DESIGN.
            </span>
            <span>STRATEGY / DESIGN / DIGITAL</span>
          </div>
          <h1>
            Good brands
            <br />
            deserve{" "}
            <span>
              bold ideas.
              <svg viewBox="0 0 650 25" aria-hidden="true">
                <path d="M5 18 Q290 -8 640 13" />
              </svg>
            </span>
          </h1>
          <div className="ff-hero-bottom">
            <p>
              A creative agency concept bringing clarity to brands, character to websites, and a
              little more intention to every interaction.
            </p>
            <a className="ff-button" href="#ff-work">
              Explore our work <ArrowUpRight size={22} />
            </a>
            <div className="ff-hero-mark" aria-hidden="true">
              <Asterisk size={110} strokeWidth={1.1} />
            </div>
          </div>
          <div className="ff-hero-showcase">
            <div className="ff-showcase-label">
              <span>
                IDEAS INTO
                <br />
                <b>EXPERIENCES.</b>
              </span>
              <small>THREE SELF-INITIATED CONCEPTS ↗</small>
            </div>
            <div className="ff-showcase-tile ff-showcase-olive">
              <span>olio.</span>
              <small>EVERYDAY, CONSIDERED.</small>
            </div>
            <div className="ff-showcase-tile ff-showcase-orange">
              <span>kinetic↗</span>
              <small>FIND YOUR OWN RHYTHM.</small>
            </div>
            <div className="ff-showcase-tile ff-showcase-purple">
              <span>
                OFF
                <br />
                SCRIPT
              </span>
              <small>A DIFFERENT PERSPECTIVE.</small>
            </div>
          </div>
        </section>
        <section id="ff-services" className="ff-section ff-wrap">
          <div className="ff-heading">
            <p className="ff-eyebrow">01 / WHAT WE EXPLORE</p>
            <div>
              <h2>
                Different disciplines.
                <br />
                <span>One clear direction.</span>
              </h2>
              <p>
                From the first question to the final detail, every touchpoint should feel like it
                belongs.
              </p>
            </div>
          </div>
          <div className="ff-services">
            {services.map((s, i) => (
              <article key={s.title}>
                <span className="ff-service-number">
                  0{i + 1}
                  <ArrowUpRight size={27} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#ff-inquiry" onClick={() => change("service", s.title)}>
                  Explore this service <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section id="ff-work" className="ff-work-section">
          <div className="ff-wrap ff-section">
            <div className="ff-heading">
              <p className="ff-eyebrow">02 / SELECTED CONCEPTS</p>
              <div>
                <h2>
                  Small details.
                  <br />
                  <span>Distinct personalities.</span>
                </h2>
                <p>
                  Fictional brands. Real attention to craft. These are design explorations, not
                  commissioned client work.
                </p>
              </div>
            </div>
            <div className="ff-filters" role="group" aria-label="Filter concept projects">
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                  {f}
                  <span>{f === "All" ? "03" : "01"}</span>
                </button>
              ))}
            </div>
            <p aria-live="polite" className="ff-sr">
              {filter === "All" ? 3 : 1} concept projects shown.
            </p>
            <div className="ff-project-grid">
              {projects
                .filter((p) => filter === "All" || p.category === filter)
                .map((project) => (
                  <Dialog.Root key={project.name}>
                    <Dialog.Trigger asChild>
                      <button className="ff-project" aria-label={`Explore ${project.name} concept`}>
                        <ProjectArt tone={project.tone} name={project.name} />
                        <div className="ff-project-caption">
                          <div>
                            <span>{project.category} · Concept project</span>
                            <h3>{project.name}</h3>
                            <p>{project.subtitle}</p>
                          </div>
                          <ArrowUpRight size={23} />
                        </div>
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="ff-dialog-overlay" />
                      <Dialog.Content className="ff-dialog">
                        <Dialog.Close
                          className="ff-dialog-close"
                          aria-label="Close project details"
                        >
                          <X />
                        </Dialog.Close>
                        <ProjectArt tone={project.tone} name={project.name} />
                        <div className="ff-dialog-copy">
                          <span className="ff-eyebrow">{project.category} / FICTIONAL CONCEPT</span>
                          <Dialog.Title>{project.name}</Dialog.Title>
                          <Dialog.Description>{project.subtitle}</Dialog.Description>
                          <h3>The brief</h3>
                          <p>{project.brief}</p>
                          <h3>The approach</h3>
                          <p>{project.approach}</p>
                          <h3>Concept deliverables</h3>
                          <p>{project.deliverables}</p>
                          <p className="ff-dialog-note">
                            Self-initiated portfolio exploration. No real client relationship or
                            performance results are claimed.
                          </p>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                ))}
            </div>
          </div>
        </section>
        <section id="ff-process" className="ff-section ff-wrap">
          <div className="ff-heading">
            <p className="ff-eyebrow">03 / THE WAY THROUGH</p>
            <div>
              <h2>
                Thoughtful from
                <br />
                <span>start to finish.</span>
              </h2>
              <p>
                A simple framework for turning an open question into a considered digital
                experience.
              </p>
            </div>
          </div>
          <div className="ff-process">
            {[
              [
                "Discover",
                "Ask the right questions. Understand the audience, the challenge and the direction.",
              ],
              [
                "Define",
                "Make the message clear. Shape a focused brief and a visual point of view.",
              ],
              [
                "Create",
                "Explore, design and build. Turn the direction into tangible, responsive experiences.",
              ],
              [
                "Refine",
                "Test the details. Improve clarity, accessibility and consistency before handoff.",
              ],
            ].map(([title, body], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="ff-about">
          <div className="ff-wrap">
            <Asterisk size={64} strokeWidth={1} />
            <p>
              Clarity before noise.
              <br />
              Character before convention.
              <br />
              <span>Purpose in every pixel.</span>
            </p>
            <div>
              <span className="ff-eyebrow">THE IDEA BEHIND FORM & FIELD</span>
              <p>
                A fictional studio built around a simple belief: thoughtful strategy and expressive
                design belong together. This portfolio concept explores how an agency can present
                its thinking with clarity and personality.
              </p>
            </div>
          </div>
        </section>
        <section className="ff-section ff-wrap ff-faq">
          <div>
            <p className="ff-eyebrow">04 / A FEW GOOD QUESTIONS</p>
            <h2>
              Before we
              <br />
              <span>get started.</span>
            </h2>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="ff-inquiry" className="ff-inquiry">
          <div className="ff-wrap ff-inquiry-grid">
            <div className="ff-inquiry-intro">
              <p className="ff-eyebrow">05 / LET’S EXPLORE AN IDEA</p>
              <h2>
                What are you
                <br />
                <span>imagining?</span>
                <ArrowUpRight size={56} />
              </h2>
              <p>Try a short project brief and see how an agency inquiry could feel.</p>
              <div className="ff-demo-notice">
                <b>INTERACTIVE DEMO</b>
                <p>
                  Use sample details only. Nothing is sent or stored, and no project inquiry is
                  submitted.
                </p>
              </div>
              <Link to="/" className="ff-real-contact">
                For a real project, visit Muneeb’s portfolio <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="ff-form-panel">
              {done ? (
                <div ref={successRef} tabIndex={-1} className="ff-success" role="status">
                  <Check size={42} />
                  <h3>Idea explored.</h3>
                  <p>Demo complete. No inquiry has been sent.</p>
                  <dl>
                    <div>
                      <dt>Service</dt>
                      <dd>{done.service}</dd>
                    </div>
                    <div>
                      <dt>Sample budget</dt>
                      <dd>{done.budget}</dd>
                    </div>
                  </dl>
                  <button
                    className="ff-button"
                    onClick={() => {
                      setDone(null);
                      setErrors({});
                      requestAnimationFrame(() => nameRef.current?.focus());
                    }}
                  >
                    Try Again <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <form noValidate autoComplete="off" onSubmit={submit}>
                  <h3>A little context goes a long way.</h3>
                  <p className="ff-form-note">Required fields are marked with an asterisk (*).</p>
                  <div className="ff-fields">
                    <div>
                      <label htmlFor="ff-name">Your name *</label>
                      <input
                        {...field("name")}
                        ref={nameRef}
                        value={form.name}
                        maxLength={100}
                        required
                        placeholder="Sample Guest"
                        onChange={(e) => change("name", e.target.value)}
                      />
                      {error("name")}
                    </div>
                    <div>
                      <label htmlFor="ff-email">Email address *</label>
                      <input
                        {...field("email")}
                        value={form.email}
                        type="email"
                        maxLength={254}
                        required
                        placeholder="guest@example.com"
                        onChange={(e) => change("email", e.target.value)}
                      />
                      {error("email")}
                    </div>
                    <div>
                      <label htmlFor="ff-service">What do you have in mind? *</label>
                      <select
                        {...field("service")}
                        value={form.service}
                        required
                        onChange={(e) => change("service", e.target.value)}
                      >
                        <option value="">Choose a service</option>
                        {services.map((s) => (
                          <option key={s.title}>{s.title}</option>
                        ))}
                      </select>
                      {error("service")}
                    </div>
                    <div>
                      <label htmlFor="ff-budget">Sample budget (optional)</label>
                      <select
                        {...field("budget")}
                        value={form.budget}
                        onChange={(e) => change("budget", e.target.value)}
                      >
                        <option value="">Choose a range</option>
                        {budgets.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                      {error("budget")}
                    </div>
                    <div className="ff-full">
                      <label htmlFor="ff-message">Tell us about the idea *</label>
                      <textarea
                        {...field("message")}
                        value={form.message}
                        minLength={20}
                        maxLength={1000}
                        required
                        rows={4}
                        placeholder="Describe a fictional project in at least 20 characters…"
                        onChange={(e) => change("message", e.target.value)}
                      />
                      {error("message")}
                    </div>
                  </div>
                  <p className="ff-form-note">
                    Budget ranges are illustrative, not service prices or quotes.
                  </p>
                  <label className="ff-consent">
                    <input
                      {...field("consent")}
                      type="checkbox"
                      checked={form.consent}
                      required
                      onChange={(e) => change("consent", e.target.checked)}
                    />
                    <span>I understand this is a demo and nothing will be sent. *</span>
                  </label>
                  {error("consent")}
                  <button className="ff-button ff-submit" type="submit">
                    Try Inquiry Demo <ArrowUpRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="ff-footer ff-wrap">
        <div>
          <a href="#ff-main" className="ff-logo">
            FORM<span>&</span>FIELD
            <Asterisk size={26} />
          </a>
          <p>A fictional creative agency. A real design exploration.</p>
        </div>
        <div>
          <p>Portfolio project by Muneeb Ullah Khan.</p>
          <Link to="/">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
