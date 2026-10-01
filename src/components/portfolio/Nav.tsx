import { useState } from "react";

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function scrollToSection(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-navy-line bg-navy text-navy-foreground">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <button onClick={() => go("home")} className="font-display text-base font-semibold tracking-tight">
          Muneeb Ullah Khan
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {sections.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-navy-muted transition-colors hover:text-navy-foreground focus-visible:outline-2 focus-visible:outline-teal-light"
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-navy-line md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 h-0.5 w-4 bg-navy-foreground transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-navy-foreground ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-4 bg-navy-foreground transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-navy-line px-6 pb-3 md:hidden">
          {sections.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full py-3 text-left text-sm font-medium text-navy-muted hover:text-navy-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
