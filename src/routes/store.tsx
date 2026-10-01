import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import toteImg from "@/assets/store/tote.jpg";
import crossbodyImg from "@/assets/store/crossbody.jpg";
import watchLeatherImg from "@/assets/store/watch-leather.jpg";
import watchMeshImg from "@/assets/store/watch-mesh.jpg";
import walletImg from "@/assets/store/wallet.jpg";
import sunglassesImg from "@/assets/store/sunglasses.jpg";
import beltImg from "@/assets/store/belt.jpg";
import capImg from "@/assets/store/cap.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "NOVA Essentials — E-commerce Concept Store | Muneeb Ullah Khan" },
      {
        name: "description",
        content:
          "A portfolio concept storefront for the fictional accessories brand NOVA Essentials, with category filters, product details, and a working shopping cart. No real purchases.",
      },
      { property: "og:title", content: "NOVA Essentials — E-commerce Concept Store" },
      {
        property: "og:description",
        content:
          "An interactive storefront demo with category filters, product details, and a shopping cart. Portfolio concept — no real purchases.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StorePage,
});

type Category = "Bags" | "Watches" | "Accessories";

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: "canvas-tote",
    name: "Everyday Canvas Tote",
    category: "Bags",
    price: 48,
    description:
      "A sturdy canvas tote with reinforced handles, sized for daily errands, a laptop, or a weekend market run. Illustrative sample product.",
    image: toteImg,
  },
  {
    id: "crossbody",
    name: "City Crossbody Bag",
    category: "Bags",
    price: 72,
    description:
      "A compact crossbody in pebbled faux leather with an adjustable strap and zip pocket for essentials. Illustrative sample product.",
    image: crossbodyImg,
  },
  {
    id: "weekender",
    name: "Weekender Sling Pouch",
    category: "Bags",
    price: 39,
    description:
      "A lightweight sling pouch that keeps a phone, cards, and keys close on busy days. Illustrative sample product.",
    image: toteImg,
  },
  {
    id: "classic-watch",
    name: "Classic Leather Watch",
    category: "Watches",
    price: 129,
    description:
      "A clean-dial watch with a brown leather strap — a quiet, everyday design that pairs with anything. Illustrative sample product.",
    image: watchLeatherImg,
  },
  {
    id: "mesh-watch",
    name: "Onyx Mesh Watch",
    category: "Watches",
    price: 145,
    description:
      "A black-on-black watch with a mesh strap and minimal markers for a sharper evening look. Illustrative sample product.",
    image: watchMeshImg,
  },
  {
    id: "wallet",
    name: "Slim Bifold Wallet",
    category: "Accessories",
    price: 36,
    description:
      "A slim bifold with six card slots and a full-length note pocket, in smooth tan faux leather. Illustrative sample product.",
    image: walletImg,
  },
  {
    id: "sunglasses",
    name: "Round Frame Sunglasses",
    category: "Accessories",
    price: 54,
    description:
      "Round tortoiseshell frames with tinted lenses — a classic shape for bright days. Illustrative sample product.",
    image: sunglassesImg,
  },
  {
    id: "belt-cap",
    name: "Leather Belt & Cap Set",
    category: "Accessories",
    price: 62,
    description:
      "A matched everyday set: a stitched leather belt and a soft cotton cap in neutral tones. Illustrative sample product.",
    image: beltImg,
  },
];

const filters: Array<"All" | Category> = ["All", "Bags", "Watches", "Accessories"];

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

interface CartLine {
  product: Product;
  qty: number;
}

function StorePage() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  const visible = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const lines: CartLine[] = useMemo(
    () =>
      products
        .filter((p) => (cart[p.id] ?? 0) > 0)
        .map((p) => ({ product: p, qty: cart[p.id] })),
    [cart],
  );
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);

  const addToCart = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const changeQty = (id: string, delta: number) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  const removeItem = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  return (
    <div className="theme-store min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to="/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />
            <p className="truncate font-display text-lg font-bold tracking-tight">NOVA Essentials</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-foreground"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-background px-1 text-xs font-bold text-foreground">
              {itemCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-10 pt-14 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Portfolio concept — no real purchases
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Everyday accessories, thoughtfully chosen.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            NOVA Essentials is a fictional accessories brand created as an e-commerce demo. Browse
            the sample collection, open product details, and try the cart — nothing is sold or
            charged.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products by category">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <article key={p.id} className="overflow-hidden rounded-xl border bg-card shadow-soft">
                <button
                  onClick={() => setSelected(p)}
                  className="block w-full text-left"
                  aria-label={`View details for ${p.name}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={816}
                    height={816}
                    className="aspect-square w-full object-cover"
                  />
                </button>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {p.category}
                  </p>
                  <h2 className="mt-1 font-semibold">{p.name}</h2>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="font-display font-bold">{usd(p.price)}</p>
                    <button
                      onClick={() => setSelected(p)}
                      className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-accent-foreground"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-1 text-sm text-muted-foreground">
          <p>NOVA Essentials is a fictional brand. Portfolio concept — no real purchases.</p>
          <p>Concept store designed by Muneeb Ullah Khan.</p>
        </div>
      </footer>

      {/* Product modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} details`}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-xl bg-card shadow-soft md:grid md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.name}
              width={816}
              height={816}
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {selected.category}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">{selected.name}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close product details"
                  className="rounded-lg border p-1.5 transition-colors hover:border-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">{selected.description}</p>
              <p className="mt-4 font-display text-xl font-bold">{usd(selected.price)}</p>
              <button
                onClick={() => {
                  addToCart(selected.id);
                  setSelected(null);
                  setCartOpen(true);
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-foreground"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Demo only — this item is not really for sale.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-soft">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="rounded-lg border p-1.5 transition-colors hover:border-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <ShoppingBag className="h-6 w-6" />
                </span>
                <p className="font-semibold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Browse the collection and add a few sample items to see how the cart works.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-foreground"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y overflow-y-auto px-5">
                  {lines.map(({ product, qty }) => (
                    <li key={product.id} className="flex gap-4 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        width={816}
                        height={816}
                        className="h-16 w-16 shrink-0 rounded-lg border object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{usd(product.price)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => changeQty(product.id, -1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="rounded-md border p-1 transition-colors hover:border-primary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{qty}</span>
                          <button
                            onClick={() => changeQty(product.id, 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="rounded-md border p-1 transition-colors hover:border-primary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name} from cart`}
                            className="ml-auto rounded-md border p-1 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="shrink-0 text-sm font-semibold">{usd(product.price * qty)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t px-5 py-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Subtotal</p>
                    <p className="font-display text-lg font-bold">{usd(subtotal)}</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Portfolio concept — no real purchases. Checkout is not part of this demo.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
