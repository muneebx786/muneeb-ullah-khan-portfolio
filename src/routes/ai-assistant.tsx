import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, FileText, Tags, MessageSquare, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({ meta: [
    { title: "AI Inquiry Assistant | Muneeb Ullah Khan" },
    { name: "description", content: "An n8n and Gemini portfolio workflow that turns project inquiries into summaries, service categories, missing details and reply drafts. Watch the recorded demo." },
  ] }),
  component: AIAssistant,
});

const outputs = [
  { icon: FileText, title: "Understand the request", text: "A concise summary brings the client's requirements into one place." },
  { icon: Tags, title: "Identify the service", text: "Classifies the inquiry, such as a business website or an e-commerce project." },
  { icon: CheckCircle2, title: "Find the missing details", text: "Highlights useful follow-up questions without asking again for information already provided." },
  { icon: MessageSquare, title: "Prepare a reply", text: "Creates a professional draft for a person to review and personalise before sending." },
];

function AIAssistant() {
  return <div className="theme-portfolio min-h-screen bg-background text-foreground [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary">
    <header className="border-b px-6 py-5">
      <nav aria-label="Project navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={16} /> Back to Portfolio</Link>
        <span className="text-sm text-muted-foreground">Muneeb Ullah Khan</span>
      </nav>
    </header>
    <main>
      <section className="bg-navy px-6 py-16 text-navy-foreground md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">AI automation · Portfolio project</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">Better context.<br />More thoughtful replies.</h1>
            <p className="mt-6 text-xl font-medium">AI Inquiry Assistant</p>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-muted">A practical workflow that turns a project inquiry into a clear summary, a service category, missing information and a reply draft—ready for human review.</p>
            <a href="#demo" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">Watch the Demo <ArrowUpRight size={18} /></a>
            <div className="mt-7 flex flex-wrap gap-2 text-xs text-navy-muted">{["n8n", "Google Gemini", "Prompt design", "Form workflow"].map(t => <span key={t} className="rounded-full border border-navy-line px-3 py-2">{t}</span>)}</div>
          </div>
          <div className="rounded-2xl border border-navy-line bg-white/5 p-7 md:p-9">
            <p className="text-xs uppercase tracking-widest text-teal-light">The workflow at a glance</p>
            <ol className="mt-6 space-y-5">{["Receive a sample project inquiry", "Analyse the request with Gemini", "Display a structured reply draft", "Review before any client contact"].map((t,i) => <li key={t} className="flex items-start gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-line text-sm text-teal-light">{i+1}</span><span className="pt-1 text-sm leading-relaxed">{t}</span></li>)}</ol>
            <p className="mt-7 border-t border-navy-line pt-5 text-sm text-navy-muted">Draft assistance. No messages are sent automatically.</p>
          </div>
        </div>
      </section>
      <section id="demo" className="scroll-mt-6 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Recorded demonstration</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">From inquiry to clarity.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Watch a sample clothing-store inquiry move through the working n8n workflow. The output identifies an e-commerce project and prepares relevant follow-up questions.</p>
            <div className="mt-7 rounded-xl border bg-card p-6">
              <h3 className="font-semibold">The sample brief</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">An online store for 30 clothing products, size and colour options, a shopping cart, and cash on delivery. Sample budget: PKR 80,000. Preferred timeline: six weeks.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">The assistant acknowledges supplied details. Budget and delivery feasibility remain subject to a full scope review.</p>
            </div>
            <p id="demo-note" className="mt-5 text-sm leading-relaxed text-muted-foreground">This is a recorded demo using fictional details, not a live inquiry form. AI output needs human review and may contain errors.</p>
          </div>
          <figure className="min-w-0 rounded-2xl border bg-muted p-3 shadow-soft">
            <video controls playsInline preload="metadata" poster="/ai-assistant/result.jpg" aria-label="AI Inquiry Assistant recorded demonstration" aria-describedby="demo-note" className="mx-auto max-h-[720px] w-full rounded-xl bg-white object-contain">
              <source src="/ai-assistant/demo.mp4" type="video/mp4" />
              Your browser does not support this video. <a href="/ai-assistant/demo.mp4">Download the demo</a>.
            </video>
            <figcaption className="px-3 py-4 text-center text-xs leading-relaxed text-muted-foreground">Actual workflow recording · Sample data · Edited for brevity</figcaption>
          </figure>
        </div>
      </section>
      <section className="border-y bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Four useful outputs. One submission.</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{outputs.map(({icon: Icon,title,text}) => <article key={title} className="rounded-xl border bg-card p-6"><Icon className="text-primary" size={24} aria-hidden="true" /><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Project notes</p><h2 className="mt-4 text-3xl font-bold">Built to support the first conversation.</h2><p className="mt-5 leading-relaxed text-muted-foreground">Reading every inquiry and assembling follow-up questions takes attention. This project explores how AI can help organise that first pass while keeping decisions with the freelancer.</p></div>
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div><h3 className="mb-2 font-semibold text-foreground">Implementation</h3><p>I configured an n8n form trigger, a Basic LLM Chain connected to Google Gemini, and a styled completion screen. The prompt defines four output sections and treats submitted fields as data.</p></div>
            <div><h3 className="mb-2 font-semibold text-foreground">Checks performed</h3><p>Sample business-website and e-commerce inquiries were tested. The e-commerce example retained the supplied budget and timeline without asking for them again. The reply instructions were refined to avoid unsupported delivery commitments.</p></div>
            <div><h3 className="mb-2 font-semibold text-foreground">Scope and limitations</h3><p>The workflow runs locally for demonstration. It does not send email or book projects. When the actual workflow runs, inquiries are processed by Gemini and may appear in n8n execution history; only fictional details were used here.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-navy px-6 py-14 text-center text-navy-foreground"><h2 className="text-3xl font-bold">Have a workflow worth simplifying?</h2><p className="mx-auto mt-4 max-w-xl text-navy-muted">Tell me about your process. We can discuss the requirements and whether a small automation prototype fits.</p><a href="mailto:muneebfeb03@gmail.com?subject=Automation%20project%20inquiry" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">Discuss a Project <ArrowUpRight size={18} /></a></section>
    </main>
    <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-7 text-sm text-muted-foreground"><p>Portfolio project by Muneeb Ullah Khan.</p><Link to="/">Back to Portfolio</Link></footer>
  </div>;
}
