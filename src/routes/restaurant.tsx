import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Menu, X, Utensils, Check } from "lucide-react";
import "@/components/restaurant/restaurant.css";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Saffron Table — Restaurant Concept | Muneeb Ullah Khan" },
      {
        name: "description",
        content:
          "A fictional contemporary restaurant with an interactive menu and reservation demo. A portfolio project by Muneeb Ullah Khan.",
      },
    ],
  }),
  component: Restaurant,
});
const categories = ["All", "Starters", "Main Courses", "Desserts", "Beverages"] as const;
type Category = (typeof categories)[number];
const dishes = [
  {
    name: "Garden Harvest Salad",
    category: "Starters",
    image: "salad",
    price: 850,
    description:
      "A colourful bowl of seasonal greens, crisp vegetables and a bright lemon dressing.",
  },
  {
    name: "Roasted Vegetable Bowl",
    category: "Starters",
    image: "soup",
    price: 750,
    description:
      "A colourful bowl of vegetables and grains, finished with herbs and a light dressing.",
  },
  {
    name: "Avocado Breakfast Toast",
    category: "Starters",
    image: "toast",
    price: 950,
    description: "Toasted artisan bread with creamy avocado, egg and freshly cracked pepper.",
  },
  {
    name: "Basil Garden Pasta",
    category: "Main Courses",
    image: "pasta",
    price: 1850,
    description:
      "Pasta tossed with basil pesto, cherry tomatoes and a generous finish of parmesan.",
  },
  {
    name: "Lemon Herb Salmon",
    category: "Main Courses",
    image: "salmon",
    price: 2850,
    description: "Roasted salmon with seasonal vegetables, lemon and aromatic herbs.",
  },
  {
    name: "Rustic Tomato Pizza",
    category: "Main Courses",
    image: "pizza",
    price: 1750,
    description: "A crisp pizza base layered with tomato sauce, melted mozzarella and fresh basil.",
  },
  {
    name: "Chocolate Celebration Cake",
    category: "Desserts",
    image: "cake",
    price: 850,
    description:
      "Rich chocolate sponge layered with smooth chocolate frosting. A little indulgence to share.",
  },
  {
    name: "Golden Pancake Stack",
    category: "Desserts",
    image: "pancakes",
    price: 950,
    description: "Soft, golden pancakes with a sweet syrup drizzle and a buttery finish.",
  },
  {
    name: "A Scoop of Happiness",
    category: "Desserts",
    image: "icecream",
    price: 650,
    description:
      "A layered ice-cream sundae with chocolate sauce, cookie crumbs and a whipped topping.",
  },
  {
    name: "House Coffee",
    category: "Beverages",
    image: "coffee",
    price: 550,
    description:
      "Freshly brewed coffee with a deep aroma, served warm for a slow moment at the table.",
  },
  {
    name: "Citrus Cooler",
    category: "Beverages",
    image: "lemonade",
    price: 600,
    description: "A refreshing citrus drink poured over ice, with a lively sweet-and-tart finish.",
  },
  {
    name: "Afternoon Tea",
    category: "Beverages",
    image: "tea",
    price: 450,
    description: "A gently brewed cup of tea with a fragrant aroma. A simple, soothing finish.",
  },
];
const slots = ["12:00", "13:30", "15:00", "18:00", "19:30", "21:00"];
const photo = (name: string) => `/restaurant/${name}.jpg`;
const price = (amount: number) => `PKR ${amount.toLocaleString("en-PK")}`;
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function timeLabel(time: string) {
  const [h, m] = time.split(":");
  return `${Number(h) % 12 || 12}:${m} ${Number(h) >= 12 ? "PM" : "AM"}`;
}
const emptyForm = { name: "", email: "", date: "", time: "", guests: "", requests: "" };
type FormValues = typeof emptyForm;
function Restaurant() {
  const [category, setCategory] = useState<Category>("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [confirmation, setConfirmation] = useState<Pick<
    FormValues,
    "date" | "time" | "guests"
  > | null>(null);
  const [today, setToday] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setToday(localDate());
  }, []);
  useEffect(() => {
    if (confirmation) successRef.current?.focus();
  }, [confirmation]);
  const update = (key: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<FormValues> = {};
    if (!form.name.trim()) next.name = "Please enter a sample name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid sample email.";
    const parsed = new Date(`${form.date}T12:00:00`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(form.date) ||
      Number.isNaN(parsed.getTime()) ||
      `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}` !==
        form.date ||
      form.date < localDate()
    )
      next.date = "Choose today or a future date.";
    if (!slots.includes(form.time)) next.time = "Choose an illustrative time slot.";
    if (!/^[1-8]$/.test(form.guests)) next.guests = "Choose between 1 and 8 guests.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`st-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setConfirmation({ date: form.date, time: form.time, guests: form.guests });
    setForm(emptyForm);
  }
  const error = (key: keyof FormValues) =>
    errors[key] ? (
      <span className="st-error" id={`st-${key}-error`}>
        {errors[key]}
      </span>
    ) : null;
  const inputProps = (key: keyof FormValues) => ({
    id: `st-${key}`,
    name: key,
    value: form[key],
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `st-${key}-error` : undefined,
  });
  const nav = [
    ["menu", "Menu"],
    ["story", "Our Story"],
    ["gallery", "Gallery"],
    ["reservations", "Reservations"],
  ];
  return (
    <div className="st-page">
      <a href="#st-main" className="st-skip">
        Skip to content
      </a>
      <div className="st-topline">
        <span>A place for good food & good company</span>
        <Link to="/">
          <ArrowLeft size={13} /> Back to Portfolio
        </Link>
      </div>
      <header className="st-header">
        <a href="#st-main" className="st-brand">
          <Utensils size={24} strokeWidth={1.3} />
          <span>
            Saffron Table<span className="st-brand-sub">CONTEMPORARY DINING</span>
          </span>
        </a>
        <button
          ref={menuRef}
          className="st-mobile-toggle"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="st-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
        <nav
          id="st-navigation"
          className={mobileOpen ? "st-nav is-open" : "st-nav"}
          aria-label="Restaurant navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMobileOpen(false);
              menuRef.current?.focus();
            }
          }}
        >
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              className={id === "reservations" ? "st-nav-reserve" : ""}
            >
              {label}
              {id === "reservations" && <ArrowRight size={15} />}
            </a>
          ))}
        </nav>
      </header>
      <main id="st-main">
        <section className="st-hero st-wrap">
          <div className="st-hero-copy">
            <p className="st-eyebrow">Gather. Savour. Stay a little.</p>
            <h1>
              Good Food.
              <br />
              <em>Thoughtfully</em>
              <br />
              Served.
            </h1>
            <p className="st-lede">
              A contemporary dining concept inspired by comforting flavours, seasonal ingredients,
              and the pleasure of sharing a table.
            </p>
            <div className="st-actions">
              <a className="st-button" href="#menu">
                Explore the Menu <ArrowRight size={16} />
              </a>
              <a className="st-text-link" href="#reservations">
                Reserve a Table ↗
              </a>
            </div>
            <p className="st-notice">
              Portfolio concept — fictional restaurant. No real reservations.
            </p>
          </div>
          <div className="st-hero-visual">
            <img
              src={photo("hero")}
              alt="Freshly grilled food and colourful dishes ready to share"
              fetchPriority="high"
              width="1000"
              height="1200"
            />
            <div className="st-photo-caption">
              <span>
                Made for the moments
                <br />
                around the table.
              </span>
              <span className="st-caption-star" aria-hidden="true">
                ✳
              </span>
            </div>
          </div>
        </section>
        <div className="st-ribbon">
          <span>Seasonal inspiration</span>
          <span aria-hidden="true">✳</span>
          <span>Comforting flavours</span>
          <span aria-hidden="true">✳</span>
          <span>Thoughtful details</span>
        </div>
        <section id="menu" className="st-section st-wrap">
          <div className="st-section-heading">
            <div>
              <p className="st-eyebrow">Something for every mood</p>
              <h2>
                Find your next <em>favourite.</em>
              </h2>
            </div>
            <p>
              From the first bite to the final sip.
              <br />
              All prices are illustrative, in PKR.
            </p>
          </div>
          <div className="st-filters" role="group" aria-label="Filter dishes by category">
            {categories.map((item) => (
              <button
                key={item}
                aria-pressed={category === item}
                className={category === item ? "is-active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="st-sr" aria-live="polite">
            {category === "All" ? 12 : 3} dishes shown.
          </p>
          <div className="st-menu-grid">
            {dishes
              .filter((dish) => category === "All" || dish.category === category)
              .map((dish) => (
                <Dialog.Root key={dish.name}>
                  <Dialog.Trigger asChild>
                    <button className="st-dish" aria-label={`View ${dish.name}`}>
                      <div className="st-dish-image">
                        <img
                          src={photo(dish.image)}
                          alt={dish.name}
                          width="600"
                          height="450"
                          loading="lazy"
                        />
                        <span aria-hidden="true">↗</span>
                      </div>
                      <div className="st-dish-copy">
                        <span className="st-dish-category">{dish.category}</span>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <span className="st-price">{price(dish.price)}</span>
                      </div>
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="st-modal-overlay" />
                    <Dialog.Content className="st-modal">
                      <Dialog.Close className="st-modal-close" aria-label="Close dish details">
                        <X size={22} />
                      </Dialog.Close>
                      <img src={photo(dish.image)} alt={dish.name} />
                      <div className="st-modal-copy">
                        <p className="st-eyebrow">{dish.category}</p>
                        <Dialog.Title>{dish.name}</Dialog.Title>
                        <Dialog.Description>{dish.description}</Dialog.Description>
                        <p className="st-price">
                          {price(dish.price)} <span>· illustrative price</span>
                        </p>
                        <p className="st-modal-note">Concept menu. Photography is illustrative.</p>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              ))}
          </div>
        </section>
        <section id="story" className="st-story">
          <div className="st-wrap st-story-grid">
            <div className="st-story-image">
              <img
                src={photo("dining")}
                alt="An elegantly arranged dining table with glasses and plated food"
                loading="lazy"
                width="900"
                height="1000"
              />
            </div>
            <div className="st-story-copy">
              <p className="st-eyebrow">The idea behind the table</p>
              <h2>
                Simple pleasures.
                <br />
                <em>Beautifully shared.</em>
              </h2>
              <p>
                Saffron Table imagines a welcoming space where seasonal ingredients meet familiar,
                comforting flavours. The concept brings together thoughtful plates, warm
                surroundings, and the unhurried joy of sharing a meal. Whether it is a quick lunch
                or a long conversation over dessert, there is always room at the table.
              </p>
              <span className="st-story-signature">Come for the food. Stay for the moment.</span>
              <a className="st-text-link" href="#reservations">
                Explore the reservation demo <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section id="gallery" className="st-section st-wrap">
          <div className="st-section-heading">
            <div>
              <p className="st-eyebrow">A little taste of the atmosphere</p>
              <h2>
                Life around <em>the table.</em>
              </h2>
            </div>
            <p>
              Good plates. Warm spaces.
              <br />
              Small moments worth savouring.
            </p>
          </div>
          <div className="st-gallery">
            {[
              { image: "salmon", alt: "Salmon plated with colourful vegetables" },
              { image: "dining", alt: "Warm dining setting with carefully laid tableware" },
              { image: "cake", alt: "Chocolate cake with rich layered frosting" },
              { image: "coffee", alt: "A warm cup of coffee on a table" },
            ].map((item, i) => (
              <figure key={item.image}>
                <img
                  src={photo(item.image)}
                  alt={item.alt}
                  loading="lazy"
                  width="500"
                  height="650"
                />
                <figcaption>
                  0{i + 1} /{" "}
                  {["The plate", "The setting", "The sweet finish", "The slow moment"][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section id="reservations" className="st-reservations">
          <div className="st-wrap st-reservation-grid">
            <div>
              <p className="st-eyebrow">Make yourself at home</p>
              <h2>
                A seat at
                <br />
                <em>our table.</em>
              </h2>
              <p>
                Try the experience of planning a visit.
                <br />
                Choose a date, a time, and your company.
              </p>
              <div className="st-demo-note">
                <span>RESERVATION DEMO</span>
                <p>
                  Interactive demo: use sample details. Nothing is sent or stored, and no table is
                  reserved.
                </p>
              </div>
            </div>
            <div className="st-form-panel">
              {confirmation ? (
                <div className="st-success" ref={successRef} tabIndex={-1} role="status">
                  <span className="st-success-icon">
                    <Check />
                  </span>
                  <h3>Demo complete.</h3>
                  <p>No reservation has been made.</p>
                  <dl>
                    <div>
                      <dt>Date</dt>
                      <dd>
                        {new Date(`${confirmation.date}T12:00:00`).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt>Time</dt>
                      <dd>{timeLabel(confirmation.time)}</dd>
                    </div>
                    <div>
                      <dt>Guests</dt>
                      <dd>{confirmation.guests}</dd>
                    </div>
                  </dl>
                  <button
                    className="st-button"
                    onClick={() => {
                      setConfirmation(null);
                      setErrors({});
                      setToday(localDate());
                      requestAnimationFrame(() => nameRef.current?.focus());
                    }}
                  >
                    Try Again <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate autoComplete="off">
                  <h3>Plan a little get-together.</h3>
                  <p className="st-form-intro">Required fields are marked with an asterisk (*).</p>
                  <div className="st-fields">
                    <label htmlFor="st-name">
                      Name *
                      <input
                        {...inputProps("name")}
                        ref={nameRef}
                        required
                        maxLength={100}
                        placeholder="Sample Guest"
                        onChange={(e) => update("name", e.target.value)}
                      />
                      {error("name")}
                    </label>
                    <label htmlFor="st-email">
                      Email *
                      <input
                        {...inputProps("email")}
                        type="email"
                        required
                        maxLength={254}
                        placeholder="guest@example.com"
                        onChange={(e) => update("email", e.target.value)}
                      />
                      {error("email")}
                    </label>
                    <label htmlFor="st-date">
                      Date *
                      <input
                        {...inputProps("date")}
                        type="date"
                        min={today || undefined}
                        required
                        onFocus={() => setToday(localDate())}
                        onChange={(e) => update("date", e.target.value)}
                      />
                      {error("date")}
                    </label>
                    <label htmlFor="st-time">
                      Time *
                      <select
                        {...inputProps("time")}
                        required
                        onChange={(e) => update("time", e.target.value)}
                      >
                        <option value="">Select a sample slot</option>
                        {slots.map((time) => (
                          <option value={time} key={time}>
                            {timeLabel(time)}
                          </option>
                        ))}
                      </select>
                      {error("time")}
                    </label>
                    <label htmlFor="st-guests" className="st-full">
                      Number of guests *
                      <select
                        {...inputProps("guests")}
                        required
                        onChange={(e) => update("guests", e.target.value)}
                      >
                        <option value="">Select guests</option>
                        {Array.from({ length: 8 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} {i === 0 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                      {error("guests")}
                    </label>
                    <label htmlFor="st-requests" className="st-full">
                      Special requests <span>(optional)</span>
                      <textarea
                        {...inputProps("requests")}
                        rows={3}
                        maxLength={500}
                        placeholder="Sample requests only"
                        onChange={(e) => update("requests", e.target.value)}
                      />
                    </label>
                  </div>
                  <p className="st-slot-note">
                    Time slots are illustrative, not live availability.
                  </p>
                  <button type="submit" className="st-button st-submit">
                    Try Reservation Demo <ArrowRight size={17} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="st-footer st-wrap">
        <div>
          <a href="#st-main" className="st-brand">
            Saffron Table<span aria-hidden="true">✳</span>
          </a>
          <p>Saffron Table is a fictional restaurant concept.</p>
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
